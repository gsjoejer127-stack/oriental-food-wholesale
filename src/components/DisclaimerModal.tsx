import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  X,
  FileText,
  Check,
  AlertTriangle,
  Snowflake,
  CreditCard,
  Truck,
  RefreshCw,
  Lock,
  ShieldCheck,
} from 'lucide-react';

import { Language } from '../types';

export type PolicyTab = 'terms' | 'returns' | 'pdpa';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTab?: PolicyTab;
  onOpenHalalStatement?: () => void;
}

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({
  icon,
  title,
  children,
}) => (
  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
    <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2 font-serif">
      {icon}
      <span>{title}</span>
    </h3>
    <div className="space-y-1.5 text-xs text-stone-600 leading-relaxed">{children}</div>
  </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-1">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>('returns');

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab ?? 'returns');
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const t = (zh: string, en: string, ms: string) => (lang === 'zh' ? zh : lang === 'ms' ? ms : en);
  const icon = 'w-4 h-4 text-amber-700';

  const tabs: { id: PolicyTab; label: string }[] = [
    { id: 'returns', label: t('1. 退换货政策', '1. Refund and Return Policy', '1. Polisi Bayaran Balik & Pemulangan') },
    { id: 'terms', label: t('2. 条款与细则', '2. Terms and Conditions Policy', '2. Terma & Syarat') },
    { id: 'pdpa', label: t('3. 个人资料保护 (PDPA)', '3. PDPA', '3. PDPA') },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
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
                {t('东升食品 · 政策与条款', 'Oriental Food · Policies & Terms', 'Oriental Food · Polisi & Terma')}
              </h2>
              <p className="text-xs text-stone-500 font-mono">ORIENTAL FOOD WHOLESALE SDN. BHD. ( 1653595-A )</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 pb-2 border-b border-stone-100 text-xs font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="py-5 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed overflow-y-auto max-h-[60vh] pr-1">
          {/* ───────────── TERMS & CONDITIONS ───────────── */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fadeIn">
              <Section icon={<FileText className={icon} />} title={t('1. 适用范围与订购', '1. Scope & Orders', '1. Skop & Pesanan')}>
                <p>
                  {t(
                    '本条款适用于通过本网站、官方 WhatsApp 或销售代表向东升食品（ORIENTAL FOOD WHOLESALE SDN. BHD.）提交的所有采购订单。下单即表示您已阅读并同意本条款、退换货政策及个人资料保护通知（PDPA）。',
                    'These Terms apply to all purchase orders submitted to ORIENTAL FOOD WHOLESALE SDN. BHD. through this website, our official WhatsApp or our sales representatives. By placing an order you confirm that you have read and agree to these Terms, the Refund & Return Policy and the Personal Data Protection Notice (PDPA).',
                    'Terma ini terpakai bagi semua pesanan pembelian kepada ORIENTAL FOOD WHOLESALE SDN. BHD. melalui laman web ini, WhatsApp rasmi atau wakil jualan kami. Dengan membuat pesanan, anda mengesahkan bahawa anda telah membaca dan bersetuju dengan Terma ini, Polisi Bayaran Balik & Pemulangan serta Notis Perlindungan Data Peribadi (PDPA).',
                  )}
                </p>
                <p>
                  {t(
                    '订单须经我方销售团队确认或开具发票后方为有效。',
                    'An order is binding only after it has been confirmed by our sales team or an invoice has been issued.',
                    'Sesuatu pesanan hanya sah selepas disahkan oleh pasukan jualan kami atau invois dikeluarkan.',
                  )}
                </p>
              </Section>

              <Section icon={<CreditCard className={icon} />} title={t('2. 价格与付款', '2. Pricing & Payment', '2. Harga & Pembayaran')}>
                <Bullets
                  items={[
                    t(
                      '所有价格以马币 (RM) 计价；整箱订购可享箱装优惠。',
                      'All prices are in Malaysian Ringgit (RM); case discounts apply to whole-carton orders.',
                      'Semua harga dalam Ringgit Malaysia (RM); diskaun kotak terpakai untuk pesanan sekotak penuh.',
                    ),
                    t(
                      '价格可能因原料及市场成本变动而调整，一切以正式发票 (Sales Invoice) 为准。',
                      'Prices may change with raw-material and market costs; the final Sales Invoice governs.',
                      'Harga boleh berubah mengikut kos bahan mentah dan pasaran; Invois Jualan akhir adalah muktamad.',
                    ),
                    t(
                      '付款方式以结账页面提供或销售团队确认的为准。除非另有书面月结协议，须全额付款后方安排发货。',
                      'Payment methods are those offered at checkout or confirmed by our sales team. Full payment is required before dispatch unless a credit arrangement has been agreed in writing.',
                      'Kaedah pembayaran ialah yang ditawarkan semasa checkout atau disahkan oleh pasukan jualan kami. Bayaran penuh diperlukan sebelum penghantaran melainkan pengaturan kredit dipersetujui secara bertulis.',
                    ),
                  ]}
                />
              </Section>

              <Section icon={<Truck className={icon} />} title={t('3. 冷链配送', '3. Cold-chain Delivery', '3. Penghantaran Rantaian Sejuk')}>
                <Bullets
                  items={[
                    t(
                      '巴生谷满 RM 500 免运费，外坡满 RM 800 免运费；未达额度收取 RM 40 标准冷链运费。',
                      'Free delivery for Klang Valley orders from RM 500 and outstation orders from RM 800; otherwise a standard cold-chain fee of RM 40 applies.',
                      'Penghantaran percuma untuk Lembah Klang bagi pesanan RM 500 ke atas dan luar kawasan RM 800 ke atas; jika tidak, caj rantaian sejuk standard RM 40 dikenakan.',
                    ),
                    t(
                      '冷冻货物全程以 -18°C 冷藏车运送。买方须确保送货时段有人接收，并在收货后 15 分钟内存入 -18°C 冷冻柜。',
                      'Frozen goods travel in -18°C refrigerated vehicles. The buyer must ensure someone is present to receive the goods and must place them in a -18°C freezer within 15 minutes of receipt.',
                      'Barangan beku dihantar dalam kenderaan berpendingin -18°C. Pembeli mesti memastikan ada orang menerima barangan dan menyimpannya dalam peti sejuk beku -18°C dalam masa 15 minit selepas diterima.',
                    ),
                    t(
                      '若因无人接收、联系不上或地址有误导致配送失败，二次配送可能另行收费；因此造成的解冻或变质由买方承担。',
                      'If delivery fails because no one is available, the buyer cannot be reached or the address is wrong, re-delivery may be charged separately, and any thawing or spoilage that results is borne by the buyer.',
                      'Jika penghantaran gagal kerana tiada penerima, pembeli tidak dapat dihubungi atau alamat salah, penghantaran semula mungkin dikenakan caj berasingan dan sebarang pencairan atau kerosakan ditanggung oleh pembeli.',
                    ),
                  ]}
                />
              </Section>

              <Section icon={<AlertTriangle className={icon} />} title={t('4. 网站免责声明', '4. Website Disclaimer', '4. Penafian Laman Web')}>
                <Bullets
                  items={[
                    t(
                      '本网站内容由 AI 辅助生成，可能存在错误或遗漏，仅供参考。',
                      'Content on this website is AI-assisted and may contain errors or omissions; it is for reference only.',
                      'Kandungan laman web ini dijana dengan bantuan AI dan mungkin mengandungi kesilapan atau kekurangan; ia untuk rujukan sahaja.',
                    ),
                    t(
                      '产品规格、图片及单价仅供参考，一切以发票及实际到货为准；库存以销售团队确认为准。',
                      'Product specifications, images and unit prices are indicative only. The invoice and the goods actually delivered prevail, and stock availability is subject to confirmation by our sales team.',
                      'Spesifikasi, imej dan harga seunit produk adalah untuk rujukan sahaja. Invois dan barangan yang sebenarnya dihantar adalah muktamad, dan ketersediaan stok tertakluk kepada pengesahan pasukan jualan kami.',
                    ),
                    t(
                      '如网站内容与销售团队的书面确认不一致，以销售团队的书面确认为准。',
                      'If the website differs from written confirmation from our sales team, the written confirmation prevails.',
                      'Jika kandungan laman web berbeza daripada pengesahan bertulis pasukan jualan kami, pengesahan bertulis tersebut diutamakan.',
                    ),
                  ]}
                />
              </Section>

              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('5. 清真 (HALAL) 标志', '5. Halal Marking', '5. Penandaan Halal')}>
                <p>
                  {t(
                    '带有 “HALAL” 标志的产品均由 JAKIM 或认可机构认证。未标注 HALAL 标志者属传统中式食材，清真餐馆请勿直接使用。',
                    'Products marked "HALAL" are certified by JAKIM or a recognised body. Products without the HALAL mark are traditional Chinese ingredients and must not be used directly by Halal outlets.',
                    'Produk bertanda "HALAL" disahkan oleh JAKIM atau badan yang diiktiraf. Produk tanpa tanda HALAL ialah bahan tradisional Cina dan tidak boleh digunakan terus oleh premis Halal.',
                  )}
                </p>
              </Section>

              <Section icon={<Lock className={icon} />} title={t('6. OEM 定制配方保密', '6. OEM Confidentiality', '6. Kerahsiaan OEM')}>
                <p>
                  {t(
                    '为客户研制的独家汤底与酱料受保密协议 (NDA) 保护，未经授权不得转让或泄露给第三方。',
                    'Custom soup bases and sauces developed for a client are protected by non-disclosure agreements (NDAs) and must not be transferred or disclosed to third parties without authorisation.',
                    'Sup asas dan sos khas yang dibangunkan untuk pelanggan dilindungi oleh perjanjian kerahsiaan (NDA) dan tidak boleh dipindahkan atau didedahkan kepada pihak ketiga tanpa kebenaran.',
                  )}
                </p>
              </Section>

              <Section icon={<FileText className={icon} />} title={t('7. 责任限制', '7. Limitation of Liability', '7. Had Liabiliti')}>
                <p>
                  {t(
                    '在法律允许的范围内，我方不对任何间接或后果性损失负责；我方责任（如有）以受影响货物的发票金额为限。收货后因存放或烹饪不当造成的变质，我方不承担责任。',
                    'To the extent permitted by law, we are not liable for indirect or consequential loss, and our liability (if any) is limited to the invoice value of the affected goods. We are not responsible for spoilage after delivery caused by improper storage or cooking.',
                    'Setakat yang dibenarkan undang-undang, kami tidak bertanggungjawab atas kerugian tidak langsung atau berbangkit, dan liabiliti kami (jika ada) terhad kepada nilai invois barangan yang terjejas. Kami tidak bertanggungjawab atas kerosakan selepas penghantaran akibat penyimpanan atau masakan yang tidak betul.',
                  )}
                </p>
              </Section>

              <div className="bg-stone-900 text-stone-300 p-4 rounded-2xl border border-stone-800 text-xs space-y-1">
                <p className="font-bold text-amber-400">{t('8. 适用法律与修订', '8. Governing Law & Changes', '8. Undang-undang & Pindaan')}</p>
                <p>
                  {t(
                    '本条款适用马来西亚法律。东升食品保留随时修订本条款的权利，最新版本公布于本网站后即时生效。各语言版本如有出入，以英文版为准。',
                    'These Terms are governed by the laws of Malaysia. We may amend them at any time; the latest version takes effect once published on this website. If the language versions differ, the English version prevails.',
                    'Terma ini ditadbir oleh undang-undang Malaysia. Kami boleh meminda terma ini pada bila-bila masa; versi terkini berkuat kuasa sebaik sahaja diterbitkan di laman web ini. Jika versi bahasa berbeza, versi Inggeris diutamakan.',
                  )}
                </p>
              </div>
            </div>
          )}

          {/* ───────────── REFUND & RETURN ───────────── */}
          {activeTab === 'returns' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-500/10 border border-amber-500/40 p-3.5 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                    {t(
                      '【重要】冷冻食品属敏感货物，一般不接受退换货',
                      'IMPORTANT: Frozen food is a sensitive product — returns and exchanges are generally not accepted',
                      'PENTING: Makanan beku ialah barangan sensitif — pemulangan dan pertukaran pada amnya tidak diterima',
                    )}
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    {t(
                      '如收到的货物有问题，请在收货后 3 小时内向我们上报，我们将为您安排退货或退款。',
                      'If you receive goods with a problem, please report it to us within 3 hours of receiving them and we will arrange a return or refund for you.',
                      'Jika anda menerima barangan yang bermasalah, sila laporkan kepada kami dalam masa 3 jam selepas menerimanya dan kami akan mengaturkan pemulangan atau bayaran balik.',
                    )}
                  </p>
                </div>
              </div>

              <Section icon={<Snowflake className="w-4 h-4 text-sky-600" />} title={t('1. 为什么不支持退换货', '1. Why returns are generally not accepted', '1. Mengapa pemulangan pada amnya tidak diterima')}>
                <p>
                  {t(
                    '冷冻食品对温度极其敏感。货物送达后，我们无法确认其存放温度，为保障食品安全，已送达的货物不能回收再售，因此一般不接受退货、换货或退款。',
                    'Frozen food is highly temperature-sensitive. Once delivered we cannot verify how it has been stored, and for food-safety reasons delivered goods cannot be taken back for resale. Returns, exchanges and refunds are therefore generally not accepted.',
                    'Makanan beku sangat sensitif terhadap suhu. Setelah dihantar, kami tidak dapat mengesahkan bagaimana ia disimpan, dan atas sebab keselamatan makanan, barangan yang telah dihantar tidak boleh diambil semula untuk dijual. Oleh itu, pemulangan, pertukaran dan bayaran balik pada amnya tidak diterima.',
                  )}
                </p>
              </Section>

              <Section icon={<RefreshCw className={icon} />} title={t('2. 收到有问题的货物怎么办（3 小时内）', '2. If you receive a problem (within 3 hours)', '2. Jika anda menerima barangan bermasalah (dalam 3 jam)')}>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    {t(
                      '收货时当场验货，货物请继续保持冷冻 (-18°C)，请勿丢弃产品或外包装。',
                      'Inspect the goods on receipt and keep them frozen (-18°C). Do not throw away the products or their packaging.',
                      'Periksa barangan semasa diterima dan simpan dalam keadaan beku (-18°C). Jangan buang produk atau bungkusannya.',
                    )}
                  </li>
                  <li>
                    {t(
                      '在收货后 3 小时内，通过 WhatsApp 010-882 2608 联系我们，并提供订单/发票编号，以及清晰的照片或视频（外箱、标签/批次、问题部位）。',
                      'Within 3 hours of receipt, contact us on WhatsApp 010-882 2608 with your order/invoice number and clear photos or a video (outer carton, label/batch, the problem).',
                      'Dalam masa 3 jam selepas menerima, hubungi kami melalui WhatsApp 010-882 2608 dengan nombor pesanan/invois serta gambar atau video yang jelas (kotak luar, label/batch, masalah yang berlaku).',
                    )}
                  </li>
                  <li>
                    {t(
                      '我们核实后，将为您安排退货或退款。核实期间我们可能要求您补充资料，或保留货物以供检查。',
                      'After we verify the report we will arrange a return or refund for you. During verification we may ask for more information or ask you to keep the goods for inspection.',
                      'Selepas kami mengesahkan laporan, kami akan mengaturkan pemulangan atau bayaran balik untuk anda. Semasa pengesahan, kami mungkin meminta maklumat tambahan atau meminta anda menyimpan barangan untuk diperiksa.',
                    )}
                  </li>
                </ol>
                <p className="text-[11px] text-stone-500">
                  {t(
                    '3 小时以您收到货物的时间起算；WhatsApp 讯息以发送时间为准。客服时间为周一至周五 10:00 AM - 6:00 PM，非客服时间发送的讯息将于下一个工作日处理，但仍以发送时间计算是否在 3 小时内。',
                    'The 3 hours run from the time you receive the goods, and the WhatsApp message timestamp is used. Support hours are Mon–Fri 10:00 AM – 6:00 PM; messages sent outside these hours are handled on the next working day but are still counted by their sent time.',
                    '3 jam dikira dari masa anda menerima barangan, dan cap masa mesej WhatsApp digunakan. Waktu sokongan ialah Isnin–Jumaat 10:00 AM – 6:00 PM; mesej yang dihantar di luar waktu ini diurus pada hari bekerja berikutnya tetapi masih dikira mengikut masa dihantar.',
                  )}
                </p>
              </Section>

              <Section icon={<Check className="w-4 h-4 text-emerald-600" />} title={t('3. 可受理的情形', '3. What we can accept', '3. Perkara yang boleh kami terima')}>
                <Bullets
                  items={[
                    t('外箱严重破损、压塌，或真空包装漏气；', 'Severely damaged or crushed cartons, or leaking/unsealed vacuum packaging;', 'Kotak yang rosak teruk atau remuk, atau bungkusan vakum bocor/tidak tertutup;'),
                    t('收到的货品或数量与发票/订单不符；', 'Items or quantities that do not match the invoice/order;', 'Barangan atau kuantiti yang tidak sepadan dengan invois/pesanan;'),
                    t('开封前发现非人为造成的品质异常（如到货已解冻、异物、变质异味）。', 'Quality problems found before opening that were not caused by handling (e.g. arrived thawed, foreign matter, spoilage odour).', 'Masalah kualiti yang ditemui sebelum dibuka dan bukan disebabkan pengendalian (cth. tiba dalam keadaan cair, bahan asing, bau busuk).'),
                  ]}
                />
              </Section>

              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <span className="font-bold block">{t('4. 不予受理的情形', '4. What we cannot accept', '4. Perkara yang tidak dapat kami terima')}</span>
                <Bullets
                  items={[
                    t('超过收货后 3 小时才上报；', 'Reported more than 3 hours after receipt;', 'Dilaporkan lebih 3 jam selepas diterima;'),
                    t('改变主意、订错产品或数量、口味偏好；', 'Change of mind, ordering the wrong item or quantity, or taste preference;', 'Berubah fikiran, tersalah pesan barangan atau kuantiti, atau citarasa peribadi;'),
                    t('无人接收或收货后未及时存入 -18°C 冷冻柜，导致解冻或变质；', 'No one available to receive, or goods not stored at -18°C promptly, resulting in thawing or spoilage;', 'Tiada orang menerima, atau barangan tidak disimpan pada -18°C dengan segera sehingga mencair atau rosak;'),
                    t('已开封、已烹饪或已部分使用（有问题的证据除外），或未按标准方式解冻/烹饪；', 'Opened, cooked or partly used goods (unless evidence of the problem is provided), or goods thawed/cooked in a non-standard way;', 'Barangan yang telah dibuka, dimasak atau digunakan sebahagian (kecuali bukti masalah diberikan), atau dicairkan/dimasak dengan cara tidak standard;'),
                    t('OEM / 定制生产订单；缺少照片或视频证据。', 'OEM / made-to-order goods; or reports without photo or video evidence.', 'Barangan OEM / tempahan khas; atau laporan tanpa bukti gambar atau video.'),
                  ]}
                />
              </div>
            </div>
          )}

          {/* ───────────── PDPA ───────────── */}
          {activeTab === 'pdpa' && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-stone-600">
                {t(
                  '本声明依据马来西亚《2010 年个人资料保护法令》（PDPA）发出。资料使用者：ORIENTAL FOOD WHOLESALE SDN. BHD.（1653595-A）。',
                  "This notice is issued under Malaysia's Personal Data Protection Act 2010 (PDPA). Data user: ORIENTAL FOOD WHOLESALE SDN. BHD. (1653595-A).",
                  'Notis ini dikeluarkan di bawah Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia. Pengguna data: ORIENTAL FOOD WHOLESALE SDN. BHD. (1653595-A).',
                )}
              </p>
              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('1. 同意', '1. Consent', '1. Persetujuan')}>
                <p>
                  {t(
                    '当您通过本网站、WhatsApp、电话、电邮或其他渠道询价、索取样品或下单时，即表示您已阅读本声明，并同意本公司为下述目的收集、使用及披露您的个人资料，包括后续跟进联系及产品推广。',
                    'By making an enquiry, requesting a sample or placing an order through this website, WhatsApp, telephone, email or any other channel, you confirm that you have read this notice and consent to the Company collecting, using and disclosing your personal data for the purposes below, including follow-up contact and product marketing.',
                    'Dengan membuat pertanyaan, meminta sampel atau membuat pesanan melalui laman web ini, WhatsApp, telefon, e-mel atau mana-mana saluran lain, anda mengesahkan bahawa anda telah membaca notis ini dan bersetuju Syarikat mengumpul, menggunakan dan mendedahkan data peribadi anda bagi tujuan di bawah, termasuk hubungan susulan dan pemasaran produk.',
                  )}
                </p>
              </Section>
              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('2. 我们收集的资料', '2. Data we collect', '2. Data yang kami kumpul')}>
                <p>
                  {t(
                    '姓名、公司名称、联络电话 / WhatsApp、电邮、送货与账单地址、订单与付款记录，以及与本公司的往来讯息。',
                    'Name, company name, phone / WhatsApp number, email, delivery and billing address, order and payment records, and your correspondence with the Company.',
                    'Nama, nama syarikat, nombor telefon / WhatsApp, e-mel, alamat penghantaran dan bil, rekod pesanan dan pembayaran, serta surat-menyurat anda dengan Syarikat.',
                  )}
                </p>
              </Section>
              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('3. 使用目的', '3. Purposes', '3. Tujuan')}>
                <p>
                  {t(
                    '处理询价与订单、安排配送、开立发票与收款、售后处理、后续跟进联系、内部记录，以及发送新品、价目表与促销信息。',
                    'Handling enquiries and orders, arranging delivery, invoicing and collection, after-sales, follow-up contact, internal records, and sending you information on new products, price lists and promotions.',
                    'Mengendalikan pertanyaan dan pesanan, mengatur penghantaran, mengeluarkan invois dan kutipan, perkhidmatan selepas jualan, hubungan susulan, rekod dalaman, serta menghantar maklumat produk baharu, senarai harga dan promosi kepada anda.',
                  )}
                </p>
              </Section>
              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('4. 资料披露与跨境传输', '4. Disclosure and transfers outside Malaysia', '4. Pendedahan dan pemindahan di luar Malaysia')}>
                <p>
                  {t(
                    '本公司可能将您的资料披露给冷链与物流服务商、银行与支付服务商、WhatsApp / Meta 及 Google 等通讯平台、会计师与法律顾问，以及依法有权要求的机关。因使用 WhatsApp 等服务，资料可能存放在马来西亚境外，您提交资料即表示同意。',
                    'The Company may disclose your data to cold-chain and logistics providers, banks and payment providers, communication platforms such as WhatsApp / Meta and Google, accountants and legal advisers, and authorities entitled to require it by law. Because we use services such as WhatsApp, your data may be stored outside Malaysia; by submitting your data you consent to this.',
                    'Syarikat boleh mendedahkan data anda kepada penyedia rantaian sejuk dan logistik, bank dan penyedia pembayaran, platform komunikasi seperti WhatsApp / Meta dan Google, akauntan dan penasihat undang-undang, serta pihak berkuasa yang berhak memintanya di sisi undang-undang. Oleh kerana kami menggunakan perkhidmatan seperti WhatsApp, data anda mungkin disimpan di luar Malaysia; dengan menghantar data anda, anda bersetuju dengan perkara ini.',
                  )}
                </p>
              </Section>
              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('5. 保存期限', '5. Retention', '5. Tempoh simpanan')}>
                <p>
                  {t(
                    '在业务及法律所需的期间内保存。',
                    'Kept for as long as needed for business purposes and as required by law.',
                    'Disimpan selama diperlukan untuk tujuan perniagaan dan seperti yang dikehendaki undang-undang.',
                  )}
                </p>
              </Section>
              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('6. 您的权利与停止推广', '6. Your rights and stopping marketing', '6. Hak anda dan berhenti pemasaran')}>
                <p>
                  {t(
                    '您可要求查阅或更正您的个人资料，也可随时通过 WhatsApp 010-882 2608 或电邮 orientalfood9319@gmail.com 要求停止将您的资料用于推广。停止推广不影响订单履行、售后服务及法定记录保存。',
                    'You may ask to access or correct your personal data, and at any time ask us to stop using it for marketing via WhatsApp 010-882 2608 or orientalfood9319@gmail.com. Stopping marketing does not affect order fulfilment, after-sales service or statutory record keeping.',
                    'Anda boleh meminta akses atau pembetulan data peribadi anda, dan pada bila-bila masa meminta kami berhenti menggunakannya untuk pemasaran melalui WhatsApp 010-882 2608 atau orientalfood9319@gmail.com. Berhenti pemasaran tidak menjejaskan pemenuhan pesanan, perkhidmatan selepas jualan atau penyimpanan rekod berkanun.',
                  )}
                </p>
              </Section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-500">
            {t(
              '咨询电话: 010-882 2608 (工作时间: 周一至周五 10:00 AM - 6:00 PM)',
              'Support: 010-882 2608 (Mon-Fri 10:00 AM - 6:00 PM)',
              'Talian Pertanyaan: 010-882 2608 (Isnin-Jumaat 10:00 AM - 6:00 PM)',
            )}
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t('我已阅读', 'I Have Read This', 'Saya Telah Membaca')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
