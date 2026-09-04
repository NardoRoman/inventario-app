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

  // Estado para el modal de edición
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // [MÓDULO 2] - Cargar productos al montar el componente (READ)
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(
        err.message || 'No se pudo conectar con el servidor backend. ¿Está corriendo `npm run dev` en server/?'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // [MÓDULO 3] - Callback cuando se agrega un nuevo producto (CREATE)
  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // [MÓDULO 4] - Callback para eliminar producto (DELETE)
  const handleDeleteProduct = async (id: string) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirm) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  // [MÓDULO 4] - Callback para abrir el modal de edición (UPDATE)
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // Cálculo total de unidades en stock
  const totalStock = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Barra de navegación superior */}
      <Navbar productCount={totalStock} />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Bienvenida Pedagógico */}
        <div className="bg-gradient-to-r from-indigo-700 to-violet-800 text-white rounded-2xl p-6 shadow-md mb-8">
          <div className="max-w-3xl">
            <span className="bg-indigo-500 bg-opacity-30 border border-indigo-400 text-indigo-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Proyecto de Práctica
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
              Sistema de Gestión de Inventario
            </h1>
            <p className="mt-2 text-indigo-100 text-sm leading-relaxed">
              Repositorio práctico para el aprendizaje del flujo de trabajo con ramas,
              Merge Requests, Code Reviews y resolución de conflictos en Git y GitLab.
            </p>
          </div>
        </div>

        {/* Alerta de Error de Servidor */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-bold text-red-800">Error de conexión</h3>
                <p className="text-xs text-red-700 mt-1">{error}</p>
                <button
                  onClick={loadProducts}
                  className="mt-2 text-xs font-semibold text-red-800 underline hover:text-red-900"
                >
                  Reintentar conexión
                </button>
              </div>
            </div>
          </div>
        )}

        {/* [MÓDULO 3] Formulario para Crear Productos */}
        <ProductForm onProductCreated={handleProductCreated} />

        {/* [MÓDULO 2] Lista y Tabla de Productos */}
        <ProductList
          products={products}
          loading={loading}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleOpenEdit}
        />
      </main>

      {/* [MÓDULO 4] Modal de Edición */}
      <EditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        Curso MERN + Git/GitLab • Construido con React, TypeScript, Express, MongoDB Atlas y Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
