import React from 'react';
import { History, X, RotateCcw, FileText, Calendar, ShoppingBag, CheckCircle2, Download } from 'lucide-react';
import { Language, Order } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onReorder: (order: Order) => void;
  onViewReceipt: (order: Order) => void;
  lang: Language;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onViewReceipt,
  lang,
}) => {
  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    if (orders.length === 0) return;

    const headers = [
      'Order ID / 订单号',
      'Date / 下单时间',
      'Customer Name / 客户姓名',
      'Company / 公司店名',
      'Phone / 电话',
      'Address / 送货地址',
      'Item Code / 商品编号',
      'Item Name (ZH) / 中文品名',
      'Item Name (EN) / 英文品名',
      'Pack Specification / 规格包装',
      'Quantity / 数量',
      'Unit Price (RM) / 单价',
      'Line Subtotal (RM) / 小计',
      'Delivery Fee (RM) / 运费',
      'Order Total (RM) / 订单总额',
      'Payment Status / 支付状态',
      'Payment Method / 支付方式'
    ];

    const escapeCSV = (str: string | number | undefined | null) => {
      if (str === null || str === undefined) return '""';
      const val = String(str).replace(/"/g, '""');
      return `"${val}"`;
    };

    const rows: string[] = [];
    rows.push(headers.map(h => escapeCSV(h)).join(','));

    orders.forEach(order => {
      order.items.forEach(item => {
        const packLabel = item.packOption === 'carton' 
          ? `${item.product.pricing.cartonLabel} (箱/Carton)` 
          : `${item.product.pricing.unitLabel} (包/Unit)`;

        const row = [
          order.id,
          order.createdAt,
          order.customer.fullName,
          order.customer.companyName || '',
          order.customer.phone,
          `${order.customer.address}, ${order.customer.city} ${order.customer.postcode}`.trim(),
          item.product.code,
          item.product.nameZh,
          item.product.nameEn,
          packLabel,
          item.quantity,
          item.pricePerUnit.toFixed(2),
          (item.pricePerUnit * item.quantity).toFixed(2),
          order.deliveryFee.toFixed(2),
          order.total.toFixed(2),
          order.paymentStatus.toUpperCase(),
          order.customer.paymentMethod.toUpperCase(),
        ];
        rows.push(row.map(escapeCSV).join(','));
      });
    });

    const csvContent = '\uFEFF' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Oriental_Food_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col p-6 sm:p-8 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-bold shrink-0">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                {lang === 'zh' ? '历史采购订单' : lang === 'ms' ? 'Sejarah Pesanan Borong' : 'Order History'}
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                {lang === 'zh' ? `已记录 ${orders.length} 笔历史 B2B 订单` : lang === 'ms' ? `${orders.length} pesanan borong tersimpan` : `${orders.length} past B2B orders saved`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                onClick={handleDownloadCSV}
                className="py-2 px-3 sm:px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                title={lang === 'zh' ? '下载 CSV 财务对账单' : 'Download CSV for accounting'}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">
                  {lang === 'zh' ? '导出 CSV 账单' : lang === 'ms' ? 'Eksport CSV' : 'Export CSV'}
                </span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Orders List Container */}
        <div className="py-5 space-y-4 overflow-y-auto max-h-[65vh] pr-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-stone-700">
                {lang === 'zh' ? '暂无历史采购订单' : lang === 'ms' ? 'Tiada Sejarah Pesanan Lagi' : 'No Order History Yet'}
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                {lang === 'zh' 
                  ? '您在此设备上完成订购后，订单将自动保存在这里。您可随时一键【再来一单】快速补货！' 
                  : lang === 'ms'
                  ? 'Pesanan yang telah dibuat akan disimpan di sini untuk pesanan semula pantas 1-klik!'
                  : 'Once you complete an order, it will appear here so you can easily reorder with 1-click!'}
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              const totalItemsCount = ord.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <div 
                  key={ord.id}
                  className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs hover:border-amber-400 transition-all"
                >
                  {/* Order Top Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200">
                        #{ord.id}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {ord.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {lang === 'zh' ? '已支付' : lang === 'ms' ? 'Dibayar' : 'Paid'}
                      </span>
                    </div>
                  </div>

                  {/* Customer / Store Summary */}
                  <div className="py-2.5 text-xs text-stone-600 flex flex-wrap justify-between gap-2">
                    <div>
                      <span className="font-bold text-stone-900">{ord.customer.fullName}</span>
                      {ord.customer.companyName && (
                        <span className="text-stone-500 ml-1 font-medium">({ord.customer.companyName})</span>
                      )}
                    </div>
                    <div className="text-stone-500">
                      {lang === 'zh' ? '送货至:' : lang === 'ms' ? 'Hantar ke:' : 'To:'} <span className="font-medium text-stone-800">{ord.customer.city || ord.customer.address}</span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="bg-white rounded-xl p-3 border border-stone-200 space-y-2 text-xs">
                    <div className="flex justify-between text-[11px] font-semibold text-stone-500 pb-1 border-b border-stone-100">
                      <span>{lang === 'zh' ? `订购食材 (${totalItemsCount} 件)` : lang === 'ms' ? `Bahan Dipesan (${totalItemsCount} unit)` : `Items (${totalItemsCount})`}</span>
                      <span>{lang === 'zh' ? '小计 (RM)' : lang === 'ms' ? 'Jumlah Kecil (RM)' : 'Subtotal (RM)'}</span>
                    </div>
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-stone-800">
                        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap pr-2">
                          <span className="font-mono text-[10px] font-bold bg-stone-900 text-amber-400 px-1.5 py-0.5 rounded shrink-0">
                            {item.product.code}
                          </span>
                          <span className="font-medium truncate">
                            {lang === 'zh' ? item.product.nameZh : lang === 'ms' ? (item.product.nameMs || item.product.nameEn) : item.product.nameEn}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono shrink-0">
                            ({item.packOption === 'carton' ? item.product.pricing.cartonLabel : item.product.pricing.unitLabel}) x{item.quantity}
                          </span>
                        </div>
                        <span className="font-mono font-bold shrink-0 text-stone-900">
                          {(item.pricePerUnit * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Actions */}
                  <div className="pt-3 mt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-stone-500">{lang === 'zh' ? '订单总额:' : lang === 'ms' ? 'Jumlah Pesanan:' : 'Total Amount:'}</span>
                      <span className="font-mono font-extrabold text-amber-700 text-base ml-1">
                        RM {ord.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => onViewReceipt(ord)}
                        className="py-2 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{lang === 'zh' ? '发票/收据' : lang === 'ms' ? 'Resit / Invois' : 'Receipt'}</span>
                      </button>

                      <button
                        onClick={() => onReorder(ord)}
                        className="py-2 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{lang === 'zh' ? '一键再来一单' : lang === 'ms' ? 'Pesan Semula Semula' : 'Reorder All Items'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
          {orders.length > 0 ? (
            <button
              onClick={handleDownloadCSV}
              className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'zh' ? '导出历史订单 CSV (财务对账)' : lang === 'ms' ? 'Muat Turun CSV (Akaun)' : 'Export Orders CSV (Accounting)'}</span>
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors shrink-0"
          >
            {lang === 'zh' ? '关闭' : lang === 'ms' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
