// src/upc.controller.ts

import { Controller, Get, Param, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UpcService } from './upc.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@UseGuards(JwtAuthGuard)
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

  @Put()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.upcService.updateProduct(updateProductDto);
  }
}
