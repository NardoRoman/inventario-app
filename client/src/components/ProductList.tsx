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
 * [MÓDULO 2 & MÓDULO 4] - TABLA DE PRODUCTOS CON ACCIONES COMPLETAS
 * Rama: feature/boton-verde (Conflicto Resuelto - Paso 06)
 * ============================================================================
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
        <p className="mt-3 text-sm text-gray-500 font-medium">Cargando inventario desde MongoDB Atlas...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
        <p className="text-sm font-semibold text-gray-700">No hay productos en inventario</p>
        <p className="text-xs text-gray-500 mt-1">Usa el formulario de arriba para agregar un producto.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Catálogo de Productos en Inventario</h2>
          <p className="text-xs text-gray-500">Módulo 4: Operaciones de Edición y Eliminación activas.</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
          Total: {products.length} productos
        </span>
      </div>

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
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {product.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {product.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  ${product.precio.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 10
                        ? 'bg-emerald-50 text-emerald-700'
                        : product.stock > 0
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {product.stock} unidades
                  </span>
                </td>

                {/* [MÓDULO 4] - Botones Conectados (Conflicto Resuelto) */}
                <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition border border-indigo-200"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDeleteProduct(product._id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
