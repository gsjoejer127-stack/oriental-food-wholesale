import React from 'react';
import { Sparkles, ShieldCheck, Truck, Clock, DollarSign, Repeat, ArrowDown } from 'lucide-react';
import { Language } from '../types';

interface HeroBannerProps {
  lang: Language;
  onExploreCatalog: () => void;
  onOpenOEM: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onExploreCatalog,
  onOpenOEM,
}) => {
  const valuePropsZh = [
    { num: '01', title: '稳定味道', desc: '标准化配方', icon: Sparkles },
    { num: '02', title: '简化后厨', desc: '极速复热', icon: Clock },
    { num: '03', title: '减少备料', desc: '预制开包即用', icon: ShieldCheck },
    { num: '04', title: '快速出餐', desc: '提升翻台率', icon: Truck },
    { num: '05', title: '控制成本', desc: '零食材浪费', icon: DollarSign },
    { num: '06', title: '提升效率', desc: '降低人工依赖', icon: Sparkles },
    { num: '07', title: '加速复制', desc: '支持连锁加盟', icon: Repeat },
  ];

  const valuePropsEn = [
    { num: '01', title: 'Consistent Taste', desc: 'Standardized Recipes', icon: Sparkles },
    { num: '02', title: 'Simplified Kitchen', desc: 'Fast Reheating', icon: Clock },
    { num: '03', title: 'Less Prep Work', desc: 'Ready-to-use', icon: ShieldCheck },
    { num: '04', title: 'Faster Service', desc: 'Higher Turnover', icon: Truck },
    { num: '05', title: 'Cost Control', desc: 'Zero Food Waste', icon: DollarSign },
    { num: '06', title: 'Higher Efficiency', desc: 'Reduce Labor', icon: Sparkles },
    { num: '07', title: 'Fast Replication', desc: 'Franchise Ready', icon: Repeat },
  ];

  const valuePropsMs = [
    { num: '01', title: 'Rasa Konsisten', desc: 'Resipi Standard', icon: Sparkles },
    { num: '02', title: 'Dapur Ringkas', desc: 'Panas Pantas', icon: Clock },
    { num: '03', title: 'Sedia Diguna', desc: 'Tanpa Sediaan', icon: ShieldCheck },
    { num: '04', title: 'Servis Pantas', desc: 'Pusingan Meja', icon: Truck },
    { num: '05', title: 'Kawal Kos', desc: 'Sifar Pembaziran', icon: DollarSign },
    { num: '06', title: 'Kecekapan', desc: 'Kurangkan Buruh', icon: Sparkles },
    { num: '07', title: 'Replikasi', desc: 'Sedia Francais', icon: Repeat },
  ];

  const valueProps = lang === 'zh' ? valuePropsZh : lang === 'ms' ? valuePropsMs : valuePropsEn;

  return (
    <div className="relative bg-gradient-to-b from-stone-900 via-stone-880 to-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>
              {lang === 'zh' 
                ? '马来西亚一站式中式餐饮供应链' 
                : lang === 'ms' 
                ? 'Rangkaian Bekalan Makanan Cina Sehenti di Malaysia' 
                : 'One-Stop Chinese F&B Supply Chain in Malaysia'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif mb-3">
            {lang === 'zh' 
              ? '东升食品 · 批发价目表' 
              : lang === 'ms' 
              ? 'PEMBEKALAN BORONG ORIENTAL FOOD' 
              : 'ORIENTAL FOOD WHOLESALE'}
          </h1>

          {/* Core Slogan */}
          <p className="text-base sm:text-lg lg:text-xl text-amber-200/90 font-serif italic mb-6">
            “ {lang === 'zh' 
              ? '让餐饮更简单，让标准化成为增长的力量。' 
              : lang === 'ms'
              ? 'Mempermudahkan perkhidmatan makanan — menjadikan standardisasi sebagai kuasa pertumbuhan.'
              : 'Making food service simpler — turning standardization into the power of growth.'} ”
          </p>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {lang === 'zh'
              ? '深耕马来西亚餐饮市场，提供冷冻料理包、滋补靓汤、中式酱料、火锅汤底、串串与Halal清真丸子等 74 款高品质标准化食材。支持零售与整箱批发。'
              : lang === 'ms'
              ? 'Menyediakan 74 penyelesaian makanan berkualiti termasuk hidangan sedia dimakan, sup herba, kuah stimbot, skewer & bebola Halal. Menyokong jualan runcit dan borong.'
              : 'Providing 74 standardized F&B solutions covering frozen ready meals, nourishing soups, hotpot bases, skewers & Halal dim sum. Full carton wholesale and retail supported.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
            <button
              onClick={onExploreCatalog}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-amber-900/30 transition-all active:scale-95"
            >
              <span>{lang === 'zh' ? '立即挑选 74 款食材' : lang === 'ms' ? 'Pilih 74 Bahan Makanan' : 'Browse All 74 Products'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenOEM}
              className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 font-semibold px-5 py-3 rounded-full text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'zh' ? '定制化 OEM & 供应链合作' : lang === 'ms' ? 'Perkhidmatan OEM & Rangkaian Bekalan' : 'Request OEM Customization'}</span>
            </button>
          </div>
        </div>

        {/* 7 Value Pillars Grid */}
        <div className="border-t border-stone-800/80 pt-8 mt-4">
          <div className="text-center text-xs font-semibold uppercase tracking-widest text-amber-400/80 mb-6">
            {lang === 'zh' ? '我们如何帮助您的餐饮门店' : lang === 'ms' ? 'Bagaimana Kami Membantu Perniagaan Makanan Anda' : 'How We Empower Your F&B Business'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {valueProps.map((item, idx) => (
              <div
                key={idx}
                className="bg-stone-800/50 hover:bg-stone-800/90 border border-stone-700/60 rounded-xl p-3 text-center transition-all group cursor-default"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 text-xs font-bold group-hover:scale-110 transition-transform">
                  {item.num}
                </div>
                <div className="text-xs font-bold text-stone-100 mb-0.5">{item.title}</div>
                <div className="text-[10px] text-stone-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
