import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  MessageCircle, 
  Building, 
  QrCode, 
  ArrowRight, 
  Copy, 
  Check 
} from 'lucide-react';
import { CartItem } from './ShopCartDrawer';
import { CurrencyKey, SHIPPING_DESTINATIONS } from '../../data/shopData';
import { formatPrice } from '../../utils/shopCurrency';
import { trackPurchase } from '../../utils/shopAnalytics';

interface ShopCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: CurrencyKey;
  language: 'id' | 'en';
  discountPercent: number;
  couponCode: string;
  onOrderSuccess: () => void;
}

export const ShopCheckoutModal: React.FC<ShopCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  language,
  discountPercent,
  couponCode,
  onOrderSuccess,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('ID');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPostal, setCustomerPostal] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'va' | 'qris' | 'card' | 'wa'>('qris');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<{
    orderId: string;
    totalAmountIdr: number;
    shippingCostIdr: number;
  } | null>(null);
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  if (!isOpen) return null;

  const selectedCountry = SHIPPING_DESTINATIONS.find(d => d.code === selectedCountryCode) || SHIPPING_DESTINATIONS[0];

  const subtotalIdr = cart.reduce((sum, item) => sum + (item.product.priceIdr * item.quantity), 0);
  const discountAmountIdr = (subtotalIdr * discountPercent) / 100;
  const totalWeightGrams = cart.reduce((sum, item) => sum + (item.product.weightGrams * item.quantity), 0);
  
  // Calculate dynamic shipping based on weight in kg
  const weightKg = Math.max(1, Math.ceil(totalWeightGrams / 1000));
  const shippingCostIdr = selectedCountry.baseRateIdr + (Math.max(0, weightKg - 1) * selectedCountry.perKgRateIdr);
  const grandTotalIdr = Math.max(0, subtotalIdr - discountAmountIdr) + shippingCostIdr;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(language === 'id' ? 'Mohon lengkapi Nama, No. WhatsApp, dan Alamat Pengiriman.' : 'Please fill in Name, WhatsApp, and Delivery Address.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `MNZ-${Math.floor(100000 + Math.random() * 900000)}`;

    // Build WhatsApp message text
    const itemListText = cart.map(item => `- ${item.product.name} (${item.quantity}x) = Rp ${(item.product.priceIdr * item.quantity).toLocaleString('id-ID')}`).join('%0A');
    
    const waMessage = 
      `*PESANAN BARU SHOP.MANNAZENTRUM.COM*%0A` +
      `*No. Pesanan:* ${generatedOrderId}%0A` +
      `*Nama:* ${encodeURIComponent(customerName)}%0A` +
      `*No. HP/WA:* ${encodeURIComponent(customerPhone)}%0A` +
      `*Negara Tujuan:* ${encodeURIComponent(selectedCountry.nameId)}%0A` +
      `*Alamat:* ${encodeURIComponent(customerAddress)}, ${encodeURIComponent(customerCity)} (${encodeURIComponent(customerPostal)})%0A` +
      `*Catatan:* ${encodeURIComponent(orderNotes || '-')}%0A%0A` +
      `*RINCIAN PRODUK:*%0A${itemListText}%0A%0A` +
      `*Subtotal:* Rp ${subtotalIdr.toLocaleString('id-ID')}%0A` +
      (discountPercent > 0 ? `*Diskon (${couponCode}):* -Rp ${discountAmountIdr.toLocaleString('id-ID')}%0A` : '') +
      `*Ongkos Kirim (${weightKg} kg):* Rp ${shippingCostIdr.toLocaleString('id-ID')}%0A` +
      `*TOTAL PEMBAYARAN:* Rp ${grandTotalIdr.toLocaleString('id-ID')}%0A` +
      `*Metode Pembayaran:* ${paymentMethod.toUpperCase()}%0A%0A` +
      `Mohon info instruksi pembayaran / konfirmasi stok. Terima kasih!`;

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderCompleted({
        orderId: generatedOrderId,
        totalAmountIdr: grandTotalIdr,
        shippingCostIdr: shippingCostIdr,
      });

      // Save order for Admin & Employee CMS module
      try {
        const existingOrders = JSON.parse(localStorage.getItem('manna_shop_admin_orders_v1') || '[]');
        const newRecord = {
          orderId: generatedOrderId,
          createdAt: new Date().toISOString(),
          customerName,
          customerPhone,
          customerEmail: customerEmail || '-',
          country: selectedCountry.nameId,
          address: `${customerAddress}, ${customerCity} (${customerPostal})`,
          items: cart.map(i => ({
            id: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.priceIdr
          })),
          subtotal: subtotalIdr,
          discount: discountAmountIdr,
          shipping: shippingCostIdr,
          grandTotal: grandTotalIdr,
          paymentMethod: paymentMethod.toUpperCase(),
          status: 'Menunggu Konfirmasi',
          trackingNumber: ''
        };
        localStorage.setItem('manna_shop_admin_orders_v1', JSON.stringify([newRecord, ...existingOrders]));
      } catch (err) {
        console.error('Failed to store order in local store history', err);
      }

      // Track E-commerce Analytics Event
      trackPurchase(generatedOrderId, cart, grandTotalIdr, shippingCostIdr);

      // If user selected WhatsApp checkout or wants auto-open
      if (paymentMethod === 'wa') {
        window.open(`https://wa.me/6287881110807?text=${waMessage}`, '_blank');
      }

      onOrderSuccess();
    }, 600);
  };

  const copyInvoiceDetails = () => {
    if (!orderCompleted) return;
    const text = `Invoice Mannazentrum Shop: ${orderCompleted.orderId}\nTotal: Rp ${orderCompleted.totalAmountIdr.toLocaleString('id-ID')}\nPembeli: ${customerName}`;
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 font-sans animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ORDER SUCCESS SCREEN */}
        {orderCompleted ? (
          <div className="p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                {language === 'id' ? 'Pesanan Berhasil Dibuat!' : 'Order Placed Successfully!'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-slate-900">
                {language === 'id' ? 'Terima Kasih atas Pesanan Anda' : 'Thank You for Your Order'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light max-w-md mx-auto">
                {language === 'id' 
                  ? 'Invoice pesanan telah dibuat. Tim Mannazentrum Shop akan segera memproses pengiriman ke alamat tujuan Anda.'
                  : 'Your invoice is generated. Mannazentrum Shop team will process your order for shipping.'}
              </p>
            </div>

            {/* Invoice Summary Box */}
            <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-5 text-left space-y-3 text-xs max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="text-slate-500">{language === 'id' ? 'Nomor Pesanan' : 'Order ID'}:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{orderCompleted.orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{language === 'id' ? 'Penerima' : 'Recipient'}:</span>
                <span className="font-medium text-slate-800">{customerName} ({selectedCountry.flag} {selectedCountry.nameId})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{language === 'id' ? 'Total Tagihan' : 'Grand Total'}:</span>
                <span className="font-extrabold text-amber-900 text-base">
                  {formatPrice(orderCompleted.totalAmountIdr, currency)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-stone-200">
                <span>{language === 'id' ? 'Metode Pembayaran' : 'Payment Method'}:</span>
                <span className="font-semibold text-slate-700 uppercase">{paymentMethod}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <a
                href={`https://wa.me/6287881110807?text=Halo%20Admin%20Mannazentrum%20Shop,%20saya%20sudah%20membuat%20pesanan%20dengan%20No%20${orderCompleted.orderId}%20senilai%20Rp%20${orderCompleted.totalAmountIdr.toLocaleString('id-ID')}.%20Mohon%20instruksi%20pembayaran.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>{language === 'id' ? 'Konfirmasi ke CS WhatsApp' : 'Confirm via WhatsApp'}</span>
              </a>

              <button
                onClick={copyInvoiceDetails}
                className="py-3 px-4 rounded-full border border-stone-300 text-slate-700 hover:bg-stone-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                {copiedInvoice ? <Check className="w-4 h-4 text-amber-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedInvoice ? (language === 'id' ? 'Tersalin!' : 'Copied!') : (language === 'id' ? 'Salin Invoice' : 'Copy Invoice')}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              {language === 'id' ? 'Kembali ke Katalog Toko' : 'Back to Store'}
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {language === 'id' ? 'Checkout Terpadu Mannazentrum Shop' : 'Integrated Store Checkout'}
              </h3>
              <p className="text-xs text-slate-500 font-light mt-1">
                {language === 'id' 
                  ? 'Layanan pengiriman cepat & aman untuk keluarga di Indonesia dan Asia Tenggara.' 
                  : 'Reliable daily supplies delivery for families in Indonesia and Southeast Asia.'}
              </p>
            </div>

            {/* Country Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {language === 'id' ? 'Negara Tujuan Pengiriman (ID / ASEAN):' : 'Destination Country (ID / ASEAN):'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHIPPING_DESTINATIONS.map((dest) => (
                  <button
                    type="button"
                    key={dest.code}
                    onClick={() => setSelectedCountryCode(dest.code)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                      selectedCountryCode === dest.code
                        ? 'border-amber-500 bg-amber-50/70 text-slate-900 ring-2 ring-amber-500/20'
                        : 'border-stone-200 hover:bg-stone-50 text-slate-600'
                    }`}
                  >
                    <span className="text-lg">{dest.flag}</span>
                    <div className="truncate">
                      <span className="text-xs font-bold block truncate">{dest.nameEn}</span>
                      <span className="text-[10px] text-slate-500">{dest.code === 'ID' ? 'Domestik' : 'Internasional'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {language === 'id' ? 'Informasi Penerima' : 'Recipient Information'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'id' ? 'Nama Lengkap *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Siti Nurhaliza"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'id' ? 'No. WhatsApp / HP *' : 'WhatsApp / Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +62 812 3456 7890"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {language === 'id' ? 'Email (opsional)' : 'Email (optional)'}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="keluarga@email.com"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {language === 'id' ? 'Alamat Lengkap Rumah / Kantor *' : 'Detailed Address *'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={language === 'id' ? 'Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan' : 'Street name, unit/house number, district'}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'id' ? 'Kota / Kabupaten' : 'City / State'}
                  </label>
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="e.g. Tangerang / KL / Singapore"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'id' ? 'Kode Pos' : 'Postal Code'}
                  </label>
                  <input
                    type="text"
                    value={customerPostal}
                    onChange={(e) => setCustomerPostal(e.target.value)}
                    placeholder="e.g. 15345"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {language === 'id' ? 'Catatan Tambahan untuk Kurir' : 'Courier Notes'}
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={language === 'id' ? 'e.g. Titip di pos sekuriti / hubungi sebelum antar' : 'e.g. Leave at door if away'}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden"
                />
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-[#FAF9F5] border border-stone-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>{language === 'id' ? 'Jalur Pengiriman:' : 'Shipping Courier:'} {selectedCountry.courier}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'id' ? 'Total Berat Barang' : 'Total Package Weight'}:</span>
                <span className="font-semibold">{weightKg} kg ({totalWeightGrams} g)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'id' ? 'Ongkos Kirim' : 'Shipping Fee'}:</span>
                <span className="font-bold text-amber-800">{formatPrice(shippingCostIdr, currency)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {language === 'id' ? 'Pilih Metode Pembayaran:' : 'Select Payment Method:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'qris'
                      ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-600'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-amber-700" />
                  <span className="text-[11px]">QRIS / e-Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('va')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'va'
                      ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-600'
                  }`}
                >
                  <Building className="w-5 h-5 text-amber-700" />
                  <span className="text-[11px]">Virtual Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-700" />
                  <span className="text-[11px]">Visa / Master</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wa')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'wa'
                      ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:bg-stone-50 text-slate-600'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-amber-700" />
                  <span className="text-[11px]">WhatsApp Direct</span>
                </button>

              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-stone-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{language === 'id' ? 'Subtotal Produk' : 'Subtotal'}:</span>
                <span className="font-semibold text-slate-800">{formatPrice(subtotalIdr, currency)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-amber-700 font-medium">
                  <span>{language === 'id' ? `Diskon Kupon (${discountPercent}%)` : `Coupon Discount`}:</span>
                  <span>-{formatPrice(discountAmountIdr, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{language === 'id' ? `Ongkos Kirim (${selectedCountry.nameEn})` : `Shipping`}:</span>
                <span className="font-semibold text-slate-800">{formatPrice(shippingCostIdr, currency)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">{language === 'id' ? 'Total Akhir' : 'Grand Total'}:</span>
                <span className="font-black text-amber-900 text-xl">{formatPrice(grandTotalIdr, currency)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-slate-900 hover:bg-amber-600 text-white rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? (language === 'id' ? 'Memproses Pesanan...' : 'Processing...') : (language === 'id' ? 'Konfirmasi Pesanan & Bayar' : 'Confirm Order & Pay')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'id' ? 'Data transaksi dilindungi enkripsi SSL 256-bit dan garansi toko resmi.' : 'Protected by 256-bit SSL encryption & official warranty.'}</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
