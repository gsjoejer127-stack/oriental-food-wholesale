import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Package, Clock, Snowflake, Check, Plus } from 'lucide-react';
import { Language, Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  lang: Language;
  onAddToCart: (product: Product, packOption: 'unit' | 'carton', quantity: number) => void;
  onOpenHalalStatement?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  lang,
  onAddToCart,
  onOpenHalalStatement,
}) => {
  if (!product) return null;

  const [packOption, setPackOption] = useState<'unit' | 'carton'>('unit');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const hasCartonOption = product.pricing.cartonPrice !== null;
  const currentPrice =
    packOption === 'unit'
      ? product.pricing.unitPrice
      : product.pricing.cartonPrice || product.pricing.unitPrice;

  const handleAdd = () => {
    onAddToCart(product, packOption, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Wholesale Summary Box (No Photos) */}
          <div className="rounded-2xl bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-500 text-stone-950 font-mono text-sm font-black px-3 py-1 rounded-lg shadow-sm">
                  {product.code}
                </span>
                <span className="text-xs font-mono text-amber-300 bg-amber-900/50 px-2.5 py-1 rounded-full border border-amber-500/30">
                  {lang === 'zh' ? '批发批次规范号' : 'Wholesale SKU'}
                </span>
              </div>

              <div className="space-y-3 my-6">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                  <span className="text-[11px] text-amber-300 block mb-1">
                    {lang === 'zh' ? '小包/单件规格' : 'Single Pack Specification'}
                  </span>
                  <span className="text-sm font-bold font-mono">{product.pricing.unitLabel}</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                  <span className="text-[11px] text-amber-300 block mb-1">
                    {lang === 'zh' ? '整箱批发规格' : 'Carton Wholesale Specification'}
                  </span>
                  <span className="text-sm font-bold font-mono">{product.pricing.cartonLabel}</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 text-white p-3 rounded-xl text-xs flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                {lang === 'zh'
                  ? '全程 -18°C 冷链速冻保存，开封即烹'
                  : 'Keep frozen at -18°C, ready to cook.'}
              </span>
            </div>
          </div>

          {/* Right Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  {lang === 'zh' ? product.categoryZh : lang === 'ms' ? (product.categoryMs || product.categoryEn) : product.categoryEn}
                </span>
                {product.cert === 'HALAL' && (
                  <button
                    onClick={() => {
                      if (onOpenHalalStatement) {
                        onClose();
                        onOpenHalalStatement();
                      }
                    }}
                    className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded flex items-center gap-1 transition-colors"
                    title={lang === 'zh' ? '点击查看官方 HALAL 清真合规与证书声明' : 'Click to view Halal Declaration'}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>HALAL 清真认证</span>
                  </button>
                )}
                {(product.isSpicy || product.nameZh.includes('🌶️')) && (
                  <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <span>🌶️ 香辣 Mala Spicy</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'zh' ? product.nameZh : lang === 'ms' ? (product.nameMs || product.nameEn) : product.nameEn}
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                {product.nameEn}
              </p>

              <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
                {lang === 'zh' ? product.descriptionZh : lang === 'ms' ? (product.descriptionMs || product.descriptionEn) : product.descriptionEn}
              </div>

              {/* Wholesale Specifications Box */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{lang === 'zh' ? '小包/单盒规格' : lang === 'ms' ? 'Spesifikasi Pek Tunggal' : 'Single Pack Spec'}:</span>
                  <span className="font-bold text-stone-900 font-mono">{product.pricing.unitLabel}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{lang === 'zh' ? '整箱批发规格' : lang === 'ms' ? 'Spesifikasi Borong Kotak' : 'Carton Wholesale Spec'}:</span>
                  <span className="font-bold text-stone-900 font-mono">{product.pricing.cartonLabel}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{lang === 'zh' ? '认证属性' : lang === 'ms' ? 'Persijilan' : 'Certification'}:</span>
                  <span className="font-bold text-stone-900">{product.cert}</span>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart Controls */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setPackOption('unit')}
                  className={`flex-1 p-2 rounded-xl border text-xs text-left transition-all ${
                    packOption === 'unit'
                      ? 'border-amber-600 bg-amber-50/50 text-amber-950 font-bold shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="text-[10px] text-stone-400">{product.pricing.unitLabel}</div>
                  <div className="text-sm font-black text-amber-700 mt-0.5">
                    RM {product.pricing.unitPrice.toFixed(2)}
                  </div>
                </button>

                {hasCartonOption && (
                  <button
                    onClick={() => setPackOption('carton')}
                    className={`flex-1 p-2 rounded-xl border text-xs text-left transition-all ${
                      packOption === 'carton'
                        ? 'border-amber-600 bg-amber-700 text-white font-bold shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className={packOption === 'carton' ? 'text-amber-200 text-[10px]' : 'text-stone-400 text-[10px]'}>
                      {product.pricing.cartonLabel}
                    </div>
                    <div className="text-sm font-black mt-0.5">
                      RM {product.pricing.cartonPrice?.toFixed(2)}
                    </div>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-100 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 font-bold text-stone-700 hover:bg-stone-200 rounded-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold font-mono text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 font-bold text-stone-700 hover:bg-stone-200 rounded-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{lang === 'zh' ? '添加成功！' : lang === 'ms' ? 'Berjaya Ditambah!' : 'Added to Cart!'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
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
      </div>
    </div>
  );
};
