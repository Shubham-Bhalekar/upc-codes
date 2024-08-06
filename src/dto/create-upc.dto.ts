import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

export class CreateUpcDto {
  @IsString()
  readonly manufacturer: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  readonly products: CreateProductDto[];
}
