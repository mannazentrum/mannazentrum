/**
 * E-Commerce Analytics Helper for Google Analytics 4 (GA4) / Meta Pixel
 * Tracks view_item, add_to_cart, begin_checkout, and purchase events safely.
 */

import { ShopProduct } from '../data/shopData';
import { CartItem } from '../components/shop/ShopCartDrawer';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackViewItem = (product: ShopProduct) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      currency: 'IDR',
      value: product.priceIdr,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.priceIdr,
          quantity: 1
        }
      ]
    });
  }
};

export const trackAddToCart = (product: ShopProduct, quantity: number = 1) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', {
      currency: 'IDR',
      value: product.priceIdr * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.priceIdr,
          quantity: quantity
        }
      ]
    });
  }
};

export const trackBeginCheckout = (cart: CartItem[], totalAmountIdr: number) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'IDR',
      value: totalAmountIdr,
      items: cart.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.priceIdr,
        quantity: item.quantity
      }))
    });
  }
};

export const trackPurchase = (orderId: string, cart: CartItem[], grandTotalIdr: number, shippingIdr: number) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: grandTotalIdr,
      currency: 'IDR',
      shipping: shippingIdr,
      items: cart.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.priceIdr,
        quantity: item.quantity
      }))
    });
  }
};
