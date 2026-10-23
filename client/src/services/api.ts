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
 * [MÓDULO 4] - OPERACIÓN UPDATE  ✅ IMPLEMENTADO (Módulo 4 · Paso 03)
 * Rama: feature/editar-eliminar
 * ============================================================================
 * UpdateProductDTO = Partial<CreateProductDTO>: todas las propiedades son
 * opcionales, así podemos enviar solo el precio, solo el stock, etc.
 * EditModal.tsx ya llama a esta función: al implementarla, el modal cobra vida.
 */
export async function updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status} al actualizar producto`);
  }

  return response.json();
}

/**
 * ============================================================================
 * [MÓDULO 4] - OPERACIÓN DELETE  ✅ IMPLEMENTADO (Módulo 4 · Paso 01)
 * Rama: feature/editar-eliminar
 * ============================================================================
 * La petición más sencilla: sin cuerpo ni encabezados, solo el método y el id.
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
