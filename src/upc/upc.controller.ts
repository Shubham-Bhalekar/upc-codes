// src/upc.controller.ts

import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UpcService } from './upc.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('upc')
export class UpcController {
  constructor(private readonly upcService: UpcService) {}

  @Get(':barcode')
  async getProduct(@Param('barcode') barcode: string) {
    return this.upcService.findProductByCode(barcode);
  }

  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return this.upcService.addProduct(createProductDto);
  }
}
