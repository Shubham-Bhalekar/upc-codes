// src/dto/create-product.dto.ts

import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly code: string;

  @IsString()
  readonly name: string;
}
