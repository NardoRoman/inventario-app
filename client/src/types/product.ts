// Interfaz del producto que devuelve el backend de MongoDB
export interface Product {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

// Datos necesarios para crear un producto
export interface CreateProductDTO {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

// Datos parciales para actualizar un producto
export type UpdateProductDTO = Partial<CreateProductDTO>;
