import React from 'react';
import { ShieldCheck, X, FileCheck, CheckCircle2, AlertCircle, PhoneCall, Download, Printer, Award, Snowflake, Lock } from 'lucide-react';

import { Language } from '../types';

interface HalalStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HalalStatementModal: React.FC<HalalStatementModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const handleWhatsAppCertRequest = () => {
    const text = lang === 'zh'
      ? '你好，我是餐饮客户，请提供东升食品 Halal 清真认证证书 (Sijil Pengesahan Halal) 副本用于开店备案及卫生检查。'
      : 'Hello, I am an F&B client. Please send me the official Halal Certification (Sijil Pengesahan Halal Malaysia) copy for license verification.';
    window.open(`https://wa.me/60108822608?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col p-6 sm:p-8 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold shrink-0 border border-emerald-300">
              <Award className="w-7 h-7 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                  {lang === 'zh' ? '东升食品 · 官方清真 (HALAL) 食材合规声明' : 'Oriental Food · Official Halal Compliance Declaration'}
                </h2>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Halal Certified
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-mono font-bold mt-0.5">
                {lang === 'zh' ? '官方清真 (HALAL) 食材合规与商户自查声明' : 'Official Halal Compliance & Merchant Self-Verification Statement'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="py-5 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed overflow-y-auto max-h-[62vh] pr-1">
          {/* Top Banner Notice */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-950 text-xs sm:text-sm">
                {lang === 'zh' ? '【严谨合规声明】面向全马餐饮餐馆、超市及连锁门店' : '【Official Notice】For All F&B Outlets, Supermarkets & Chain Stores'}
              </h3>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                {lang === 'zh'
                  ? '东升食品（ORIENTAL FOOD WHOLESALE SDN BHD）高度重视食品安全与清真合规。本平台所有标注 “HALAL” 绿色图标之冷冻丸子、小吃、汤底及预制食材，均严格符合马来西亚清真标准 (MS 1500) 及 JAKIM 或认可之权威机构认证。'
                  : 'ORIENTAL FOOD WHOLESALE SDN BHD ensures strict Halal integrity. All products bearing the green "HALAL" logo comply with Malaysian Halal Standards (MS 1500) certified by JAKIM or recognized bodies.'}
              </p>
            </div>
          </div>

          {/* Core Articles Grid */}
          <div className="space-y-3">
            {/* Clause 1 */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-1.5 flex items-center gap-2 font-serif">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'zh' ? '一、 清真认证范围与来源标准 (Halal Accreditation)' : '1. Halal Accreditation & Source Compliance'}</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'zh'
                  ? '所有具有清真标识的系列产品（如清真牛肉丸、清真鸡肉丸、特选小吃包等），均由具备合法清真认证工厂生产制造。原辅料采购、屠宰方式（针对肉类产品）均遵照伊斯兰教法规范（Shariah Law），不含猪肉成分（No Pork / Lard）及非清真衍生物。'
                  : 'All Halal-badged items are manufactured in certified facilities. Ingredients and slaughtering protocols adhere strictly to Shariah law and contain zero pork, lard, or non-halal derivatives.'}
              </p>
            </div>

            {/* Clause 2 */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-1.5 flex items-center gap-2 font-serif">
                <Snowflake className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{lang === 'zh' ? '二、 冷链隔离与交叉污染防护 (Cross-Contamination Protocol)' : '2. Cold-Chain Segregation & Hygiene Control'}</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'zh'
                  ? '在冷库储存、包装分拣及 -18°C 冷链运输全过程中，清真产品采用独立密封双层厚袋（Hermetically Sealed Pack）包装，并实行严格的仓储区物理隔离（Physical Segregation），确保在物流配送阶段绝对无交叉污染（Zero Cross-Contamination）。'
                  : 'During -18°C storage and transit, all Halal goods are hermetically sealed in heavy-duty food-grade packaging with physical segregation to prevent any cross-contamination.'}
              </p>
            </div>

            {/* Clause 3 */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-1.5 flex items-center gap-2 font-serif">
                <FileCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{lang === 'zh' ? '三、 证书索取与市政局/JAKIM 报备 (Certificate Request for Licensing)' : '3. Halal Sijil Documentation for Municipal Audits'}</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'zh'
                  ? '如您的餐厅、酒店厨房或商超采购部门需要官方清真认证证书（Sijil Pengesahan Halal Malaysia / Foreign Recognised Body）副本以配合市政局（如 DBKL, MBPJ, MPSJ 等）或卫生局检查，可直接联系客服调取正本扫描件。'
                  : 'F&B merchants requiring official Halal certificate copies (Sijil Pengesahan Halal) for local municipal council or JAKIM licensing audits can request digital copies anytime via WhatsApp.'}
              </p>
            </div>

            {/* Clause 4 */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-1.5 flex items-center gap-2 font-serif">
                <AlertCircle className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{lang === 'zh' ? '四、 区分说明与商户自查指南 (Product Differentiation)' : '4. Merchant Self-Verification Guide'}</span>
              </h4>
              <p className="text-xs text-stone-800 font-medium leading-relaxed">
                本平台同时供应传统中式特色食材（未标示 HALAL 者）。请各采购主管在下单前详细核对菜单用料需求后再行采购。
              </p>
              <p className="text-xs text-stone-700 leading-relaxed pt-1.5 border-t border-stone-200">
                Our platform also supplies traditional Chinese specialty ingredients (unmarked with HALAL). Purchasing managers are advised to carefully verify menu requirements before placing orders.
              </p>
              <p className="text-xs text-stone-700 leading-relaxed pt-1.5 border-t border-stone-200">
                Platform kami juga membekalkan bahan makanan keistimewaan tradisional Cina (yang tidak ditandakan dengan HALAL). Pengurus pembelian dinasihatkan untuk menyemak keperluan menu sebelum membuat pesanan.
              </p>
            </div>
          </div>

          {/* Certificate Request Action Card */}
          <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-700/50 shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-emerald-300 text-xs sm:text-sm">
                  {lang === 'zh' ? '索取官方 Halal 清真证书 PDF 副本' : 'Request Official Halal Certificates (PDF)'}
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {lang === 'zh'
                  ? '专线 WhatsApp: 010-882 2608 (工作时间: 周一至周五 10:00 AM - 6:00 PM)'
                  : 'Hotline WhatsApp: 010-882 2608 (Mon-Fri 10:00 AM - 6:00 PM)'}
              </p>
            </div>

            <button
              onClick={handleWhatsAppCertRequest}
              className="w-full sm:w-auto py-2.5 px-5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shrink-0 transition-all shadow-sm active:scale-95"
            >
              <FileCheck className="w-4 h-4" />
              <span>{lang === 'zh' ? '联系发送证书' : 'Request via WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>{lang === 'zh' ? '关闭声明' : 'Close Declaration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
