import { Order } from '../types';

// Google Apps Script web app that logs every order to a Sheet and emails the
// owner immediately. This is independent of WhatsApp - it fires the moment
// the customer submits, with no extra tap needed from the customer, so an
// order is never silently lost even if WhatsApp never opens or the customer
// never taps Send.
const ORDER_NOTIFY_URL =
  'https://script.google.com/macros/s/AKfycbwK8uAEhVbcZAl4bkPunQJWnYTWTqIhqaBkvQBhXY2zupuQkJhL-mSy88BsDywfdFY/exec';

export const notifyOrder = (order: Order): void => {
  try {
    fetch(ORDER_NOTIFY_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(order),
    }).catch(() => {
      // Silently ignore - this is a best-effort side channel alongside
      // WhatsApp, and must never block or break the checkout flow.
    });
  } catch (e) {
    // Same reasoning - never let this break checkout.
  }
};
