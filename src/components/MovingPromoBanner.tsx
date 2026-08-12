import React from 'react';
import { Sparkles, TrendingUp, Truck, ShieldCheck, PhoneCall, ArrowRight, Award, Zap } from 'lucide-react';

import { Language } from '../types';

interface MovingPromoBannerProps {
  lang: Language;
  onOpenOEM?: () => void;
}

export const MovingPromoBanner: React.FC<MovingPromoBannerProps> = ({ lang, onOpenOEM }) => {
  const promoItems = [
    {
      icon: <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />,
      highlight: lang === 'zh' ? 'Ready to Grow Your Restaurant Business?' : lang === 'ms' ? 'Bersedia Mengembangkan Perniagaan Restoran Anda?' : 'Ready to Grow Your Restaurant Business?',
      text: lang === 'zh' ? '让我们成为您的长期稳定的食品供应伙伴！' : lang === 'ms' ? 'Jadikan Kami Rakan Bekalan Makanan Boleh Dipercayai Anda!' : 'Let Us Be Your Reliable Food Supply Partner!',
      badge: lang === 'zh' ? '连锁餐饮极速对接' : lang === 'ms' ? 'Rakan Bekalan F&B' : 'F&B Supply Partner',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />,
      highlight: lang === 'zh' ? 'OEM / ODM 汤底与料理包专属研发' : lang === 'ms' ? 'Penyelidikan & Pembangunan OEM / ODM Kuah & Pak Makanan' : 'OEM / ODM Custom Recipe R&D',
      text: lang === 'zh' ? '独家风味配方保密，标准化单餐小包分装' : lang === 'ms' ? 'Formulasi Rasa Khas & Pembungkusan Terstandard' : 'Custom Taste Formulation & Standardized Packaging',
      badge: lang === 'zh' ? '贴牌代工定制' : lang === 'ms' ? 'Tempahan OEM' : 'Custom OEM',
      action: 'oem',
    },
    {
      icon: <Truck className="w-4 h-4 text-sky-400 shrink-0" />,
      highlight: lang === 'zh' ? '全马 -18°C 零下冷链直达门店' : lang === 'ms' ? 'Penghantaran Rantaian Sejuk -18°C Seluruh Malaysia' : 'Whole Malaysia Cold-Chain Direct Delivery',
      text: lang === 'zh' ? '巴生谷满 RM500 包邮 | 外坡满 RM800 包邮' : lang === 'ms' ? 'Penghantaran Percuma: Lembah Klang > RM500 | Luar Kawasan > RM800' : 'Free Delivery Klang Valley > RM500 | Outstation > RM800',
      badge: lang === 'zh' ? '冷链保障' : lang === 'ms' ? 'Rantaian Sejuk' : 'Cold-Chain',
    },
    {
      icon: <Award className="w-4 h-4 text-emerald-400 shrink-0" />,
      highlight: lang === 'zh' ? 'Halal 清真认证 & 厂价整箱批发出货' : lang === 'ms' ? 'Persijilan Halal & Harga Borong Kotak Kilang' : 'Halal Certified & Wholesale Carton Pricing',
      text: lang === 'zh' ? '单盒零购与整箱批发双模式，随时随地下单' : lang === 'ms' ? 'Menyokong Pesanan Runcit Packet & Borong Kotak' : 'Retail Packet & Carton Bulk Orders Supported',
      badge: 'B2B Wholesale',
    },
    {
      icon: <PhoneCall className="w-4 h-4 text-emerald-300 shrink-0" />,
      highlight: lang === 'zh' ? 'B2B 大宗采购与试样咨询专线' : lang === 'ms' ? 'Talian Hangat Sampel & Pesanan Pukal B2B' : 'B2B Sample Request & Order Hotline',
      text: lang === 'zh' ? 'WhatsApp: 010-882 2608 (周一至周五 10:00 AM - 6:00 PM)' : lang === 'ms' ? 'WhatsApp: 010-882 2608 (Isnin-Jumaat 10:00 AM - 6:00 PM)' : 'WhatsApp: 010-882 2608 (Mon-Fri 10:00 AM - 6:00 PM)',
      badge: lang === 'ms' ? 'Isn-Jum 10AM-6PM' : 'Mon-Fri 10AM-6PM',
      action: 'whatsapp',
    },
  ];

  const handleActionClick = (action?: string) => {
    if (action === 'oem' && onOpenOEM) {
      onOpenOEM();
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/60108822608?text=你好，我想咨询东升食品餐饮大宗批发与样品采购。', '_blank');
    }
  };

  return (
    <div className="bg-stone-950 text-stone-100 border-b border-amber-500/30 overflow-hidden relative shadow-md z-20 select-none">
      {/* Subtle Top Glow Line */}
      <div className="h-0.5 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 opacity-80" />

      {/* Marquee Wrapper */}
      <div className="py-2.5 px-2 flex items-center overflow-hidden whitespace-nowrap group">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 shrink-0">
          {/* Double map to create seamless loop */}
          {[...promoItems, ...promoItems].map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleActionClick(item.action)}
              className={`inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium transition-all ${
                item.action ? 'cursor-pointer hover:text-amber-300 hover:scale-[1.02]' : ''
              }`}
            >
              {item.icon}

              {/* Tag Badge */}
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] sm:text-xs font-bold font-mono px-2 py-0.5 rounded-md uppercase tracking-wide">
                {item.badge}
              </span>

              {/* Main Text */}
              <span className="font-bold text-amber-200 tracking-tight font-serif">
                {item.highlight}
              </span>

              <span className="text-stone-300 font-normal">
                {item.text}
              </span>

              {item.action && (
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-400 bg-stone-900 px-2 py-0.5 rounded border border-amber-500/30 ml-1">
                  <span>{item.action === 'oem' ? (lang === 'zh' ? '申请试样' : lang === 'ms' ? 'Mohon Sampel' : 'Request OEM') : (lang === 'zh' ? '点击联系' : lang === 'ms' ? 'Hubungi Kami' : 'Contact Us')}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              )}

              {/* Separator Bullet */}
              <span className="text-amber-500/40 ml-4 font-bold">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover to Pause Prompt */}
      <div className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 bg-stone-900/90 text-[10px] text-stone-400 font-mono px-2 py-0.5 rounded border border-stone-800 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
        {lang === 'zh' ? '悬停暂停滚动' : 'Hover to Pause'}
      </div>
    </div>
  );
};
