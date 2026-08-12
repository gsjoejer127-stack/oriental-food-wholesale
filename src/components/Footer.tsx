import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Truck, ChevronRight } from 'lucide-react';

import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onCategorySelect: (catId: string) => void;
  onOpenDisclaimer?: () => void;
  onOpenHalalStatement?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onCategorySelect, onOpenDisclaimer, onOpenHalalStatement }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-8 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-sm">
                东
              </div>
              <div>
                <h3 className="font-bold text-white text-sm font-serif">东升食品</h3>
                <p className="text-[10px] text-amber-500 font-mono tracking-wider font-semibold">
                  ORIENTAL FOOD WHOLESALE SDN. BHD. ( 1653595-A )
                </p>
              </div>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              {lang === 'zh'
                ? '专注中式食品研发、买卖与餐饮供应链解决方案。为独立餐厅、Cafe、酒店、Food Court 及连锁餐饮集团提供冷冻料理包与标准化食材。'
                : 'Dedicated to Chinese food R&D, trading, and F&B supply chain solutions in Malaysia.'}
            </p>
            <div className="pt-2 text-[11px] text-amber-300/90 italic font-serif">
              “ 让餐饮更简单，让标准化成为增长的力量 ”
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-serif">
              {lang === 'zh' ? '联系与批发咨询' : 'Contact & Address'}
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Kuala Lumpur, Malaysia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:0108822608" className="hover:text-amber-400 font-mono font-bold text-stone-200">
                  010-882 2608
                </a>
              </div>
              <div className="text-[11px] text-amber-400/90 font-mono pl-6">
                ⏱ {lang === 'zh' ? '工作时间: 周一至周五 10:00 AM - 6:00 PM' : 'Operating Hours: Mon - Fri 10:00 AM - 6:00 PM'}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:orientalfood9319@gmail.com" className="hover:text-amber-400 font-mono">
                  orientalfood9319@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Delivery & Cold Chain Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-serif">
              {lang === 'zh' ? '冷链配送说明' : 'Delivery & Notes'}
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>巴生谷 Klang Valley: 满 <strong className="text-stone-200">RM500</strong> 免费配送</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>外坡 Outstation: 满 <strong className="text-stone-200">RM800</strong> 免费配送</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>未达最低金额按地区收取运费；冷冻产品需有人接收，二次配送可能另行收费。</span>
              </li>
            </ul>
          </div>

          {/* Quick Categories Jump */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-serif">
              {lang === 'zh' ? '热销批发类目' : 'Popular Categories'}
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-stone-400">
              <button onClick={() => onCategorySelect('ready_to_eat')} className="hover:text-amber-400 text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-600" />
                <span>预制菜包</span>
              </button>
              <button onClick={() => onCategorySelect('skewer_series')} className="hover:text-amber-400 text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-600" />
                <span>串串烧烤</span>
              </button>
              <button onClick={() => onCategorySelect('soup_base')} className="hover:text-amber-400 text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-600" />
                <span>火锅汤底</span>
              </button>
              <button onClick={() => onCategorySelect('lobster_series')} className="hover:text-amber-400 text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-600" />
                <span>麻辣小龙虾</span>
              </button>
              <button onClick={() => onCategorySelect('halal_balls')} className="hover:text-amber-400 text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-600" />
                <span>Halal清真丸子</span>
              </button>
              <button onClick={() => onCategorySelect('snacks_desserts')} className="hover:text-amber-400 text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-600" />
                <span>红糖糍粑</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            <div>© {new Date().getFullYear()} 东升食品 ORIENTAL FOOD WHOLESALE SDN. BHD. ( 1653595-A ). All Rights Reserved.</div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {lang === 'zh'
                ? '免责声明：此页面由 AI 生成，可能会出错，只供参考。'
                : lang === 'ms'
                ? 'Penafian: Halaman ini dijana oleh AI, mungkin terdapat kesilapan dan adalah untuk rujukan sahaja.'
                : 'Disclaimer: This page is AI-generated, may contain errors, and is for reference only.'}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {onOpenDisclaimer && (
              <button 
                onClick={onOpenDisclaimer} 
                className="text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'zh' ? '查看批发采购条款与细则' : 'Terms & Conditions'}</span>
              </button>
            )}

            <span className="text-stone-500">|</span>
            <span>规格单价仅供参考，请以发票实物为准。</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
