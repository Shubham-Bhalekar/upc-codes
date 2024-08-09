// src/dto/update-product.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
