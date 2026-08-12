import React, { useState } from 'react';
import { ShieldCheck, Plus, Check, Eye, Package, Sparkles } from 'lucide-react';
import { Language, Product } from '../types';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onAddToCart: (product: Product, packOption: 'unit' | 'carton', quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onAddToCart,
  onQuickView,
}) => {
  const [packOption, setPackOption] = useState<'unit' | 'carton'>(
    product.pricing.cartonPrice !== null ? 'unit' : 'unit'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const hasCartonOption = product.pricing.cartonPrice !== null;
  const currentPrice =
    packOption === 'unit'
      ? product.pricing.unitPrice
      : product.pricing.cartonPrice || product.pricing.unitPrice;

  // Calculate bulk savings percentage if carton price is available
  let discountPercent = 0;
  if (hasCartonOption && product.pricing.cartonRatio && product.pricing.cartonPrice) {
    const singlePriceSum = product.pricing.unitPrice * product.pricing.cartonRatio;
    discountPercent = Math.round(((singlePriceSum - product.pricing.cartonPrice) / singlePriceSum) * 100);
  }

  const handleAdd = () => {
    onAddToCart(product, packOption, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Wholesale Product Header Banner (No Photos) */}
      <div 
        className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white p-4 cursor-pointer hover:bg-stone-800 transition-colors"
        onClick={() => onQuickView(product)}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="bg-amber-500 text-stone-950 font-mono text-xs font-black px-2.5 py-0.5 rounded shadow-sm">
            {product.code}
          </span>
          <div className="flex items-center gap-1.5">
            {product.cert === 'HALAL' && (
              <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>HALAL</span>
              </span>
            )}
            {(product.isSpicy || product.nameZh.includes('🌶️')) && (
              <span className="bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                <span>🌶️ SPICY</span>
              </span>
            )}
            {product.isPopular && (
              <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                <span>HOT</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-stone-300 text-xs">
          <span className="font-mono text-stone-400 font-medium">
            {product.pricing.unitLabel}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="text-[11px] text-amber-300 hover:text-white flex items-center gap-1 underline decoration-amber-400/50"
          >
            <Eye className="w-3 h-3" />
            <span>{lang === 'zh' ? '查看规格' : lang === 'ms' ? 'Lihat Spesifikasi' : 'Specs'}</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mb-1">
            {lang === 'zh' ? product.categoryZh : lang === 'ms' ? (product.categoryMs || product.categoryEn) : product.categoryEn}
          </div>

          <h3 className="font-bold text-stone-900 text-base line-clamp-1 group-hover:text-amber-700 transition-colors">
            {lang === 'zh' ? product.nameZh : lang === 'ms' ? (product.nameMs || product.nameEn) : product.nameEn}
          </h3>
          <p className="text-stone-500 text-xs line-clamp-1 mt-0.5 font-sans">
            {lang === 'zh' ? product.nameEn : product.nameZh}
          </p>

          <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
            {lang === 'zh' ? product.descriptionZh : lang === 'ms' ? (product.descriptionMs || product.descriptionEn) : product.descriptionEn}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100">
          {/* Packing Unit Selection Toggle (Pkt/Box vs Carton) */}
          <div className="bg-stone-100 p-1 rounded-xl flex items-center mb-3">
            <button
              onClick={() => setPackOption('unit')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all ${
                packOption === 'unit'
                  ? 'bg-white text-stone-900 shadow-sm font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="text-[10px] text-stone-400 font-mono leading-none">
                {product.pricing.unitLabel}
              </div>
              <div className="font-bold text-xs mt-0.5">
                RM {product.pricing.unitPrice.toFixed(2)}
              </div>
            </button>

            {hasCartonOption ? (
              <button
                onClick={() => setPackOption('carton')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all relative ${
                  packOption === 'carton'
                    ? 'bg-amber-700 text-white shadow-sm font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {discountPercent > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-600 text-white text-[9px] font-black px-1 rounded-full shadow">
                    {lang === 'zh' ? `省 ${discountPercent}%` : lang === 'ms' ? `Jimat ${discountPercent}%` : `Save ${discountPercent}%`}
                  </span>
                )}
                <div className={`text-[10px] font-mono leading-none ${packOption === 'carton' ? 'text-amber-200' : 'text-stone-400'}`}>
                  {product.pricing.cartonLabel}
                </div>
                <div className="font-bold text-xs mt-0.5">
                  RM {product.pricing.cartonPrice?.toFixed(2)}
                </div>
              </button>
            ) : (
              <div className="flex-1 text-center py-1 text-[11px] text-stone-400 italic">
                {lang === 'zh' ? '整箱需询价' : lang === 'ms' ? 'Tanya Kotak' : 'Bulk Inquire'}
              </div>
            )}
          </div>

          {/* Add to Cart Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-8 text-stone-600 hover:bg-stone-200 font-bold text-sm flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-stone-800 font-mono">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-8 text-stone-600 hover:bg-stone-200 font-bold text-sm flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-amber-700 text-white active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? '已加购物车' : lang === 'ms' ? 'Telah Ditambah!' : 'Added!'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'zh' ? '加入购物车' : lang === 'ms' ? 'Tambah Troli' : 'Add to Cart'} (RM {(currentPrice * quantity).toFixed(2)})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
