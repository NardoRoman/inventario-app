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
  // [MÓDULO 2] - Estado de Carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-gray-500">Cargando productos desde MongoDB Atlas...</p>
      </div>
    );
  }

  // [MÓDULO 2] - Lista Vacía
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No hay productos registrados</h3>
        <p className="mt-1 text-sm text-gray-500">Usa el formulario de arriba o ejecuta `npm run seed` en el servidor.</p>
      </div>
    );
  }

  // [MÓDULO 2] - Renderizado de Tabla con Tailwind CSS
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-base font-semibold text-gray-800">Catálogo de Productos en Inventario</h2>
        <span className="text-xs font-medium text-gray-500">Total: {products.length} artículos</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left">Categoría</th>
              <th scope="col" className="px-6 py-3 text-left">Precio</th>
              <th scope="col" className="px-6 py-3 text-left">Stock</th>
              <th scope="col" className="px-6 py-3 text-right">Acciones</th>
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
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : product.stock > 0
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {product.stock} unidades
                  </span>
                </td>
                {/* [MÓDULO 4] - Botones de Acción (Update / Delete) */}
                <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition shadow-sm border border-indigo-200"
                    title="Editar producto"
                  >
                    Editar
                  </button>

                  {/* NOTA PEDAGÓGICA PARA EL MÓDULO 4: */}
                  {/* Este botón es el que se usa en la clase para simular el Merge Conflict intencional */}
                  <button
                    onClick={() => onDeleteProduct(product._id)}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition shadow-sm"
                    title="Eliminar producto"
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
