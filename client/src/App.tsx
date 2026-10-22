import { useState, useEffect } from 'react';
import { Product } from './types/product';
import { getProducts } from './services/api';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { EditModal } from './components/EditModal';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de edición (Módulo 4)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // [MÓDULO 2] - Cargar productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(
        err.message || 'No se pudo conectar con el backend. ¿Asegúrate de ejecutar `npm run dev` en server/?'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ==========================================================================
  // [MÓDULO 3] - OPERACIÓN CREATE: Callback cuando se crea un producto
  // ==========================================================================
  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    alert(`[Módulo 4]: Eliminar producto ${id} pendiente de conectar.`);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  const totalStock = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar productCount={totalStock} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Estado (Módulo 3) */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md mb-8">
          <span className="bg-emerald-500 bg-opacity-30 border border-emerald-300 text-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Rama: feature/agregar-producto • Vinculada al Issue #2
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Módulo 3: Operación CREATE Implementada
          </h1>
          <p className="mt-2 text-emerald-100 text-sm leading-relaxed max-w-3xl">
            El formulario ya está conectado con TypeScript y envía los datos mediante una petición <code>POST</code> con <code>fetch</code> a MongoDB Atlas.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
            <h3 className="text-sm font-bold text-red-800">Error de conexión</h3>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-2 text-xs font-semibold text-red-800 underline"
            >
              Reintentar conexión
            </button>
          </div>
        )}

        {/* Formulario Conectado (Módulo 3) */}
        <ProductForm onProductCreated={handleProductCreated} />

        {/* Tabla Dinámica (Módulo 2) */}
        <ProductList
          products={products}
          loading={loading}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleOpenEdit}
        />
      </main>

      {/* Modal de Edición (Pendiente Módulo 4) */}
      <EditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        Curso MERN (TypeScript) + Git/GitLab • Rama feature/agregar-producto
      </footer>
    </div>
  );
}

export default App;
