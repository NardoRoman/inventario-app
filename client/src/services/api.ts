import { Product, CreateProductDTO, UpdateProductDTO } from '../types/product';

// URL base de la API Express (se puede sobreescribir con VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Obtener la lista completa de productos desde el backend (READ)
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status} al cargar productos: ${errorText || response.statusText}`);
  }

  return response.json();
}

/**
 * Crear un nuevo producto en la base de datos (CREATE)
 */
export async function createProduct(product: CreateProductDTO): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status} al crear producto`);
  }

  return response.json();
}

/**
 * Actualizar un producto existente por su ID (UPDATE)
 */
export async function updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status} al actualizar producto`);
  }

  return response.json();
}

/**
 * Eliminar un producto por su ID (DELETE)
 */
export async function deleteProduct(id: string): Promise<{ message: string; id: string }> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status} al eliminar producto`);
  }

  return response.json();
}
