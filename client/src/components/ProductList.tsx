import React from 'react';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: Product) => void;
}

/**
 * ============================================================================
 * [MÓDULO 2] - TABLA DE PRODUCTOS (READ)
 * Rama de trabajo: feature/ver-inventario
 * ============================================================================
 * Tareas para el alumno:
 * 1. Consumir los productos con getProducts() en el useEffect de App.tsx.
 * 2. Mapear el array `products` para generar filas dinámicas con Tailwind CSS.
 * 
 * [MÓDULO 4] - BOTONES DE ACCIÓN (UPDATE & DELETE)
 * Rama de trabajo: feature/editar-eliminar
 * 1. Conectar el botón 'Eliminar' para invocar onDeleteProduct(id).
 * 2. Conectar el botón 'Editar' para invocar onEditProduct(product).
 */
export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  onDeleteProduct,
  onEditProduct,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-gray-500 font-medium">Cargando inventario...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Catálogo de Productos en Inventario</h2>
          <p className="text-xs text-gray-500">Módulo 2: Operación READ con fetch nativo y Módulo 4: Botones CRUD.</p>
        </div>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full">
          Rama: feature/ver-inventario
        </span>
      </div>

      {/* Si aún no se ha conectado o la lista está vacía */}
      {products.length === 0 ? (
        <div className="p-8 text-center bg-slate-50">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900">Inventario sin conectar</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">
            En el <strong>Módulo 2</strong> crearás la rama <code>feature/ver-inventario</code> para
            consumir la API con <code>useEffect</code> y renderizar aquí la tabla dinámica con los productos de MongoDB Atlas.
          </p>

          {/* Maqueta previa de la tabla */}
          <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white max-w-2xl mx-auto shadow-sm text-left">
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
              Ejemplo de fila que construirás:
            </div>
            <table className="min-w-full text-xs text-gray-500">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-left">Categoría</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Laptop Pro 15"</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">Computación</span></td>
                  <td className="px-4 py-3 font-semibold text-gray-800">$1299.99</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold">15 u.</td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <button
                      onClick={() => alert('Módulo 4: El botón Editar se implementará en la rama feature/editar-eliminar')}
                      className="px-2 py-1 text-[11px] rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => alert('Módulo 4: El botón Eliminar se implementará en la rama feature/editar-eliminar')}
                      className="px-2 py-1 text-[11px] rounded bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Si la lista tiene productos (cuando el alumno complete el Módulo 2) */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Categoría</th>
                <th className="px-6 py-3 text-left">Precio</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.nombre}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {product.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${product.precio.toFixed(2)}</td>
                  <td className="px-6 py-4 text-emerald-700 font-semibold">{product.stock}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="px-3 py-1.5 text-xs rounded-lg text-indigo-700 bg-indigo-50 border border-indigo-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product._id)}
                      className="px-3 py-1.5 text-xs rounded-lg text-white bg-red-600 hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
