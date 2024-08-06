// src/schemas/upc-code.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema()
export class UpcCode extends Document {
  @Prop({ required: true })
  manufacturer: string;

  @Prop({ type: [ProductSchema], default: [] })
  products: Product[];
}

export const UpcCodeSchema = SchemaFactory.createForClass(UpcCode);
