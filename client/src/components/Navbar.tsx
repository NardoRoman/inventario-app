import React from 'react';

interface NavbarProps {
  productCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ productCount }) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo y Título */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Sistema de Inventario</h1>
            <p className="text-xs text-slate-400 font-mono">Curso MERN + Git/GitLab (TypeScript)</p>
          </div>
        </div>

        {/* Badges y Contador */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-700">
            TS + Atlas
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
            Total en stock: <strong className="ml-1 text-emerald-400">{productCount}</strong>
          </span>
        </div>
      </div>
    </header>
  );
};
