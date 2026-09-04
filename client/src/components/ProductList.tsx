import React from 'react';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  onDeleteProduct,
  onEditProduct,
}) => {
  // ==========================================================================
  // [MÓDULO 2] - Estado de Carga
  // ==========================================================================
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-gray-500 font-medium">Cargando inventario desde MongoDB Atlas...</p>
      </div>
    );
  }

  // ==========================================================================
  // [MÓDULO 2] - Lista Vacía
  // ==========================================================================
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
        <p className="text-sm font-semibold text-gray-700">No hay productos en inventario</p>
        <p className="text-xs text-gray-500 mt-1">Crea tu primer producto arriba o ejecuta `npm run seed` en server/.</p>
      </div>
    );
  }

  // ==========================================================================
  // [MÓDULO 2] - Tabla Responsiva con Tailwind CSS
  // ==========================================================================
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-base font-semibold text-gray-800">Catálogo de Productos</h2>
        <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">
          {products.length} productos
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
            {/* TODO [MÓDULO 2]: Mapear el array de productos y mostrar cada fila */}
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{product.nombre}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {product.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">${product.precio.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {product.stock} disponibles
                  </span>
                </td>

                {/* ========================================================== */}
                {/* [MÓDULO 4] - Botones de Acción (Update & Delete)          */}
                {/* NOTA: Este botón de eliminar es el usado en la clase para   */}
                {/* provocar el conflicto intencional entre dos alumnos.       */}
                {/* ========================================================== */}
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition border border-indigo-200"
                  >
                    Editar
                  </button>

                  {/* TODO [MÓDULO 4]: Botón rojo para eliminar producto */}
                  <button
                    onClick={() => onDeleteProduct(product._id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition"
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
