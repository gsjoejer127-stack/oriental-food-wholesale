import React from 'react';
import { CheckCircle2, Printer, MessageSquare, Download, ShoppingBag, MapPin, Phone, User, Calendar, ShieldCheck, RotateCcw } from 'lucide-react';
import { Language, Order } from '../types';

interface OrderReceiptModalProps {
  order: Order | null;
  onClose: () => void;
  onReorder?: (order: Order) => void;
  lang: Language;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  onClose,
  onReorder,
  lang,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  // Generate WhatsApp message link pre-filled with order details
  const generateWhatsAppLink = () => {
    const itemsList = order.items
      .map(
        (i) =>
          `• ${i.product.code} ${i.product.nameZh} (${i.packOption === 'carton' ? i.product.pricing.cartonLabel : i.product.pricing.unitLabel}) x${i.quantity} = RM ${(i.pricePerUnit * i.quantity).toFixed(2)}`
      )
      .join('%0A');

    const text = `*东升食品 - 批发新订单订单号: ${order.id}*%0A%0A*客户资料:*%0A姓名: ${order.customer.fullName}%0A电话: ${order.customer.phone}%0A公司/餐厅: ${order.customer.companyName || '个人/无'}%0A配送地址: ${order.customer.address}, ${order.customer.city}%0A配送日期: ${order.customer.deliveryDate}%0A%0A*订购食材清单:*%0A${itemsList}%0A%0A*食材小计:* RM ${order.subtotal.toFixed(2)}%0A*冷链运费:* RM ${order.deliveryFee.toFixed(2)}%0A*订单总额:* RM ${order.total.toFixed(2)}%0A*支付状态:* 已完成支付 (${order.customer.paymentMethod.toUpperCase()})`;

    return `https://wa.me/60108822608?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon Header */}
        <div className="text-center pb-6 border-b border-stone-200">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
            {lang === 'zh' ? '订单支付成功 · 批发展示发票' : lang === 'ms' ? 'PESANAN DIBAYAR · INVOIS JUALAN' : 'ORDER PAID · SALES INVOICE'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-2 font-serif">
            {lang === 'zh' ? '感谢您的惠顾！订单已接单' : lang === 'ms' ? 'Terima Kasih! Pesanan Diterima' : 'Thank You For Your Business!'}
          </h2>
          <div className="mt-2">
            <span className="text-[11px] text-amber-800 bg-amber-50 rounded-lg py-1 px-3 inline-block font-mono border border-amber-200">
              ⏱ {lang === 'zh' ? '客服与发货工作时间: 周一至周五 10:00 AM - 6:00 PM' : lang === 'ms' ? 'Waktu Khidmat Pelanggan: Isnin-Jumaat 10:00 AM - 6:00 PM' : 'Customer Service & Shipping Hours: Mon-Fri 10:00 AM - 6:00 PM'}
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            {lang === 'zh' ? '官方订单编号:' : lang === 'ms' ? 'No. Pesanan:' : 'Order ID:'} <span className="font-bold text-stone-900">{order.id}</span>
          </p>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="py-6 space-y-6 text-xs text-stone-700">
          {/* Supplier Info */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-900 text-sm font-serif">
                东升食品 ORIENTAL FOOD WHOLESALE SDN BHD
              </h3>
              <p className="text-stone-500 mt-1">
                Kuala Lumpur, Malaysia
              </p>
              <p className="text-stone-500">Tel: 010-882 2608 | Email: orientalfood9319@gmail.com</p>
            </div>
            <div className="text-left sm:text-right font-mono text-stone-500">
              <div><span className="text-stone-400">{lang === 'zh' ? '日期:' : lang === 'ms' ? 'Tarikh:' : 'Date:'}</span> {order.createdAt}</div>
              <div><span className="text-stone-400">{lang === 'zh' ? '付款方式:' : lang === 'ms' ? 'Pembayaran:' : 'Payment:'}</span> {order.customer.paymentMethod.toUpperCase()}</div>
              <div><span className="text-stone-400">{lang === 'zh' ? '配送模式:' : lang === 'ms' ? 'Penghantaran:' : 'Delivery:'}</span> {order.customer.deliveryZone}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50/50 p-4 rounded-2xl border border-stone-200">
            <div>
              <span className="font-bold text-stone-900 block mb-1">
                {lang === 'zh' ? '收货人资料' : lang === 'ms' ? 'Maklumat Pelanggan' : 'Customer Info'}
              </span>
              <p><span className="text-stone-500">{lang === 'zh' ? '姓名:' : lang === 'ms' ? 'Nama:' : 'Name:'}</span> {order.customer.fullName}</p>
              <p><span className="text-stone-500">{lang === 'zh' ? '电话:' : lang === 'ms' ? 'Tel:' : 'Phone:'}</span> {order.customer.phone}</p>
              <p><span className="text-stone-500">{lang === 'zh' ? '餐厅公司:' : lang === 'ms' ? 'Syarikat:' : 'Company:'}</span> {order.customer.companyName || '-'}</p>
            </div>
            <div>
              <span className="font-bold text-stone-900 block mb-1">
                {lang === 'zh' ? '冷链送货地址' : lang === 'ms' ? 'Alamat Penghantaran' : 'Delivery Address'}
              </span>
              <p>{order.customer.address}, {order.customer.city}, {order.customer.postcode}</p>
              <p className="text-amber-800 font-semibold mt-1">
                {lang === 'zh' ? '期望送货日期:' : lang === 'ms' ? 'Tarikh Penghantaran:' : 'Preferred Date:'} {order.customer.deliveryDate}
              </p>
            </div>
          </div>

          {/* Item Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                  <th className="p-3">{lang === 'zh' ? '编号 / 商品' : lang === 'ms' ? 'Kod / Bahan' : 'Code / Item'}</th>
                  <th className="p-3">{lang === 'zh' ? '规格单位' : lang === 'ms' ? 'Pembungkusan' : 'Packaging'}</th>
                  <th className="p-3 text-center">{lang === 'zh' ? '数量' : lang === 'ms' ? 'Kuantiti' : 'Qty'}</th>
                  <th className="p-3 text-right">{lang === 'zh' ? '单价' : lang === 'ms' ? 'Harga Unit' : 'Price'}</th>
                  <th className="p-3 text-right">{lang === 'zh' ? '小计' : lang === 'ms' ? 'Jumlah' : 'Subtotal'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td className="p-3 font-medium">
                      <span className="font-mono text-[10px] text-amber-700 font-bold mr-1">
                        {item.product.code}
                      </span>
                      {lang === 'zh' ? item.product.nameZh : lang === 'ms' ? (item.product.nameMs || item.product.nameEn) : item.product.nameEn}
                    </td>
                    <td className="p-3 font-mono text-stone-500">
                      {item.packOption === 'carton' ? item.product.pricing.cartonLabel : item.product.pricing.unitLabel}
                    </td>
                    <td className="p-3 text-center font-bold font-mono">{item.quantity}</td>
                    <td className="p-3 text-right font-mono">RM {item.pricePerUnit.toFixed(2)}</td>
                    <td className="p-3 text-right font-bold font-mono">
                      RM {(item.pricePerUnit * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Total */}
          <div className="p-4 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-xs text-stone-300">
              {lang === 'zh' ? '运费状态:' : lang === 'ms' ? 'Status Penghantaran:' : 'Shipping Status:'}{' '}
              <span className="text-emerald-400 font-bold">
                {order.deliveryFee === 0 
                  ? (lang === 'zh' ? '满额免费冷链包邮' : lang === 'ms' ? 'Penghantaran Percuma' : 'Free Shipping') 
                  : `RM ${order.deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-stone-400 text-xs mr-2">{lang === 'zh' ? '订单总计 Grand Total:' : lang === 'ms' ? 'Jumlah Keseluruhan:' : 'Grand Total:'}</span>
              <span className="text-xl font-bold font-mono text-amber-400">
                RM {order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-2 justify-end">
          {onReorder && (
            <button
              onClick={() => onReorder(order)}
              className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'zh' ? '一键再来一单' : lang === 'ms' ? 'Pesan Semula Semula' : 'Reorder All Items'}</span>
            </button>
          )}

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'zh' ? '发送订单至 WhatsApp 客服' : lang === 'ms' ? 'Hantar ke WhatsApp' : 'Send to WhatsApp'}</span>
          </a>

          <button
            onClick={handlePrint}
            className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'zh' ? '打印发票' : lang === 'ms' ? 'Cetak Invois' : 'Print Invoice'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors"
          >
            {lang === 'zh' ? '完成 & 继续购物' : lang === 'ms' ? 'Selesai & Teruskan' : 'Done & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};
