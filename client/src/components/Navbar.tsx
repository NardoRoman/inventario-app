import React from 'react';
import { Package, Layers, Sparkles } from 'lucide-react';

interface NavbarProps {
  productCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ productCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-black/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo y Marca */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center shadow-sm shadow-slate-900/10 border border-white/20">
            <Package className="w-5 h-5 text-white stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
                Inventario Pro
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                <Sparkles className="w-2.5 h-2.5" />
                MERN Stack
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">
              TypeScript • MongoDB Atlas
            </p>
          </div>
        </div>

        {/* Indicadores y Contador */}
        <div className="flex items-center space-x-2.5">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100/80 text-slate-600 border border-black/[0.04]">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Rama: <span className="font-semibold text-slate-800">design</span></span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 text-slate-700 border border-black/[0.06] shadow-sm shadow-black/[0.02]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"></span>
            <span>Stock total:</span>
            <strong className="font-semibold text-slate-900">{productCount}</strong>
          </div>
        </div>
      </div>
    </header>
  );
};

