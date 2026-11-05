import React, { ReactNode } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShopHeader } from './ShopHeader';
import { ShopFooter } from './ShopFooter';
import { ShopCartDrawer } from './ShopCartDrawer';
import { ShopProductModal } from './ShopProductModal';
import { ShopCheckoutModal } from './ShopCheckoutModal';
import { ShopShippingInfoModal } from './ShopShippingInfoModal';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../utils/shopCurrency';

interface ShopLayoutProps {
  children: ReactNode;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const ShopLayout: React.FC<ShopLayoutProps> = ({
  children,
  activeCategory = 'semua',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
}) => {
  const {
    cart,
    totalCartCount,
    currency,
    setCurrency,
    language,
    setLanguage,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    directCheckout,
    cartDrawerOpen,
    setCartDrawerOpen,
    checkoutModalOpen,
    setCheckoutModalOpen,
    shippingInfoModalOpen,
    setShippingInfoModalOpen,
    selectedProduct,
    setSelectedProduct,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    toastMessage,
  } = useShop();

  const handleCategoryNav = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      window.location.href = cat === 'semua' ? '/' : `/category/${cat}`;
    }
  };

  const handleSearchNav = (query: string) => {
    if (onSearchChange) {
      onSearchChange(query);
    } else {
      window.location.href = `/?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900 flex flex-col justify-between">
      
      {/* Top Store Header */}
      <ShopHeader
        currentCategory={activeCategory}
        onSelectCategory={handleCategoryNav}
        searchQuery={searchQuery}
        onSearchChange={handleSearchNav}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        currency={currency}
        onChangeCurrency={setCurrency}
        language={language}
        onChangeLanguage={setLanguage}
        onOpenShippingInfo={() => setShippingInfoModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Floating Action Pill for Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-3 bg-slate-900 hover:bg-amber-600 text-white px-5 py-3.5 rounded-full shadow-2xl border border-slate-700 transition-transform active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div className="text-left pr-2">
              <span className="text-[10px] text-slate-300 block uppercase font-bold tracking-wider leading-none">
                {language === 'id' ? 'Keranjang Belanja' : 'Your Cart'}
              </span>
              <span className="font-bold text-xs text-amber-300">
                {formatPrice(
                  cart.reduce((sum, item) => sum + (item.product.priceIdr * item.quantity), 0),
                  currency
                )}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-5 py-3 rounded-full shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Modals & Drawers */}
      <ShopProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        language={language}
        onAddToCart={addToCart}
        onDirectCheckout={directCheckout}
      />

      <ShopCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
        currency={currency}
        language={language}
        couponCode={couponCode}
        onApplyCoupon={applyCoupon}
        onRemoveCoupon={removeCoupon}
        discountPercent={discountPercent}
      />

      <ShopCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cart={cart}
        currency={currency}
        language={language}
        discountPercent={discountPercent}
        couponCode={couponCode}
        onOrderSuccess={() => {
          clearCart();
        }}
      />

      <ShopShippingInfoModal
        isOpen={shippingInfoModalOpen}
        onClose={() => setShippingInfoModalOpen(false)}
        currency={currency}
        language={language}
      />

      {/* Dedicated Store Footer */}
      <ShopFooter
        language={language}
        onOpenShippingInfo={() => setShippingInfoModalOpen(true)}
        onSelectCategory={handleCategoryNav}
      />

    </div>
  );
};
