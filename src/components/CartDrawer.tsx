import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, ArrowRight, ShieldCheck, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { CartItem, DeliveryZone, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, packOption: 'unit' | 'carton', delta: number) => void;
  onRemoveItem: (productId: number, packOption: 'unit' | 'carton') => void;
  onClearCart: () => void;
  onProceedToCheckout: (deliveryZone: DeliveryZone) => void;
  onOpenOrderHistory?: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onOpenOrderHistory,
  lang,
}) => {
  if (!isOpen) return null;

  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('klang_valley');

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.pricePerUnit * item.quantity,
    0
  );

  // Free shipping threshold calculation
  const freeThreshold =
    deliveryZone === 'klang_valley' ? 500 : deliveryZone === 'outstation' ? 800 : 0;
  const standardFee =
    deliveryZone === 'klang_valley' ? 40 : deliveryZone === 'outstation' ? 40 : 0;

  const isFreeDelivery = deliveryZone === 'self_pickup' || subtotal >= freeThreshold;
  const deliveryFee = isFreeDelivery ? 0 : standardFee;
  const totalAmount = subtotal + deliveryFee;

  const amountToFree = Math.max(0, freeThreshold - subtotal);
  const progressPercent = freeThreshold > 0 ? Math.min(100, (subtotal / freeThreshold) * 100) : 100;

  // Generate pre-filled WhatsApp link with cart items
  const generateWhatsAppLink = () => {
    const itemsList = cartItems
      .map(
        (i) =>
          `• ${i.product.code} ${lang === 'zh' ? i.product.nameZh : i.product.nameEn} (${
            i.packOption === 'carton' ? i.product.pricing.cartonLabel : i.product.pricing.unitLabel
          }) x${i.quantity} = RM ${(i.pricePerUnit * i.quantity).toFixed(2)}`
      )
      .join('%0A');

    const zoneText =
      deliveryZone === 'klang_valley'
        ? (lang === 'zh' ? '巴生谷 Klang Valley' : lang === 'ms' ? 'Lembah Klang' : 'Klang Valley')
        : deliveryZone === 'outstation'
        ? (lang === 'zh' ? '外坡 Outstation' : lang === 'ms' ? 'Luar Kawasan' : 'Outstation')
        : (lang === 'zh' ? '自取 Self Pickup' : lang === 'ms' ? 'Ambil Sendiri' : 'Self Pickup');

    const header = lang === 'zh' ? '*东升食品 - B2B 购物车快速订购询价*' : lang === 'ms' ? '*Oriental Food - Pertanyaan Pesanan Troli B2B*' : '*Oriental Food - B2B Cart Order Inquiry*';
    const itemsHeader = lang === 'zh' ? '*订购食材清单:*' : lang === 'ms' ? '*Senarai Bahan Pesanan:*' : '*Items List:*';
    const zoneHeader = lang === 'zh' ? '*配送模式:*' : lang === 'ms' ? '*Mod Penghantaran:*' : '*Delivery Zone:*';
    const subtotalHeader = lang === 'zh' ? '*食材小计:*' : lang === 'ms' ? '*Jumlah Kecil:*' : '*Subtotal:*';
    const feeHeader = lang === 'zh' ? '*冷链运费:*' : lang === 'ms' ? '*Caj Penghantaran:*' : '*Delivery Fee:*';
    const totalHeader = lang === 'zh' ? '*预估总额:*' : lang === 'ms' ? '*Anggaran Jumlah:*' : '*Estimated Total:*';
    const footerMsg = lang === 'zh' ? '*请问是否有现货与安排送货时间？谢谢！*' : lang === 'ms' ? '*Sila sahkan stok dan jadual penghantaran. Terima kasih!*' : '*Please confirm stock availability and delivery schedule. Thank you!*';

    const text = `${header}%0A%0A${itemsHeader}%0A${itemsList}%0A%0A${zoneHeader} ${zoneText}%0A${subtotalHeader} RM ${subtotal.toFixed(2)}%0A${feeHeader} RM ${deliveryFee.toFixed(2)}%0A${totalHeader} RM ${totalAmount.toFixed(2)}%0A%0A${footerMsg}`;

    return `https://wa.me/60108822608?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-4 bg-stone-900 text-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">
                  {lang === 'zh' ? '批发展示购物车' : lang === 'ms' ? 'Troli Pembekalan Borong' : 'Wholesale Cart'}
                </h2>
                <p className="text-[10px] text-stone-400 font-mono">
                  {cartItems.length} {lang === 'zh' ? '种食材款式' : lang === 'ms' ? 'jenis bahan' : 'Items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Zone Selector & Free Shipping Progress Bar */}
          <div className="bg-amber-50/80 p-3.5 border-b border-amber-200">
            <div className="text-xs font-semibold text-amber-950 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                {lang === 'zh' ? '选择配送区域' : lang === 'ms' ? 'Pilih Kawasan Penghantaran' : 'Select Delivery Zone'}:
              </span>
              <div className="flex bg-amber-100 p-0.5 rounded-lg text-[11px]">
                <button
                  onClick={() => setDeliveryZone('klang_valley')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                    deliveryZone === 'klang_valley' ? 'bg-amber-700 text-white font-bold shadow-xs' : 'text-amber-900'
                  }`}
                >
                  {lang === 'zh' ? '巴生谷 (RM500包邮)' : lang === 'ms' ? 'Lembah Klang' : 'Klang Valley'}
                </button>
                <button
                  onClick={() => setDeliveryZone('outstation')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                    deliveryZone === 'outstation' ? 'bg-amber-700 text-white font-bold shadow-xs' : 'text-amber-900'
                  }`}
                >
                  {lang === 'zh' ? '外坡 (RM800包邮)' : lang === 'ms' ? 'Luar Kawasan' : 'Outstation'}
                </button>
                <button
                  onClick={() => setDeliveryZone('self_pickup')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                    deliveryZone === 'self_pickup' ? 'bg-amber-700 text-white font-bold shadow-xs' : 'text-amber-900'
                  }`}
                >
                  {lang === 'zh' ? '自取' : lang === 'ms' ? 'Ambil Sendiri' : 'Pickup'}
                </button>
              </div>
            </div>

            {deliveryZone !== 'self_pickup' && (
              <div className="mt-2">
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  {isFreeDelivery ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {lang === 'zh' ? '恭喜！您已获得冷链包邮配送' : lang === 'ms' ? 'Tahniah! Penghantaran percuma diaktifkan!' : 'Congrats! Free Cold-Chain Delivery unlocked!'}
                    </span>
                  ) : (
                    <span className="text-amber-900">
                      {lang === 'zh' ? `还差 RM ${amountToFree.toFixed(2)} 即可享受免运费` : lang === 'ms' ? `Tambah RM ${amountToFree.toFixed(2)} lagi untuk penghantaran percuma` : `Add RM ${amountToFree.toFixed(2)} for Free Shipping`}
                    </span>
                  )}
                  <span className="font-mono text-amber-800 font-bold">
                    RM {subtotal.toFixed(0)} / RM {freeThreshold}
                  </span>
                </div>
                <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="py-14 text-center text-stone-400 px-4">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                <p className="text-sm font-bold text-stone-700">
                  {lang === 'zh' ? '购物车空空如也' : lang === 'ms' ? 'Troli anda kosong' : 'Your cart is empty'}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {lang === 'zh' ? '挑选优质标准化冷冻食材或一键复购上一次的订单！' : lang === 'ms' ? 'Pilih bahan makanan berkualiti atau pesan semula pesanan terdahulu!' : 'Select products or reorder from your past orders!'}
                </p>

                {onOpenOrderHistory && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOrderHistory();
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl text-xs border border-amber-200 transition-colors shadow-2xs"
                  >
                    <span>{lang === 'zh' ? '从历史订单【一键再来一单】' : lang === 'ms' ? 'Pesan Semula dari Sejarah Pesanan' : 'Reorder from Order History'}</span>
                  </button>
                )}
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={`${item.product.id}-${item.packOption}-${idx}`} className="pt-3 first:pt-0 flex gap-3">
                  <div className="w-12 h-12 bg-stone-900 text-amber-400 rounded-xl font-mono text-[11px] font-black flex items-center justify-center shrink-0 border border-stone-800 shadow-xs">
                    {item.product.code}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {lang === 'zh' ? item.product.nameZh : lang === 'ms' ? (item.product.nameMs || item.product.nameEn) : item.product.nameEn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.packOption)}
                          className="text-stone-400 hover:text-red-600 p-0.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.2 rounded font-mono">
                          {item.packOption === 'carton'
                            ? item.product.pricing.cartonLabel
                            : item.product.pricing.unitLabel}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          RM {item.pricePerUnit.toFixed(2)} / {item.packOption === 'carton' ? '箱' : '包'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.packOption, -1)}
                          className="w-6 h-6 text-stone-600 hover:bg-stone-200 font-bold text-xs flex items-center justify-center rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.packOption, 1)}
                          className="w-6 h-6 text-stone-600 hover:bg-stone-200 font-bold text-xs flex items-center justify-center rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold font-mono text-sm text-stone-900">
                        RM {(item.pricePerUnit * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'zh' ? '食材小计 (Subtotal)' : lang === 'ms' ? 'Jumlah Kecil' : 'Subtotal'}:</span>
                  <span className="font-mono font-bold text-stone-900">RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{lang === 'zh' ? '冷链运费 (Delivery Fee)' : lang === 'ms' ? 'Caj Penghantaran' : 'Delivery Fee'}:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {deliveryFee === 0 ? (
                      <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">
                        {lang === 'zh' ? 'FREE 免运费' : lang === 'ms' ? 'PERCUMA' : 'FREE'}
                      </span>
                    ) : (
                      `RM ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>{lang === 'zh' ? '合计预估 (Total)' : lang === 'ms' ? 'Jumlah Keseluruhan' : 'Total'}:</span>
                  <span className="font-mono text-lg text-amber-700">RM {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  {lang === 'zh'
                    ? 'WhatsApp 一键快速报单 (010-882 2608)'
                    : lang === 'ms'
                    ? 'Pesanan Pantas WhatsApp (010-882 2608)'
                    : 'Quick Order via WhatsApp'}
                </span>
              </a>

              <button
                onClick={() => onProceedToCheckout(deliveryZone)}
                className="w-full py-3 bg-stone-900 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>{lang === 'zh' ? '在线填写资料去结算' : lang === 'ms' ? 'Pembayaran & Maklumat Pesanan' : 'Online Checkout & Payment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-[11px] text-stone-400 hover:text-red-600"
              >
                {lang === 'zh' ? '清空购物车' : lang === 'ms' ? 'Kosongkan Troli' : 'Clear Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
