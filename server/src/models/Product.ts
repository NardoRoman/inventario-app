import { Schema, model, Document } from 'mongoose';

// Interfaz TypeScript para tipado estricto del producto
export interface IProduct extends Document {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose con validaciones básicas
const productSchema = new Schema<IProduct>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true,
      default: 'General',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product', productSchema);
