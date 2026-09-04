import { useState } from 'react';
import { Product } from './types/product';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { EditModal } from './components/EditModal';

export function App() {
  // Lista de productos local (inicia vacía en el repositorio semilla)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading] = useState<boolean>(false);

  // Estados para el modal de edición (Módulo 4)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

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
            Repositorio Semilla • Rama main
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Sistema de Inventario Simple (MERN + TS)
          </h1>
          <p className="mt-2 text-indigo-100 text-sm leading-relaxed max-w-3xl">
            ¡Bienvenido al curso de Git & GitLab! Esta es la rama base del proyecto.
            Recuerda la regla de oro: <strong>"Nunca trabajes directo en main"</strong>.
            Irás implementando cada funcionalidad en su propia rama de características.
          </p>
        </div>

        {/* ================================================================= */}
        {/* [MÓDULO 1] - PEQUEÑA PRUEBA DE COMPILACIÓN EN REACT               */}
        {/* ================================================================= */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-8 shadow-sm">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🧪</span>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Prueba del Módulo 1: Modificar texto estático
              </h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Abre el archivo <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold text-amber-900">client/src/App.tsx</code> y modifica este texto usando clases de Tailwind CSS para confirmar que tu entorno compila correctamente antes de crear ramas.
              </p>
            </div>
          </div>
        </div>

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
