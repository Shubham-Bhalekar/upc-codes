// src/upc.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpcCode } from '../schemas/upcCodesSchema';
import { CreateUpcDto } from '../dto/create-upc.dto';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class UpcService {
  constructor(
    @InjectModel(UpcCode.name) private upcCodeModel: Model<UpcCode>,
  ) {}

  async findProductByCode(barcode: string): Promise<any> {
    const manufacturerCode = barcode.slice(0, 6);
    const upcCode = await this.upcCodeModel
      .findOne({
        manufacturer: manufacturerCode,
        'products.code': barcode,
      })
      .exec();

    if (upcCode) {
      const product = upcCode.products.find((p) => p.code === barcode);
      if (product) {
        return product;
      }
    }

    throw new NotFoundException('Product not found');
  }

  async addProduct(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const manufacturerCode = createProductDto.code.slice(0, 6);
    const upcCode = await this.upcCodeModel
      .findOne({ manufacturer: manufacturerCode })
      .exec();

    if (upcCode) {
      upcCode.products.push(createProductDto);
      await upcCode.save();
      return createProductDto;
    } else {
      const newUpcCode = new this.upcCodeModel({
        manufacturer: manufacturerCode,
        products: [createProductDto],
      });
      await newUpcCode.save();
      return createProductDto;
    }
  }
}
