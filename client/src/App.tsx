import { useState, useEffect } from 'react';
import { Product } from './types/product';
import { getProducts, deleteProduct } from './services/api';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { EditModal } from './components/EditModal';
import { Boxes, PackageCheck, CircleDollarSign, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de edición
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Carga inicial de datos desde MongoDB Atlas
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(
        err.message || 'No se pudo conectar con el servidor backend. Asegúrate de que el servidor Express esté ejecutándose.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Manejo de creación (CREATE)
  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Manejo de eliminación (DELETE)
  const handleDeleteProduct = async (id: string) => {
    const item = products.find((p) => p._id === id);
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar "${item?.nombre || 'este producto'}" de la base de datos?`);
    if (!confirm) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(`Error al eliminar el producto: ${err.message}`);
    }
  };

  // Manejo de actualización (UPDATE)
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // Métricas calculadas para el dashboard
  const totalItems = products.length;
  const totalStockUnits = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);
  const totalInventoryValue = products.reduce((acc, curr) => acc + (curr.precio * curr.stock || 0), 0);

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Barra de navegación superior translúcida */}
      <Navbar productCount={totalStockUnits} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Panel de Encabezado y Métricas */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/50 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Panel de Control • Rama design</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Gestión de Inventario
              </h1>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                Control de catálogo en tiempo real con MongoDB Atlas, Express y React con TypeScript.
              </p>
            </div>

            <button
              onClick={loadProducts}
              disabled={loading}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] text-slate-700 transition duration-150 border border-black/[0.04]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
              <span>Sincronizar</span>
            </button>
          </div>

          {/* Tarjetas de Métricas (Apple Widgets) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/[0.06]">
            {/* Widget 1 */}
            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-black/[0.04] transition hover:bg-slate-50/90">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Productos Registrados</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Boxes className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-2">
                {totalItems}
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block font-normal">
                Artículos únicos en catálogo
              </span>
            </div>

            {/* Widget 2 */}
            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-black/[0.04] transition hover:bg-slate-50/90">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Unidades en Stock</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <PackageCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-emerald-600 mt-2">
                {totalStockUnits}
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block font-normal">
                Disponibles para despacho
              </span>
            </div>

            {/* Widget 3 */}
            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-black/[0.04] transition hover:bg-slate-50/90">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Valor de Inventario</span>
                <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <CircleDollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-2">
                ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block font-normal">
                Valor estimado total en USD
              </span>
            </div>
          </div>
        </div>

        {/* Alerta de Error (Apple System Banner) */}
        {error && (
          <div className="p-4 bg-red-50/90 backdrop-blur-md border border-red-200/80 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-red-900">Error de comunicación</h3>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={loadProducts}
              className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200/80 active:scale-[0.98] text-red-800 text-xs font-semibold rounded-xl transition duration-150"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Formulario de Registro de Productos (CREATE) */}
        <ProductForm onProductCreated={handleProductCreated} />

        {/* Catálogo y Tabla de Productos (READ / UPDATE / DELETE) */}
        <ProductList
          products={products}
          loading={loading}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleOpenEdit}
        />
      </main>

      {/* Modal de Actualización (UPDATE) */}
      <EditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      {/* Pie de Página */}
      <footer className="border-t border-black/[0.06] py-8 mt-12 text-center text-xs text-slate-400">
        <p className="font-medium text-slate-600">Sistema de Inventario • MERN + Git/GitLab</p>
        <p className="text-slate-400 mt-1">Diseñado con principios de interacción fluida de Apple • TypeScript & Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;

