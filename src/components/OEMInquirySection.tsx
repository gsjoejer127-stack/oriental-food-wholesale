import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, Building, ShieldAlert, Award } from 'lucide-react';

import { Language } from '../types';

interface OEMInquirySectionProps {
  lang: Language;
}

export const OEMInquirySection: React.FC<OEMInquirySectionProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    productType: '预制菜/汤底定制',
    monthlyVolume: '10 - 50 箱',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="oem-section" className="py-12 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-stone-100 relative overflow-hidden border-t border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Explanation */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {lang === 'zh'
                  ? '餐饮供应链与品牌定制生产'
                  : lang === 'ms'
                  ? 'Rantaian Bekalan & Pengeluaran OEM Khas'
                  : 'B2B OEM & Custom R&D'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-serif mb-4">
              {lang === 'zh'
                ? '东升食品 OEM / 连锁餐饮定制解决方案'
                : lang === 'ms'
                ? 'Penyelesaian Khas OEM & Rantaian Makanan Oriental Food'
                : 'OEM Custom Production for F&B Chains'}
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
              {lang === 'zh'
                ? '在东升食品，我们相信真正强大的餐饮品牌，不能只依赖同一个好厨师，而需要一套能够精准复制的标准。无论您是独立餐厅、Cafe、火锅店还是连锁集团，我们均可为您提供独特的专属味型研发与大批量OEM封装生产。'
                : lang === 'ms'
                ? 'Di Oriental Food, kami percaya jenama F&B yang kukuh memerlukan piawaian yang boleh direplikasi dengan tepat. Sama ada anda restoran bebas, kafe, kedai stimbot atau rangkaian restoran, kami menyediakan R&D perasa khas dan pengeluaran OEM secara pukal.'
                : 'A truly strong F&B brand cannot rely on one great chef alone — it needs a replicable standard. We offer custom sauce, soup base, and frozen ready meal OEM manufacturing for restaurants and food chains across Malaysia.'}
            </p>

            <div className="space-y-3">
              {[
                {
                  title: lang === 'zh' ? '独家风味配方保密' : lang === 'ms' ? 'Kerahsiaan Resepi Perasa Khas' : 'Exclusive Flavor NDA Protection',
                  desc: lang === 'zh' ? '签署保密协议，研发专属招牌汤底与酱料' : lang === 'ms' ? 'Perjanjian kerahsiaan (NDA) untuk perasa & sup sup khas' : 'NDAs signed for custom soup base & sauce recipes',
                },
                {
                  title: lang === 'zh' ? '标准化定量封装' : lang === 'ms' ? 'Pembungkusan Standard Terporsi' : 'Standardized Portion Packaging',
                  desc: lang === 'zh' ? '单餐小包独立分装，后厨人员无需复杂繁琐调味' : lang === 'ms' ? 'Pek individu memudahkan penyediaan dapur tanpa kemahiran rumit' : 'Individual pre-portioned packs for effortless kitchen operational standardization',
                },
                {
                  title: lang === 'zh' ? '冷链全马保质稳定' : lang === 'ms' ? 'Liputan Rantaian Sejuk Seluruh Negara' : 'Nationwide Cold-Chain Storage',
                  desc: lang === 'zh' ? '拥有标准化生产设施与冷链仓储网络' : lang === 'ms' ? 'Fasiliti pengeluaran standard & rangkaian logistik sejuk' : 'Standardized production facility and cold-chain logistics network',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-stone-800/40 p-3 rounded-xl border border-stone-700/50">
                  <div className="w-6 h-6 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">{item.title}</h4>
                    <p className="text-[11px] text-stone-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-stone-900 shadow-2xl border border-stone-200">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {lang === 'zh' ? '定制询价已提交！' : lang === 'ms' ? 'Pertanyaan OEM Berjaya Dihantar!' : 'Inquiry Submitted!'}
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  {lang === 'zh'
                    ? '我们的餐饮供应链顾问将在下一个工作日内（工作时间：周一至周五 10:00 AM - 6:00 PM）与您联系，洽谈试样与配方研发事项。'
                    : lang === 'ms'
                    ? 'Pakar rantaian bekalan kami akan menghubungi anda dalam masa 1 hari bekerja (Isnin-Jumaat 10:00 AM - 6:00 PM).'
                    : 'Our supply chain specialist will contact you on the next business day (Operating Hours: Mon-Fri 10:00 AM - 6:00 PM).'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-amber-700 hover:underline"
                >
                  {lang === 'zh' ? '再次提交表单' : lang === 'ms' ? 'Hantar Permohonan Lain' : 'Submit Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg text-stone-900 mb-1 font-serif">
                  {lang === 'zh' ? '提交您的 OEM / 采购需求' : lang === 'ms' ? 'Persetujuan & Permohonan OEM / Borong' : 'Request OEM Consultation'}
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  {lang === 'zh' ? '填写入驻信息，我们将安排专业经理提供产品样品。' : lang === 'ms' ? 'Isi maklumat anda dan pengurus kami akan menyediakan sampel produk.' : 'Fill in the form to request sample packs.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      {lang === 'zh' ? '联系人姓名 *' : lang === 'ms' ? 'Nama Pegawai *' : 'Contact Person *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. En. Tan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      {lang === 'zh' ? 'WhatsApp 电话 *' : lang === 'ms' ? 'No. WhatsApp *' : 'WhatsApp Tel *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 010-882 2608"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    {lang === 'zh' ? '餐厅 / 公司品牌名称' : lang === 'ms' ? 'Nama Syarikat / Restoran' : 'Company / Brand Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Restoran Hotpot"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      {lang === 'zh' ? '感兴趣的类目' : lang === 'ms' ? 'Kategori Produk' : 'Product Category'}
                    </label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs"
                    >
                      <option>{lang === 'zh' ? '预制菜/汤底定制' : lang === 'ms' ? 'Hidangan Siap Saji / Sup Custom' : 'Custom Soup Base / Ready Meals'}</option>
                      <option>{lang === 'zh' ? '串串与烧烤食材' : lang === 'ms' ? 'Bahan Skewer & Barbeku' : 'Skewers & BBQ Ingredients'}</option>
                      <option>{lang === 'zh' ? '清真丸子/点心批发' : lang === 'ms' ? 'Bebola Halal / Dim Sum Borong' : 'Halal Meatballs / Dim Sum Wholesale'}</option>
                      <option>{lang === 'zh' ? '专用甜品酱料/红糖浆' : lang === 'ms' ? 'Sos Pencuci Mulut / Sirap Gula Merah' : 'Dessert Sauces & Syrups'}</option>
                      <option>{lang === 'zh' ? '全套餐饮菜单标准化加盟' : lang === 'ms' ? 'Standardisasi Menu Restoran Penuh' : 'Full Menu Standardization'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      {lang === 'zh' ? '预估月采购量' : lang === 'ms' ? 'Anggaran Pembelian Bulanan' : 'Monthly Volume'}
                    </label>
                    <select
                      value={formData.monthlyVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs"
                    >
                      <option>{lang === 'zh' ? '10 - 50 箱' : lang === 'ms' ? '10 - 50 Kotak' : '10 - 50 Cartons'}</option>
                      <option>{lang === 'zh' ? '50 - 200 箱' : lang === 'ms' ? '50 - 200 Kotak' : '50 - 200 Cartons'}</option>
                      <option>{lang === 'zh' ? '200 箱以上 (大货定制)' : lang === 'ms' ? '> 200 Kotak (Pukal Besar)' : '> 200 Cartons (Bulk Custom)'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    {lang === 'zh' ? '具体需求备注' : lang === 'ms' ? 'Catatan Keperluan Terperinci' : 'Detailed Requirements'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={lang === 'zh' ? '请描述您的目标口感、包装规格要求或特殊试样计划...' : lang === 'ms' ? 'Sila nyatakan rasa sasaran, spesifikasi pembungkusan atau jadual sampel...' : 'Describe target flavor, packaging specs or sampling plan...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'zh' ? '免费申请产品样品与方案' : lang === 'ms' ? 'Minta Sampel Produk & Cadangan' : 'Request Free Sample & Quote'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
