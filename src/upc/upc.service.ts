// src/upc.service.ts

import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpcCode } from '../schemas/upcCodes.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

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

    const existingProduct = await this.upcCodeModel.findOne({ 
      manufacturer: manufacturerCode,
      'products.code': createProductDto.code 
    }).exec();

    console.log('existingProduct: ', existingProduct)
    
    if (existingProduct) {
      throw new ConflictException('Product code already exists.');
    }

    const upcCode = await this.upcCodeModel.findOne({ 
      manufacturer: manufacturerCode,
      'products.code': createProductDto.code 
    }).exec();
    
    console.log('upcCode: ', upcCode)
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

  async updateProduct(updateProductDto: UpdateProductDto): Promise<any> {
    const { code, name } = updateProductDto;
    const manufacturerCode = updateProductDto.code.slice(0, 6);
    const upcCode = await this.upcCodeModel
    .findOne({ manufacturer: manufacturerCode })
    .exec();

    if (!upcCode) {
      throw new NotFoundException('Manufacturer not found');
    }

    const productIndex = upcCode.products.findIndex((p) => p.code === code);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    
    upcCode.products[productIndex].name = name;
    await upcCode.save();
    return updateProductDto;
  }
}
