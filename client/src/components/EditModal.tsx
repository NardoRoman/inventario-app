import React, { useState, useEffect } from 'react';
import { Product, UpdateProductDTO } from '../types/product';
import { updateProduct } from '../services/api';
import { X, Loader2, AlertCircle, Check } from 'lucide-react';

interface EditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: (updatedProduct: Product) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  product,
  isOpen,
  onClose,
  onProductUpdated,
}) => {
  const [formData, setFormData] = useState<UpdateProductDTO>({
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        categoria: product.categoria,
        precio: product.precio,
        stock: product.stock,
      });
      setError(null);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updated = await updateProduct(product._id, formData);
      onProductUpdated(updated);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim / Telón de fondo con desenfoque de cristal */}
      <div
        className="fixed inset-0 bg-black/35 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Ventana Modal flotante estilo Apple Sheet */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-black/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.12)] max-w-md w-full p-6 sm:p-7 relative z-10 transition-all duration-200">
        <div className="flex items-start justify-between mb-4 pb-3 border-b border-black/[0.05]">
          <div>
            <h3 className="text-[17px] font-semibold tracking-tight text-slate-900">
              Editar Producto
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Actualiza las propiedades de este artículo en el inventario.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 active:scale-95 text-slate-500 flex items-center justify-center transition duration-150"
            title="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50/90 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 outline-none transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
              Categoría
            </label>
            <input
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 outline-none transition duration-150"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                Precio ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 outline-none transition duration-150"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-black/[0.08] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm text-slate-900 outline-none transition duration-150"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-black/[0.05]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 active:scale-[0.98] rounded-xl transition duration-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 text-xs sm:text-sm font-medium text-white rounded-xl shadow-sm transition duration-100 flex items-center gap-1.5 ${
                loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Actualizando...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

