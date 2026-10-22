import { Product, CreateProductDTO, UpdateProductDTO } from '../types/product';

// URL base del backend Express
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * ============================================================================
 * [MÓDULO 2] - OPERACIÓN READ  ✅ IMPLEMENTADO (Módulo 2 · Paso 01)
 * Rama: feature/ver-inventario
 * ============================================================================
 * fetch() NO lanza error con respuestas 404/500, por eso revisamos response.ok
 * manualmente y lanzamos nosotros el error.
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
 * ============================================================================
 * [MÓDULO 3] - OPERACIÓN CREATE  ✅ IMPLEMENTADO (Módulo 3 · Paso 01)
 * Rama: feature/2-agregar-producto
 * ============================================================================
 * Para ENVIAR datos necesitamos:
 *  - El encabezado 'Content-Type: application/json'
 *  - Convertir el objeto a texto con JSON.stringify()
 */
export async function createProduct(product: CreateProductDTO): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status} al crear producto`);
  }

  return response.json();
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
