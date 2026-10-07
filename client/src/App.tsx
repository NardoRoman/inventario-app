import { useState, useEffect } from 'react';
import { Product } from './types/product';
import { getProducts } from './services/api';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { EditModal } from './components/EditModal';

export function App() {
  // Lista de productos local (inicia vacía en el repositorio semilla)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de edición (Módulo 4)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // ==========================================================================
  // [MÓDULO 2] - OPERACIÓN READ: Cargar productos al montar
  // ==========================================================================
  const loadProducts = async () => {
    try{
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err:any) {
      setError(err.message || 'No se pudo conectar con el servidor backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  // Handlers que los alumnos conectarán en sus respectivas ramas
  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    alert(`[Módulo 4]: Eliminar producto ${id} aún no está conectado al endpoint DELETE.`);
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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Barra de navegación superior */}
      <Navbar productCount={products.length} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Bienvenida del Curso */}
        <div className="bg-gradient-to-r from-indigo-700 to-violet-800 text-white rounded-2xl p-6 shadow-md mb-8">
          <span className="bg-indigo-500 bg-opacity-30 border border-indigo-400 text-indigo-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Rama: feature/ver-inventario
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Módulo 2: Operación READ Implementada
          </h1>
          <p className="mt-2 text-indigo-100 text-sm leading-relaxed max-w-3xl">
            En esta rama se implementó la conexión GET hacia MongoDB Atlas usando <code>useEffect</code> y <code>fetch()</code>, y la tabla responsiva con Tailwind CSS.
          </p>
        </div>

        {/* Alerta de Error de Servidor */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
            <h3 className="text-sm font-bold text-red-800">Error de conexión con MongoDB Atlas</h3>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-2 text-xs font-semibold text-red-800 underline hover:text-red-900"
            >
              Reintentar conexión
            </button>
          </div>
        )}
        

        {/* [MÓDULO 3] Formulario para Crear Productos (Rama feature/agregar-producto) */}
        <ProductForm onProductCreated={handleProductCreated} />

        {/* [MÓDULO 2] Tabla de Inventario (Rama feature/ver-inventario) */}
        <ProductList
          products={products}
          loading={loading}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleOpenEdit}
        />
      </main>

      {/* [MÓDULO 4] Modal de Edición (Rama feature/editar-eliminar) */}
      <EditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        Curso MERN (TypeScript) + Git/GitLab • Repositorio Semilla para Alumnos
      </footer>
    </div>
  );
}

export default App;
