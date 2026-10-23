import React, { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { Search, Pencil, Trash2, PackageOpen, Loader2, AlertCircle } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Filtrado reactivo en tiempo real
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || item.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.categoria));
    return ['Todas', ...Array.from(set)];
  }, [products]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-xl rounded-3xl border border-black/[0.06] shadow-sm">
        <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin stroke-[2]" />
        <p className="mt-3.5 text-xs font-medium text-slate-500">Sincronizando inventario con MongoDB Atlas...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-3xl border border-dashed border-black/[0.1] shadow-sm px-4">
        <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-3.5 border border-black/[0.04]">
          <PackageOpen className="w-7 h-7 stroke-[1.5]" />
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">El catálogo está vacío</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          No hay artículos registrados aún. Utiliza el formulario superior para registrar uno nuevo o ejecuta <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md font-mono text-[11px]">npm run seed</code> en el servidor.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
      {/* Barra de Controles y Búsqueda (Spotlight style) */}
      <div className="p-5 border-b border-black/[0.05] flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/50">
        <div>
          <h2 className="text-[16px] font-semibold tracking-tight text-slate-900">
            Catálogo de Productos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mostrando {filteredProducts.length} de {products.length} productos registrados.
          </p>
        </div>

        {/* Buscador y Filtro de Categoría */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre..."
              className="pl-9 pr-3.5 py-2 text-xs bg-white/90 hover:bg-white focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none w-48 sm:w-56 text-slate-900 placeholder:text-slate-400 transition duration-150"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-white/90 hover:bg-white focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none text-slate-700 transition duration-150 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todas' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla Responsiva */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black/[0.04] text-sm">
          <thead className="bg-slate-50/70 text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3.5 text-left">Artículo</th>
              <th scope="col" className="px-6 py-3.5 text-left">Categoría</th>
              <th scope="col" className="px-6 py-3.5 text-left">Precio Unitario</th>
              <th scope="col" className="px-6 py-3.5 text-left">Disponibilidad</th>
              <th scope="col" className="px-6 py-3.5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-black/[0.04]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                  <AlertCircle className="w-5 h-5 mx-auto mb-1.5 text-slate-300" />
                  No se encontraron productos coincidentes con la búsqueda.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/70 transition-colors duration-100">
                  <td className="px-6 py-4 font-semibold text-slate-900 tracking-tight whitespace-nowrap">
                    {product.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-black/[0.04]">
                      {product.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 tracking-tight whitespace-nowrap">
                    ${product.precio.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : product.stock > 0
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          : 'bg-red-50 text-red-600 border border-red-200/60'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
                      }`}></span>
                      {product.stock > 10
                        ? `${product.stock} en stock`
                        : product.stock > 0
                        ? `${product.stock} (Stock bajo)`
                        : 'Agotado'}
                    </span>
                  </td>

                  {/* Acciones CRUD con Feedback instantáneo (Kill Latency) */}
                  <td className="px-6 py-4 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 active:scale-[0.98] rounded-xl transition duration-100 border border-black/[0.04]"
                      title="Editar producto"
                    >
                      <Pencil className="w-3.5 h-3.5 text-slate-500" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 active:scale-[0.98] rounded-xl transition duration-100 border border-transparent hover:border-red-100"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

