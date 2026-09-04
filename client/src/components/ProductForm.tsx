import React, { useState } from 'react';
import { Product } from '../types/product';

interface ProductFormProps {
  onProductCreated: (newProduct: Product) => void;
}

/**
 * ============================================================================
 * [MÓDULO 3] - COMPONENTE DE FORMULARIO
 * Rama de trabajo: feature/agregar-producto
 * ============================================================================
 * Tareas para el alumno en este componente:
 * 1. Definir el estado local con useState<CreateProductDTO>({ ... }).
 * 2. Crear la función handleChange para capturar los inputs.
 * 3. Crear la función handleSubmit para llamar a createProduct(formData).
 * 4. Al recibir la respuesta exitosa, invocar onProductCreated(nuevoProducto).
 */
export const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated: _onProductCreated }) => {
  // Estado local de ejemplo para cuando comiencen el Módulo 3
  const [nombre, setNombre] = useState('');

  const handlePlaceholderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      '⚠️ Módulo 3: El formulario aún no está conectado a la base de datos.\n\n' +
      'Sigue la guía del Módulo 3 en la rama `feature/agregar-producto` para implementar useState y la petición POST.'
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 mb-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            Pendiente de Implementar (Módulo 3)
          </span>
          <h2 className="text-base font-bold text-gray-900 mt-1">Formulario de Nuevo Producto</h2>
        </div>
        <span className="text-xs font-mono text-gray-400">Rama: feature/agregar-producto</span>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Este componente es una plantilla visual. En el <strong>Módulo 3</strong> aprenderás a
        manejar el estado con <code>useState</code>, validar tipos con TypeScript y enviar los datos
        mediante un <code>POST</code> asíncrono con <code>fetch</code> a MongoDB Atlas.
      </p>

      {/* Formulario maqueta para que el alumno lo complete */}
      <form onSubmit={handlePlaceholderSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end opacity-75">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Mouse Gamer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Categoría</label>
          <input
            type="text"
            placeholder="Ej. Accesorios"
            disabled
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Precio</label>
          <input
            type="number"
            placeholder="0.00"
            disabled
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-sm transition"
          >
            Guardar (Probar)
          </button>
        </div>
      </form>
    </div>
  );
};
