import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Building2, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Upload,
  Sparkles
} from 'lucide-react';
import { CartItem, CheckoutFormData, DeliveryZone, Language, Order, PaymentMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  defaultZone: DeliveryZone;
  lang: Language;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  defaultZone,
  lang,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'info' | 'payment' | 'verifying'>('info');
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    address: '',
    city: 'Kuala Lumpur',
    postcode: '58200',
    state: 'Kuala Lumpur',
    deliveryZone: defaultZone,
    deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    notes: '',
    paymentMethod: 'fpx',
  });

  const [selectedBank, setSelectedBank] = useState<string>('maybank');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [receiptFile, setReceiptFile] = useState<string | null>(null);
  const [tngTimer, setTngTimer] = useState<number>(300); // 5 mins

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.pricePerUnit * item.quantity,
    0
  );

  const freeThreshold =
    formData.deliveryZone === 'klang_valley' ? 500 : formData.deliveryZone === 'outstation' ? 800 : 0;
  const standardFee =
    formData.deliveryZone === 'klang_valley' ? 40 : formData.deliveryZone === 'outstation' ? 40 : 0;
  const isFreeDelivery = formData.deliveryZone === 'self_pickup' || subtotal >= freeThreshold;
  const deliveryFee = isFreeDelivery ? 0 : standardFee;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (field: keyof CheckoutFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert(lang === 'zh' ? '请填写姓名、电话和送货地址' : 'Please fill in name, phone, and delivery address.');
      return;
    }
    setStep('payment');
  };

  const handleSimulatePayment = () => {
    setStep('verifying');
    setTimeout(() => {
      const orderId = `OS-${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 8)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toLocaleString(),
        items: cartItems,
        customer: formData,
        subtotal,
        deliveryFee,
        discount: 0,
        total: grandTotal,
        paymentStatus: 'paid',
      };
      onOrderComplete(newOrder);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs font-bold font-mono bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                {lang === 'zh' ? '安全结算' : lang === 'ms' ? 'PEMBAYARAN SELAMAT' : 'SECURE CHECKOUT'}
              </span>
              <span className="text-stone-400 text-xs">
                {step === 'info' ? 'Step 1/2' : 'Step 2/2'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {lang === 'zh' ? '东升食品 · 订单结算与支付' : lang === 'ms' ? 'Oriental Food · Semakan & Pembayaran' : 'Order Checkout & Payment'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {step === 'info' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Delivery Zone Toggle */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <label className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-2">
                  {lang === 'zh' ? '1. 选择配送物流区域' : lang === 'ms' ? '1. Pilih Kawasan Penghantaran' : '1. Delivery Zone'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryZone', 'klang_valley')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      formData.deliveryZone === 'klang_valley'
                        ? 'border-amber-600 bg-white shadow-sm font-bold text-amber-950'
                        : 'border-amber-200 bg-amber-50/50 text-stone-600'
                    }`}
                  >
                    <div className="font-bold text-stone-900">巴生谷 Klang Valley</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'zh' ? '满 RM500 免费冷链配送' : lang === 'ms' ? 'Penghantaran percuma > RM500' : 'Free delivery over RM500'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryZone', 'outstation')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      formData.deliveryZone === 'outstation'
                        ? 'border-amber-600 bg-white shadow-sm font-bold text-amber-950'
                        : 'border-amber-200 bg-amber-50/50 text-stone-600'
                    }`}
                  >
                    <div className="font-bold text-stone-900">外坡 Outstation</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'zh' ? '满 RM800 免费冷链配送' : lang === 'ms' ? 'Penghantaran percuma > RM800' : 'Free delivery over RM800'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryZone', 'self_pickup')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      formData.deliveryZone === 'self_pickup'
                        ? 'border-amber-600 bg-white shadow-sm font-bold text-amber-950'
                        : 'border-amber-200 bg-amber-50/50 text-stone-600'
                    }`}
                  >
                    <div className="font-bold text-stone-900">自取 Self Pickup</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">Kuchai Entrepreneurs Park</div>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'zh' ? '2. 客户及联系方式' : lang === 'ms' ? '2. Maklumat Pelanggan & Hubungan' : '2. Contact Information'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">
                      {lang === 'zh' ? '收件人姓名 *' : lang === 'ms' ? 'Nama Penerima *' : 'Contact Person Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. En. Tan / Mr. Tan"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">
                      {lang === 'zh' ? 'WhatsApp 电话号码 *' : lang === 'ms' ? 'No. Telefon WhatsApp *' : 'WhatsApp Tel *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 012-345 6789"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">
                      {lang === 'zh' ? '电子邮箱 (选填)' : lang === 'ms' ? 'E-mel (Pilihan)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. info@restaurant.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">
                      {lang === 'zh' ? '餐厅/公司名称 (批发发票)' : lang === 'ms' ? 'Nama Syarikat/Restoran' : 'Business/Restaurant Name'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Restoran Hotpot"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'zh' ? '3. 冷链送货地址' : lang === 'ms' ? '3. Alamat Penghantaran Sejuk' : '3. Delivery Address'}</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-stone-600 mb-1 block">
                      {lang === 'zh' ? '详细送货地址 *' : lang === 'ms' ? 'Alamat Terperinci *' : 'Detailed Address *'}
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. No. 12, Jalan Kuchai Maju 8, Kuchai Entrepreneurs Park..."
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        {lang === 'zh' ? '城市 City' : lang === 'ms' ? 'Bandar' : 'City'}
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        {lang === 'zh' ? '邮编 Postcode' : lang === 'ms' ? 'Poskod' : 'Postcode'}
                      </label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        {lang === 'zh' ? '期望送货日期' : lang === 'ms' ? 'Tarikh Dihajati' : 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-stone-500">
                  <div>
                    {lang === 'zh' ? '应付总额:' : lang === 'ms' ? 'Jumlah Keseluruhan:' : 'Total:'}{' '}
                    <span className="font-mono font-bold text-amber-700 text-base ml-1">
                      RM {grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    * {lang === 'zh' ? '提交订单即代表同意本公司 Terma & Syarat 冷链配送与批发采购条款' : lang === 'ms' ? 'Menghantar pesanan bermaksud anda bersetuju dengan Terma & Syarat Pembekalan Borong' : 'By submitting order, you agree to our Cold-Chain Delivery & Wholesale Terms'}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-6 bg-stone-900 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>{lang === 'zh' ? '下一步: 选择支付方式' : lang === 'ms' ? 'Seterusnya: Pilih Kaedah Bayaran' : 'Next: Select Payment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Method Selection */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center justify-between">
                  <span>{lang === 'zh' ? '选择支付集成方式' : lang === 'ms' ? 'Pilih Kaedah Pembayaran' : 'Select Payment Integration'}</span>
                  <button
                    onClick={() => setStep('info')}
                    className="text-xs text-amber-700 hover:underline"
                  >
                    {lang === 'zh' ? '返回修改地址' : lang === 'ms' ? 'Kembali Edit Maklumat' : 'Edit Info'}
                  </button>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'fpx')}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'fpx'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-amber-700 mb-1" />
                    <span className="text-xs">FPX 网银 / Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'tng')}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'tng'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-sky-600 mb-1" />
                    <span className="text-xs">Touch 'n Go</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'card')}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-purple-600 mb-1" />
                    <span className="text-xs">{lang === 'zh' ? '信用卡/Debit' : 'Kad Kredit/Debit'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'bank_transfer')}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'bank_transfer'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-xs">{lang === 'zh' ? '对公银行转账' : lang === 'ms' ? 'Pindahan Bank Syarikat' : 'Bank Transfer'}</span>
                  </button>
                </div>

                {/* Sub-Panel: FPX Online Banking */}
                {formData.paymentMethod === 'fpx' && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                    <p className="text-xs font-semibold text-stone-700">
                      {lang === 'zh' ? '选择您的 FPX 网上银行:' : 'Select your FPX Bank:'}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'maybank', name: 'Maybank2u' },
                        { id: 'cimb', name: 'CIMB Clicks' },
                        { id: 'pbe', name: 'Public Bank' },
                        { id: 'rhb', name: 'RHB Now' },
                        { id: 'hlb', name: 'Hong Leong Bank' },
                        { id: 'bank_islam', name: 'Bank Islam' },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                            selectedBank === bank.id
                              ? 'border-amber-600 bg-white text-amber-900 shadow-sm'
                              : 'border-stone-200 bg-white/70 text-stone-700 hover:bg-white'
                          }`}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Touch 'n Go eWallet */}
                {formData.paymentMethod === 'tng' && (
                  <div className="bg-sky-50/80 p-5 rounded-2xl border border-sky-200 text-center space-y-3">
                    <span className="bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Touch 'n Go eWallet Instant Pay
                    </span>
                    <div className="w-36 h-36 mx-auto bg-white p-2 rounded-2xl shadow-md border border-sky-200 flex flex-col items-center justify-center relative">
                      <QrCode className="w-28 h-28 text-sky-900" />
                      <div className="absolute inset-0 bg-sky-900/5 backdrop-blur-[1px] rounded-2xl flex items-center justify-center" />
                    </div>
                    <p className="text-xs text-sky-950 font-mono font-bold">
                      RM {grandTotal.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-sky-800">
                      {lang === 'zh' ? '请使用 Touch \'n Go App 扫描上方二维码进行支付' : 'Scan QR code with your Touch \'n Go eWallet app.'}
                    </p>
                  </div>
                )}

                {/* Sub-Panel: Credit / Debit Card */}
                {formData.paymentMethod === 'card' && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        卡号 Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8888"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-stone-600 mb-1 block">
                          有效期 Exp
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-600 mb-1 block">
                          CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Direct Bank Transfer */}
                {formData.paymentMethod === 'bank_transfer' && (
                  <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
                    <div className="font-bold text-sm text-emerald-900">
                      公司对公银行账户 (Maybank Account)
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono space-y-1">
                      <div><span className="text-stone-500">公司:</span> ORIENTAL FOOD WHOLESALE SDN BHD</div>
                      <div><span className="text-stone-500">银行:</span> Maybank Berhad</div>
                      <div><span className="text-stone-500">账号:</span> 5140 1234 8888</div>
                      <div><span className="text-stone-500">转账金额:</span> <span className="font-bold text-emerald-700">RM {grandTotal.toFixed(2)}</span></div>
                    </div>
                    <p className="text-[11px] text-emerald-800 italic">
                      * 转账后系统将自动为您生成电子发票，您也可以将水单上传或发送至客服 WhatsApp 010-882 2608 (工作时间: 周一至周五 10:00 AM - 6:00 PM)。
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary Box */}
              <div className="bg-stone-100 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'zh' ? `食材小计 (${cartItems.length} 款)` : lang === 'ms' ? `Jumlah Kecil Bahan (${cartItems.length} jenis)` : `Subtotal (${cartItems.length} items)`}</span>
                  <span className="font-mono">RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'zh' ? '冷链物流配送费' : lang === 'ms' ? 'Caj Penghantaran Rantaian Sejuk' : 'Cold-Chain Delivery Fee'}</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (lang === 'zh' ? 'RM 0.00 (包邮)' : lang === 'ms' ? 'RM 0.00 (Percuma)' : 'RM 0.00 (Free)') : `RM ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>{lang === 'zh' ? '实付总金额' : lang === 'ms' ? 'Jumlah Bayaran' : 'Total Amount'}</span>
                  <span className="font-mono text-lg text-amber-700">RM {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-amber-700 hover:from-emerald-700 hover:to-amber-800 text-white font-bold rounded-2xl text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {lang === 'zh'
                    ? `确认支付 RM ${grandTotal.toFixed(2)} 并提交订单`
                    : `Confirm Payment & Order (RM ${grandTotal.toFixed(2)})`}
                </span>
              </button>
            </div>
          )}

          {/* Verifying Animation overlay */}
          {step === 'verifying' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-amber-600 border-t-transparent animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-stone-900">
                {lang === 'zh' ? '正在处理集成支付通道...' : 'Processing Payment Gateway...'}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === 'zh' ? '正在向银行/支付平台发起授权并校验信息' : 'Authorizing order details securely...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
