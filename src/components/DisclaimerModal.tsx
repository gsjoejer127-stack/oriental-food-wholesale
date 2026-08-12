import React, { useState } from 'react';
import { ShieldAlert, X, FileText, Check, AlertTriangle, Snowflake, CreditCard, Truck, RefreshCw, Lock } from 'lucide-react';

import { Language } from '../types';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenHalalStatement?: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenHalalStatement,
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'delivery' | 'returns' | 'halal'>('terms');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col p-6 sm:p-8 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-bold shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                {lang === 'zh' ? '东升食品 · 批发采购条款与细则' : lang === 'ms' ? 'Oriental Food · Terma & Syarat Pembelian Borong' : 'Oriental Food · Terms & Conditions'}
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                ORIENTAL FOOD WHOLESALE SDN BHD (TERMS & CONDITIONS)
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

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 pb-2 border-b border-stone-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'terms'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'zh' ? '1. 订购与结算条款' : lang === 'ms' ? '1. Pesanan & Bayaran' : '1. Order & Payment'}
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'delivery'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'zh' ? '2. 冷链配送责任' : lang === 'ms' ? '2. Logistik Sejuk' : '2. Cold-chain Logistics'}
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'returns'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'zh' ? '3. 验货与退换条款' : lang === 'ms' ? '3. Semakan & Pulangan' : '3. Claims & Returns'}
          </button>
          <button
            onClick={() => setActiveTab('halal')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'halal'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'zh' ? '4. 清真 certification 与保密' : lang === 'ms' ? '4. Halal & Kerahsiaan' : '4. Halal & Confidentiality'}
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed overflow-y-auto max-h-[60vh] pr-1">
          {/* TAB 1: Order & Payment */}
          {(activeTab === 'terms' || activeTab === undefined) && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'zh' ? '第一条：应用范围与订购效力' : 'Article 1: Scope & Order Placement'}</span>
                </h3>
                <p>
                  {lang === 'zh'
                    ? '本条款与细则（以下简称“本条款”）适用于所有通过东升食品（ORIENTAL FOOD WHOLESALE SDN BHD）线上展示系统、官方 WhatsApp 或销售代表提交之食材采购订单。买方在提交订单并付款后，即视为已全面理解并同意接受本条款之约束。'
                    : 'These Terms & Conditions apply to all wholesale purchasing orders submitted to ORIENTAL FOOD WHOLESALE SDN BHD via online platform, official WhatsApp, or sales personnel. By placing an order, the buyer agrees to be bound by these terms.'}
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'zh' ? '第二条：价格、规格与结算方式' : 'Article 2: Pricing & Payment Terms'}</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
                  <li>
                    {lang === 'zh'
                      ? '平台展示之批发单价及箱装优惠均以马币 (RM) 计价。所有产品参数均按原厂生产标准标示。'
                      : 'All prices are quoted in Malaysian Ringgit (RM). Case discounts apply to whole carton orders.'}
                  </li>
                  <li>
                    {lang === 'zh'
                      ? '付款方式支持线上网银 (FPX)、DuitNow QR、信用卡及银行转账。除非已另行签署 B2B 月结信用协议，所有货物须全额结清后方可安排安排冷链发货。'
                      : 'Payment methods include FPX Online Banking, DuitNow QR, Credit Card, and Direct Bank Transfer. Full settlement is required prior to dispatch unless prior B2B credit line terms exist.'}
                  </li>
                  <li>
                    {lang === 'zh'
                      ? '本公司保留因市场大宗食材原料成本变动而调整批发价格的权利，最终发货价格以正式 Sales Invoice 发票为准。'
                      : 'Prices are subject to market fluctuations; the final invoice amount governs all transactions.'}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Cold-Chain Logistics */}
          {activeTab === 'delivery' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'zh' ? '第三条：冷链运费补贴与配送标准' : 'Article 3: Cold-Chain Delivery Policies'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-bold text-amber-900 text-xs block">巴生谷 Klang Valley</span>
                    <span className="text-xs text-amber-800">满 <strong className="text-amber-950 font-mono">RM 500</strong> 免费冷链送货上门；未达额度收取 RM 40 标准冷链运费。</span>
                  </div>
                  <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl">
                    <span className="font-bold text-stone-900 text-xs block">外坡 Outstation</span>
                    <span className="text-xs text-stone-700">满 <strong className="text-stone-900 font-mono">RM 800</strong> 免费冷链配送；未达额度收取 RM 40 标准冷链托运费。</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <Snowflake className="w-4 h-4 text-sky-600" />
                  <span>{lang === 'zh' ? '第四条：现场签收与低温冷藏责任' : 'Article 4: Cold Storage & Risk Transfer'}</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'zh'
                    ? '所有冷冻料理包及熟食食材均全程以 -18°C 冷藏车输送。买方必须确保送货预定时间内现场有人员接收，并在签收后 15 分钟内存入 -18°C 商业冷柜。若因现场无人接货、电话无人接听导致二次派送，产生的额外冷链运费由买方负担；因签收后未及时冷藏导致的解冻变质，本公司概不承担责任。'
                    : 'All frozen goods are transported via -18°C refrigerated vehicles. Buyers must ensure personnel are on site to inspect and transfer goods into -18°C cold storage within 15 minutes of receipt. The company is not liable for spoilage caused by delayed storage or failed delivery attempts.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Returns & Claims */}
          {activeTab === 'returns' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Highlight Banner for 1-Day Notice Requirement */}
              <div className="bg-amber-500/10 border border-amber-500/40 p-3.5 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                    {lang === 'zh' ? '【重要提示】验货申诉时效：收货 1 天（24 小时）内' : '【IMPORTANT】Return Notice Window: Within 1 Day (24 Hours) Upon Receipt'}
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    {lang === 'zh'
                      ? '为了保障冷链食材品质与卫生安全，请于签收货物当场核对。如有任何品质异常、破损漏气或数量不符，必须在收货后 1 天（24小时）内联系客服并提供照片证据。'
                      : 'To ensure cold-chain food safety and quality, please inspect all goods upon arrival. Any defect, packaging damage, or quantity mismatch MUST be reported with photos within 1 day (24 hours) of delivery.'}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <RefreshCw className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'zh' ? '第五条：当场验货与 24 小时（1天）申诉规则' : 'Article 5: Inspection & 1-Day (24-Hour) Return Claims'}</span>
                </h3>
                <p className="text-xs text-stone-600 mb-2">
                  {lang === 'zh'
                    ? '货物送达时，请买方接货人员当场核对货物数量与真空包装完好度。如发生以下情形，买方须于收到货物后 1 天（24 小时）内向本公司 WhatsApp 客服 (010-882 2608) 提交照片或视频证据：'
                    : 'Inspect goods immediately upon delivery. Claims for the following must be submitted with photo/video proof within 1 day (24 hours) of receiving:'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>{lang === 'zh' ? '外包装箱严重破损、压塌或真空包装袋失压漏气；' : 'Severe outer carton damage, crushing, or unsealed/punctured vacuum packaging;'}</li>
                  <li>{lang === 'zh' ? '实收货物数量或规格与发票及订货清单不符；' : 'Discrepancy between received quantity/specifications and the official sales invoice;'}</li>
                  <li>{lang === 'zh' ? '开封前发现非人为导致的冷冻食品品质异常。' : 'Pre-opening defect or quality anomaly present upon cold-chain arrival.'}</li>
                </ul>
              </div>

              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">【不予退换情形 Notification of Non-Eligibility】</span>
                <p>
                  {lang === 'zh'
                    ? '超过收货 1 天（24 小时）未联系反馈、签收后未及时存入 -18°C 冷库导致解冻变质、或因非标准烹饪/解冻操作导致的口感差异，恕不受理退换货或退款申请。'
                    : 'Claims submitted beyond 1 day (24 hours) after receipt, spoilage caused by failure to store in -18°C freezer upon receipt, or quality changes due to non-standard thawing/cooking methods are strictly non-refundable.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Halal & Confidentiality */}
          {activeTab === 'halal' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <AlertTriangle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'zh' ? '第六条：清真 (HALAL) 认证标志划分' : 'Article 6: Halal Certification Standards'}</span>
                </h3>
                <p className="text-xs text-stone-600">
                  {lang === 'zh'
                    ? '带有绿底 “HALAL” 专属图标之产品（如清真牛丸、Halal 鸡肉串等），均具备合法 JAKIM 或权威机构认证，完全符合穆斯林餐馆使用要求。未标注 HALAL 图标者为中式传统食材。请各餐饮客户依自身门店经营资质与菜品需求核对采购。'
                    : 'Items marked with the "HALAL" badge are certified by JAKIM or recognized authorities, suitable for Halal F&B outlets. Unmarked products belong to classic Chinese culinary items.'}
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'zh' ? '第七条：OEM 定制配方保密与知识产权' : 'Article 7: OEM Confidentiality & IP'}</span>
                </h3>
                <p className="text-xs text-stone-600">
                  {lang === 'zh'
                    ? '本公司为连锁餐饮客户研制之独家汤底与专用酱料，均受严格的保密协议（NDA）保护。独家配方知识产权属于双方约定之权利人，未经授权不得擅自转让或泄露予第三方。'
                    : 'Custom soup bases and sauces developed for F&B chains are governed by non-disclosure agreements (NDAs). Custom formulation IP rights remain protected under mutual contracts.'}
                </p>
              </div>

              <div className="bg-stone-900 text-stone-300 p-4 rounded-2xl border border-stone-800 text-xs">
                <p className="font-bold text-amber-400 mb-1">
                  {lang === 'zh' ? '第八条：法律适用与最终解释权' : 'Article 8: Governing Law & Jurisdiction'}
                </p>
                <p>
                  {lang === 'zh'
                    ? '本条款适用马来西亚现行法律。东升食品（ORIENTAL FOOD WHOLESALE SDN BHD）保留随时修订本条款与细则的权利，最新条款公示于官方平台即刻生效。'
                    : 'These terms are governed by the laws of Malaysia. ORIENTAL FOOD WHOLESALE SDN BHD reserves all rights for final interpretation.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Button */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-500">
            {lang === 'zh' ? '咨询电话: 010-882 2608 (工作时间: 周一至周五 10:00 AM - 6:00 PM)' : lang === 'ms' ? 'Talian Pertanyaan: 010-882 2608 (Isnin-Jumaat 10:00 AM - 6:00 PM)' : 'Support: 010-882 2608 (Mon-Fri 10:00 AM - 6:00 PM)'}
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'zh' ? '我已阅读并完全同意上述条款与细则' : lang === 'ms' ? 'Saya Telah Membaca & Bersetuju dengan Terma & Syarat' : 'I Have Read & Agree to Terms'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

