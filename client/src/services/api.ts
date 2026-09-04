import { Product, CreateProductDTO, UpdateProductDTO } from '../types/product';

// URL base de la API Express (ajustable en variables de entorno)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * ============================================================================
 * [MÓDULO 2] - OPERACIÓN READ: Rama feature/ver-inventario
 * ============================================================================
 * Tarea del Alumno:
 * 1. Realizar una petición GET a `${API_URL}/products` usando fetch().
 * 2. Validar que la respuesta sea exitosa (response.ok).
 * 3. Retornar el array de productos en formato JSON.
 */
export async function getProducts(): Promise<Product[]> {
  // TODO [MÓDULO 2]: Implementar la petición GET con fetch()
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.statusText}`);
  }
  return response.json();
}

/**
 * ============================================================================
 * [MÓDULO 3] - OPERACIÓN CREATE: Rama feature/agregar-producto
 * ============================================================================
 * Tarea del Alumno:
 * 1. Realizar una petición POST a `${API_URL}/products`.
 * 2. Enviar el encabezado 'Content-Type': 'application/json'.
 * 3. Serializar el objeto 'product' con JSON.stringify(product).
 * 4. Retornar el nuevo producto creado.
 */
export async function createProduct(product: CreateProductDTO): Promise<Product> {
  // TODO [MÓDULO 3]: Implementar la petición POST con fetch()
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al crear producto');
  }
  return response.json();
}

/**
 * ============================================================================
 * [MÓDULO 4] - OPERACIÓN UPDATE: Rama feature/editar-eliminar
 * ============================================================================
 * Tarea del Alumno:
 * 1. Realizar una petición PUT a `${API_URL}/products/${id}`.
 * 2. Enviar los campos modificados en el body.
 */
export async function updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
  // TODO [MÓDULO 4]: Implementar la petición PUT con fetch()
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el producto');
  }
  return response.json();
}

/**
 * ============================================================================
 * [MÓDULO 4] - OPERACIÓN DELETE: Rama feature/editar-eliminar
 * ============================================================================
 * Tarea del Alumno:
 * 1. Realizar una petición DELETE a `${API_URL}/products/${id}`.
 */
export async function deleteProduct(id: string): Promise<{ message: string; id: string }> {
  // TODO [MÓDULO 4]: Implementar la petición DELETE con fetch()
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
  return response.json();
}
