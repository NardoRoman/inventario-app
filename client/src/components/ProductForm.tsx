import React, { useState } from 'react';
import { CreateProductDTO, Product } from '../types/product';
import { createProduct } from '../services/api';

interface ProductFormProps {
  onProductCreated: (newProduct: Product) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  // [MÓDULO 3] - Estado del Formulario con TypeScript
  const [formData, setFormData] = useState<CreateProductDTO>({
    nombre: '',
    categoria: 'Electrónica',
    precio: 0,
    stock: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manejador genérico de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  // [MÓDULO 3] - Envío con POST a la API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validación básica en cliente
    if (!formData.nombre.trim()) {
      setErrorMessage('El nombre del producto no puede estar vacío.');
      return;
    }

    if (formData.precio <= 0) {
      setErrorMessage('El precio debe ser mayor a 0.');
      return;
    }

    setLoading(true);

    try {
      const nuevoProducto = await createProduct(formData);
      onProductCreated(nuevoProducto);
      setSuccessMessage(`¡Producto "${nuevoProducto.nombre}" agregado con éxito!`);

      // Resetear campos
      setFormData({
        nombre: '',
        categoria: 'Electrónica',
        precio: 0,
        stock: 0,
      });

      // Limpiar mensaje tras 4 segundos
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">Agregar Nuevo Producto al Inventario</h2>
        <p className="text-xs text-gray-500">Módulo 3: Petición POST a MongoDB Atlas mediante API Express.</p>
      </div>

      {/* Alertas de Feedback */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg">
          ✅ {successMessage}
        </div>
      )}

      {/* Formulario Estilizado con Tailwind */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Nombre */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Teclado Mecánico"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Categoría
          </label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="Electrónica">Electrónica</option>
            <option value="Computación">Computación</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Audio">Audio</option>
            <option value="Monitores">Monitores</option>
            <option value="Hogar">Hogar</option>
          </select>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Precio ($)
          </label>
          <input
            type="number"
            name="precio"
            step="0.01"
            min="0"
            value={formData.precio === 0 ? '' : formData.precio}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Stock Inicial
          </label>
          <input
            type="number"
            name="stock"
            min="0"
            value={formData.stock === 0 ? '' : formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Botón de Envío */}
        <div className="lg:col-span-5 flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-sm transition flex items-center ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : (
              'Guardar Producto'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
