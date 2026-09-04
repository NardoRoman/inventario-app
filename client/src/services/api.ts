import { Product, CreateProductDTO, UpdateProductDTO } from '../types/product';

// URL base del backend Express
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * ============================================================================
 * [MÓDULO 2] - OPERACIÓN READ
 * Rama: feature/ver-inventario
 * ============================================================================
 * Instrucciones:
 * Consumir el endpoint GET `${API_URL}/products` usando fetch() nativo
 * y retornar la lista de productos tipada como Promise<Product[]>.
 */
export async function getProducts(): Promise<Product[]> {
  // TODO [MÓDULO 2]: Implementar la llamada GET con fetch() a `${API_URL}/products`
  console.info(`ℹ️ getProducts() aún no ha sido implementado hacia ${API_URL}/products (Módulo 2)`);
  return [];
}

/**
 * ============================================================================
 * [MÓDULO 3] - OPERACIÓN CREATE
 * Rama: feature/agregar-producto
 * ============================================================================
 * Instrucciones:
 * Enviar un POST a `${API_URL}/products` con JSON.stringify(product)
 * y encabezado 'Content-Type': 'application/json'.
 */
export async function createProduct(product: CreateProductDTO): Promise<Product> {
  // TODO [MÓDULO 3]: Implementar la llamada POST con fetch()
  console.info('ℹ️ createProduct() aún no ha sido implementado (Módulo 3)', product);
  throw new Error('Función createProduct() pendiente de implementar en el Módulo 3');
}

/**
 * ============================================================================
 * [MÓDULO 4] - OPERACIÓN UPDATE
 * Rama: feature/editar-eliminar
 * ============================================================================
 * Instrucciones:
 * Enviar un PUT a `${API_URL}/products/${id}` con los cambios en el body.
 */
export async function updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
  // TODO [MÓDULO 4]: Implementar la llamada PUT con fetch()
  console.info('ℹ️ updateProduct() aún no ha sido implementado (Módulo 4)', id, updates);
  throw new Error('Función updateProduct() pendiente de implementar en el Módulo 4');
}

/**
 * ============================================================================
 * [MÓDULO 4] - OPERACIÓN DELETE
 * Rama: feature/editar-eliminar
 * ============================================================================
 * Instrucciones:
 * Enviar un DELETE a `${API_URL}/products/${id}` con fetch().
 */
export async function deleteProduct(id: string): Promise<{ message: string; id: string }> {
  // TODO [MÓDULO 4]: Implementar la llamada DELETE con fetch()
  console.info('ℹ️ deleteProduct() aún no ha sido implementado (Módulo 4)', id);
  throw new Error('Función deleteProduct() pendiente de implementar en el Módulo 4');
}
