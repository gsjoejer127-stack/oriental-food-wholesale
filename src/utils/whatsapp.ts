import { Order } from '../types';

const SALES_WHATSAPP_NUMBER = '60108822608';

// Builds the pre-filled wa.me link for a confirmed order, shared by the
// auto-send-on-submit flow and the manual "Send to WhatsApp" button on the receipt.
export const buildOrderWhatsAppLink = (order: Order): string => {
  const itemsList = order.items
    .map(
      (i) =>
        `• ${i.product.code} ${i.product.nameZh} (${i.packOption === 'carton' ? i.product.pricing.cartonLabel : i.product.pricing.unitLabel}) x${i.quantity} = RM ${(i.pricePerUnit * i.quantity).toFixed(2)}`
    )
    .join('%0A');

  const text = `*东升食品 - 批发新订单订单号: ${order.id}*%0A%0A*客户资料:*%0A姓名: ${order.customer.fullName}%0A电话: ${order.customer.phone}%0A公司/餐厅: ${order.customer.companyName || '个人/无'}%0A配送地址: ${order.customer.address}, ${order.customer.city}%0A配送日期: ${order.customer.deliveryDate}%0A%0A*订购食材清单:*%0A${itemsList}%0A%0A*食材小计:* RM ${order.subtotal.toFixed(2)}%0A*冷链运费:* RM ${order.deliveryFee.toFixed(2)}%0A*订单总额:* RM ${order.total.toFixed(2)}%0A*支付状态:* ${order.paymentStatus === 'paid' ? '已完成支付' : '待确认付款 (尚未收款)'} - 拟用方式: ${order.customer.paymentMethod.toUpperCase()}`;

  return `https://wa.me/${SALES_WHATSAPP_NUMBER}?text=${text}`;
};
