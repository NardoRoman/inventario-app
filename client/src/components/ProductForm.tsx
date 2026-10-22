import React, { useState } from 'react';
import { CreateProductDTO, Product } from '../types/product';
import { createProduct } from '../services/api';

interface ProductFormProps {
  onProductCreated: (newProduct: Product) => void;
}

/**
 * ============================================================================
 * [MÓDULO 3] - FORMULARIO DE ALTA DE PRODUCTO (CREATE)  ✅ COMPLETO
 * Rama de trabajo: feature/2-agregar-producto
 * ============================================================================
 * ✅ Paso 02: estado formData tipado + un solo handleChange + inputs conectados.
 * ✅ Paso 03: handleSubmit con validación, POST y mensajes de éxito/error.
 */
export const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  // React es la única fuente de verdad: el valor de cada input vive en este estado
  const [formData, setFormData] = useState<CreateProductDTO>({
    nombre: '',
    categoria: 'Electrónica',
    precio: 0,
    stock: 0,
  });

  // [Paso 03] Estados para el feedback visual
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Un solo handler para todos los campos: usa el atributo `name` del input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Los inputs siempre entregan texto: convertimos precio y stock a número
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  // [Paso 03] Envío del formulario con validación y POST real
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que el navegador recargue la página
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validamos en el frontend antes de molestar al servidor
    if (!formData.nombre.trim()) {
      setErrorMessage('El nombre del producto es obligatorio.');
      return;
    }

    if (formData.precio <= 0) {
      setErrorMessage('El precio debe ser mayor a 0.');
      return;
    }

    setLoading(true);

    try {
      const nuevo = await createProduct(formData);
      onProductCreated(nuevo); // Avisar al padre (App.tsx) para actualizar la tabla
      setSuccessMessage(`¡Producto "${nuevo.nombre}" guardado con éxito en MongoDB Atlas!`);

      // Limpiar el formulario para el siguiente registro
      setFormData({
        nombre: '',
        categoria: 'Electrónica',
        precio: 0,
        stock: 0,
      });

      // Ocultar el mensaje de éxito después de 4 segundos (efecto "toast")
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Agregar Nuevo Producto</h2>
          <p className="text-xs text-gray-500">Módulo 3: Operación POST con fetch nativo y validación de tipos.</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
          Módulo 3 Implementado
        </span>
      </div>

      {/* [Paso 03] Feedback visual: el usuario siempre debe saber qué pasó */}
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Teclado Mecánico RGB"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Categoría
          </label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Electrónica">Electrónica</option>
            <option value="Computación">Computación</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Audio">Audio</option>
            <option value="Monitores">Monitores</option>
          </select>
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        <div className="lg:col-span-5 flex justify-end mt-2">
          {/* [Paso 03] El botón se deshabilita durante la petición para evitar duplicados */}
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-sm transition flex items-center ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Guardando en Atlas...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};
