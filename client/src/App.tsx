import { useState, useEffect } from 'react';
import { Product } from './types/product';
import { getProducts, deleteProduct } from './services/api';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { EditModal } from './components/EditModal';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de edición
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

  // [MÓDULO 3] - Callback cuando se crea un producto
  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // ==========================================================================
  // [MÓDULO 4 · Paso 02] - OPERACIÓN DELETE: Eliminar producto por ID
  // ==========================================================================
  const handleDeleteProduct = async (id: string) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este producto de la base de datos?');
    if (!confirm) return;

    try {
      await deleteProduct(id);
      // Inmutabilidad: .filter() crea un arreglo NUEVO sin el producto eliminado
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  // ==========================================================================
  // [MÓDULO 4] - OPERACIÓN UPDATE: Editar producto mediante modal y PUT
  // ==========================================================================
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
        {/* Banner de Estado (Módulo 4) */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-900 text-white rounded-2xl p-6 shadow-md mb-8">
          <span className="bg-violet-500 bg-opacity-30 border border-violet-400 text-violet-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Rama: feature/editar-eliminar • CRUD 100% Completado
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Módulo 4: Operaciones UPDATE y DELETE Implementadas
          </h1>
          <p className="mt-2 text-violet-100 text-sm leading-relaxed max-w-3xl">
            Todas las operaciones CRUD están conectadas a MongoDB Atlas mediante Express y TypeScript con <code>fetch</code> nativo.
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

        {/* Formulario de Creación (Módulo 3) */}
        <ProductForm onProductCreated={handleProductCreated} />

        {/* Tabla y Acciones (Módulos 2 y 4) */}
        <ProductList
          products={products}
          loading={loading}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleOpenEdit}
        />
      </main>

      {/* Modal de Edición (Módulo 4) */}
      <EditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        Curso MERN (TypeScript) + Git/GitLab • Rama feature/editar-eliminar
      </footer>
    </div>
  );
}

export default App;
