import React, { useState } from 'react';
import { CreateProductDTO, Product } from '../types/product';
import { createProduct } from '../services/api';
import { PlusCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ProductFormProps {
  onProductCreated: (newProduct: Product) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  const [formData, setFormData] = useState<CreateProductDTO>({
    nombre: '',
    categoria: 'Electrónica',
    precio: 0,
    stock: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.nombre.trim()) {
      setErrorMessage('El nombre del producto es obligatorio.');
      return;
    }

    if (formData.precio <= 0) {
      setErrorMessage('El precio debe ser un número mayor a 0.');
      return;
    }

    if (formData.stock < 0) {
      setErrorMessage('El stock inicial no puede ser negativo.');
      return;
    }

    setLoading(true);

    try {
      const nuevo = await createProduct(formData);
      onProductCreated(nuevo);
      setSuccessMessage(`¡Producto "${nuevo.nombre}" registrado exitosamente en MongoDB Atlas!`);

      // Resetear campos
      setFormData({
        nombre: '',
        categoria: 'Electrónica',
        precio: 0,
        stock: 0,
      });

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-7 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-black/[0.05] gap-2">
        <div>
          <h2 className="text-[16px] font-semibold tracking-tight text-slate-900">
            Registrar Nuevo Producto
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingresa los datos para guardar el artículo en la base de datos MongoDB Atlas.
          </p>
        </div>
        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Conexión Activa (POST)
        </span>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="mb-5 p-3.5 bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Teclado Magic Keyboard"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-150"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
            Categoría
          </label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 outline-none transition duration-150"
          >
            <option value="Electrónica">Electrónica</option>
            <option value="Computación">Computación</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Audio">Audio</option>
            <option value="Monitores">Monitores</option>
            <option value="Hogar">Hogar</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
            Precio ($ USD)
          </label>
          <input
            type="number"
            name="precio"
            step="0.01"
            min="0.01"
            value={formData.precio === 0 ? '' : formData.precio}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-150"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
            Stock Inicial
          </label>
          <input
            type="number"
            name="stock"
            min="0"
            value={formData.stock === 0 ? '' : formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-150"
            required
          />
        </div>

        <div className="lg:col-span-5 flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-100 flex items-center justify-center gap-2 shadow-sm ${
              loading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] text-white'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Guardando producto...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Guardar Producto</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

