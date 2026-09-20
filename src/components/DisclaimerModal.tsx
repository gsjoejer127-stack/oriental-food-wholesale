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

const LAST_UPDATED = '20 September 2026';

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
  const [activeTab, setActiveTab] = useState<PolicyTab>('terms');

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab ?? 'terms');
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const t = (zh: string, en: string, ms: string) => (lang === 'zh' ? zh : lang === 'ms' ? ms : en);
  const icon = 'w-4 h-4 text-amber-700';

  const tabs: { id: PolicyTab; label: string }[] = [
    { id: 'terms', label: t('条款与细则', 'Terms & Conditions', 'Terma & Syarat') },
    { id: 'returns', label: t('退换货政策', 'Refund & Return Policy', 'Polisi Bayaran Balik & Pemulangan') },
    { id: 'pdpa', label: t('个人资料保护 (PDPA)', 'Privacy / PDPA', 'Privasi / PDPA') },
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

          {/* ───────────── PDPA / PRIVACY ───────────── */}
          {activeTab === 'pdpa' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                    {t(
                      '个人资料保护通知 (PDPA 2010)',
                      'Personal Data Protection Notice (PDPA 2010)',
                      'Notis Perlindungan Data Peribadi (PDPA 2010)',
                    )}
                  </h4>
                  <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                    {t(
                      '本通知依据马来西亚《2010 年个人资料保护法令》（及其修正案）发出。购买时，您需同意将您提供的所有资料分享给我们，供我们进行内部跟进、记录及营销策略之用。',
                      'This notice is issued under Malaysia\'s Personal Data Protection Act 2010 (as amended). When you purchase, you must agree to share all the information you provide with us for our internal follow-up, record-keeping and marketing strategy.',
                      'Notis ini dikeluarkan di bawah Akta Perlindungan Data Peribadi 2010 Malaysia (seperti dipinda). Semasa membuat pembelian, anda mesti bersetuju berkongsi semua maklumat yang anda berikan kepada kami untuk susulan dalaman, simpanan rekod dan strategi pemasaran kami.',
                    )}
                  </p>
                </div>
              </div>

              <Section icon={<FileText className={icon} />} title={t('1. 我们是谁', '1. Who we are', '1. Siapa kami')}>
                <p>
                  {t(
                    '个人资料的使用者：ORIENTAL FOOD WHOLESALE SDN. BHD.（1653595-A），Kuala Lumpur, Malaysia。',
                    'Data user: ORIENTAL FOOD WHOLESALE SDN. BHD. (1653595-A), Kuala Lumpur, Malaysia.',
                    'Pengguna data: ORIENTAL FOOD WHOLESALE SDN. BHD. (1653595-A), Kuala Lumpur, Malaysia.',
                  )}
                </p>
              </Section>

              <Section icon={<FileText className={icon} />} title={t('2. 我们收集哪些资料', '2. Personal data we collect', '2. Data peribadi yang kami kumpul')}>
                <p>
                  {t(
                    '姓名、联系电话 / WhatsApp、电邮、公司名称、送货地址、送货日期、订单内容与备注，以及您所选的付款方式。',
                    'Your name, phone / WhatsApp number, email, company name, delivery address, delivery date, order details and remarks, and the payment method you select.',
                    'Nama, nombor telefon / WhatsApp, e-mel, nama syarikat, alamat penghantaran, tarikh penghantaran, butiran pesanan dan catatan, serta kaedah pembayaran yang anda pilih.',
                  )}
                </p>
                <p>
                  {t(
                    '姓名、电话及送货地址为处理订单所必需；若不提供，我们可能无法处理您的订单。其余项目为选填。',
                    'Name, phone number and delivery address are needed to process your order; without them we may be unable to process it. Other fields are optional.',
                    'Nama, nombor telefon dan alamat penghantaran diperlukan untuk memproses pesanan anda; tanpanya kami mungkin tidak dapat memproses pesanan. Medan lain adalah pilihan.',
                  )}
                </p>
              </Section>

              <Section icon={<Check className="w-4 h-4 text-emerald-600" />} title={t('3. 使用目的（内部跟进、记录、营销策略）', '3. Purposes (internal follow-up, records, marketing strategy)', '3. Tujuan (susulan dalaman, rekod, strategi pemasaran)')}>
                <Bullets
                  items={[
                    t('处理、确认与配送您的订单，开具发票与收款；', 'Processing, confirming and delivering your order, invoicing and collecting payment;', 'Memproses, mengesahkan dan menghantar pesanan anda, mengeluarkan invois dan mengutip bayaran;'),
                    t('下单后的内部跟进：确认收货、售后与品质问题处理、客户服务、意见回访；', 'Internal follow-up after you order: confirming receipt, after-sales and quality claims, customer service and feedback;', 'Susulan dalaman selepas anda membuat pesanan: pengesahan penerimaan, khidmat lepas jualan dan tuntutan kualiti, khidmat pelanggan dan maklum balas;'),
                    t('内部记录：保存客户、订单与购买记录，用于对账、客户管理与日后查询；', 'Internal records: keeping customer, order and purchase records for reconciliation, account management and future reference;', 'Rekod dalaman: menyimpan rekod pelanggan, pesanan dan pembelian untuk penyelarasan, pengurusan akaun dan rujukan masa depan;'),
                    t('营销策略：分析客户与购买情况，用于制定营销方案、复购提醒、新品推荐与优惠活动，并通过 WhatsApp、电话或电邮联系您（您可随时要求停止营销信息）；', 'Marketing strategy: analysing customer and purchase information to plan marketing, repeat-order reminders, new-product recommendations and promotions, and contacting you by WhatsApp, phone or email (you may ask us to stop marketing messages at any time);', 'Strategi pemasaran: menganalisis maklumat pelanggan dan pembelian untuk merancang pemasaran, peringatan pesanan semula, cadangan produk baharu dan promosi, serta menghubungi anda melalui WhatsApp, telefon atau e-mel (anda boleh meminta kami berhenti menghantar mesej pemasaran pada bila-bila masa);'),
                    t('内部记录，以及遵守法律、会计与税务要求。', 'Internal record-keeping and compliance with legal, accounting and tax requirements.', 'Simpanan rekod dalaman dan pematuhan keperluan undang-undang, perakaunan dan cukai.'),
                  ]}
                />
              </Section>

              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('4. 您的同意', '4. Your consent', '4. Persetujuan anda')}>
                <p>
                  {t(
                    '购买时，您须同意将您提供的所有资料（联系方式、送货资料、订单与购买记录、备注等）分享给我们，供我们进行后期的内部跟进、记录及营销策略之用。当您勾选同意框并提交订单或咨询表单，即表示您自愿作出上述同意，并同意我们在您下单后通过 WhatsApp、电话或电邮与您联系。您可随时撤回同意或要求停止营销信息（见第 8 项）。',
                    'When you purchase, you must agree to share all the information you provide (contact details, delivery details, order and purchase history, remarks, etc.) with us for our later internal follow-up, record-keeping and marketing strategy. By ticking the consent box and submitting an order or enquiry form, you voluntarily give this consent and agree that we may contact you by WhatsApp, phone or email after you order. You may withdraw consent or ask us to stop marketing messages at any time (see item 8).',
                    'Semasa membuat pembelian, anda mesti bersetuju berkongsi semua maklumat yang anda berikan (butiran hubungan, butiran penghantaran, sejarah pesanan dan pembelian, catatan, dsb.) dengan kami untuk susulan dalaman, simpanan rekod dan strategi pemasaran kami kemudian. Dengan menanda kotak persetujuan dan menghantar pesanan atau borang pertanyaan, anda dengan sukarela memberi persetujuan ini dan bersetuju kami boleh menghubungi anda melalui WhatsApp, telefon atau e-mel selepas anda membuat pesanan. Anda boleh menarik balik persetujuan atau meminta kami berhenti menghantar mesej pemasaran pada bila-bila masa (lihat perkara 8).',
                  )}
                </p>
              </Section>

              <Section icon={<Truck className={icon} />} title={t('5. 资料披露与跨境传输', '5. Disclosure & transfers', '5. Pendedahan & pemindahan')}>
                <p>
                  {t(
                    '我们不会出售您的个人资料。仅在必要时向以下对象披露：内部相关员工；冷链配送与物流伙伴（仅限姓名、电话、送货地址）；付款服务商与银行；专业顾问与审计师；以及依法要求的主管机构。',
                    'We do not sell your personal data. We disclose it only where necessary to: relevant staff; cold-chain delivery and logistics partners (name, phone and delivery address only); payment providers and banks; professional advisers and auditors; and authorities where required by law.',
                    'Kami tidak menjual data peribadi anda. Kami hanya mendedahkannya apabila perlu kepada: kakitangan berkaitan; rakan penghantaran dan logistik rantaian sejuk (nama, telefon dan alamat penghantaran sahaja); penyedia pembayaran dan bank; penasihat profesional dan juruaudit; serta pihak berkuasa apabila dikehendaki oleh undang-undang.',
                  )}
                </p>
                <p>
                  {t(
                    '我们通过 WhatsApp（Meta）与您沟通，讯息由该服务按其自身政策处理，可能存放在马来西亚境外。本网站托管于 GitHub Pages，托管方可能记录 IP 地址等技术日志。',
                    'We communicate with you through WhatsApp (Meta); messages are handled by that service under its own policies and may be stored outside Malaysia. This website is hosted on GitHub Pages, whose operator may record technical logs such as IP addresses.',
                    'Kami berkomunikasi dengan anda melalui WhatsApp (Meta); mesej dikendalikan oleh perkhidmatan tersebut mengikut polisinya sendiri dan mungkin disimpan di luar Malaysia. Laman web ini dihoskan di GitHub Pages, yang pengendalinya mungkin merekod log teknikal seperti alamat IP.',
                  )}
                </p>
              </Section>

              <Section icon={<Lock className={icon} />} title={t('6. 本网站如何保存资料', '6. How this website stores data', '6. Bagaimana laman web ini menyimpan data')}>
                <p>
                  {t(
                    '购物车与订单记录仅保存在您自己浏览器的本地存储中，不会自动上传到服务器；清除浏览器数据即可删除。资料是在您通过 WhatsApp 发送订单或与我们联系时才会到达我们手中。',
                    'Your cart and order history are kept only in your own browser\'s local storage and are not uploaded to a server automatically; clearing your browser data removes them. Your details reach us only when you send an order through WhatsApp or otherwise contact us.',
                    'Troli dan sejarah pesanan anda hanya disimpan dalam storan setempat pelayar anda sendiri dan tidak dimuat naik ke pelayan secara automatik; membersihkan data pelayar akan memadamkannya. Maklumat anda hanya sampai kepada kami apabila anda menghantar pesanan melalui WhatsApp atau menghubungi kami.',
                  )}
                </p>
              </Section>

              <Section icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />} title={t('7. 安全、保存期限与资料外泄', '7. Security, retention & breaches', '7. Keselamatan, tempoh simpanan & pelanggaran data')}>
                <p>
                  {t(
                    '我们会采取合理措施保护您的资料，并仅在实现上述目的及法律要求所需的期间内保存。如发生须依法通报的资料外泄，我们将依法通知主管机构及受影响的人士。',
                    'We take reasonable steps to protect your data and keep it only as long as needed for the purposes above and as required by law. If a data breach occurs that must be reported by law, we will notify the authority and affected individuals as required.',
                    'Kami mengambil langkah munasabah untuk melindungi data anda dan menyimpannya hanya selama diperlukan untuk tujuan di atas dan seperti yang dikehendaki undang-undang. Jika berlaku pelanggaran data yang mesti dilaporkan mengikut undang-undang, kami akan memaklumkan pihak berkuasa dan individu terjejas seperti yang dikehendaki.',
                  )}
                </p>
              </Section>

              <Section icon={<FileText className={icon} />} title={t('8. 您的权利与联系方式', '8. Your rights & contact', '8. Hak anda & hubungan')}>
                <p>
                  {t(
                    '您有权查阅、更正您的个人资料，撤回同意，或要求我们限制/停止使用（包括停止营销信息）；在适用情况下亦可要求资料可携。撤回同意可能导致我们无法继续处理订单或售后。',
                    'You may ask to access or correct your personal data, withdraw your consent, or ask us to limit or stop using it (including stopping marketing messages); where applicable you may also request data portability. Withdrawing consent may mean we can no longer process your order or after-sales.',
                    'Anda boleh meminta akses atau pembetulan data peribadi anda, menarik balik persetujuan, atau meminta kami mengehadkan atau berhenti menggunakannya (termasuk berhenti menghantar mesej pemasaran); jika berkenaan, anda juga boleh meminta kebolehpindahan data. Menarik balik persetujuan mungkin bermakna kami tidak lagi dapat memproses pesanan atau khidmat lepas jualan anda.',
                  )}
                </p>
                <p className="font-mono text-stone-800">
                  {t('联系我们：', 'Contact: ', 'Hubungi kami: ')}010-882 2608 · orientalfood9319@gmail.com
                </p>
              </Section>

              <p className="text-[11px] text-stone-500">
                {t(
                  `本服务不面向 18 岁以下人士。本通知会不时更新，最后更新：${LAST_UPDATED}。各语言版本如有出入，以英文版为准。`,
                  `Our service is not directed at persons under 18. This notice may be updated from time to time. Last updated: ${LAST_UPDATED}. If the language versions differ, the English version prevails.`,
                  `Perkhidmatan kami tidak ditujukan kepada individu di bawah 18 tahun. Notis ini boleh dikemas kini dari semasa ke semasa. Kemas kini terakhir: ${LAST_UPDATED}. Jika versi bahasa berbeza, versi Inggeris diutamakan.`,
                )}
              </p>
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
