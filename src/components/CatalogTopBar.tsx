import React from 'react';
import { ArrowLeft, ListOrdered } from 'lucide-react';
import { Language } from '../types';
import { navigate } from '../lib/routes';

interface CatalogTopBarProps {
  lang: Language;
  onQuickOrder: () => void;
}

/** Thin strip above the catalog navbar: back to the landing page, or into quick order. */
export const CatalogTopBar: React.FC<CatalogTopBarProps> = ({ lang, onQuickOrder }) => (
  <div className="bg-stone-950 text-stone-300 text-[11px] border-b border-stone-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
      <button
        onClick={() => navigate('landing')}
        className="flex items-center gap-1.5 font-semibold hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {lang === 'zh' ? '返回首页' : lang === 'ms' ? 'Laman Utama' : 'Home'}
      </button>

      <button
        onClick={onQuickOrder}
        className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
      >
        <ListOrdered className="w-3.5 h-3.5" />
        {lang === 'zh' ? '快速下单（填数量）' : lang === 'ms' ? 'Pesanan Pantas' : 'Quick Order'}
      </button>
    </div>
  </div>
);
