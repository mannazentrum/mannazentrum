import { CurrencyKey, CURRENCY_RATES } from '../data/shopData';

export const formatPrice = (priceIdr: number, currency: CurrencyKey): string => {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.IDR;
  const converted = priceIdr * config.rate;

  if (currency === 'IDR') {
    return `Rp ${Math.round(converted).toLocaleString('id-ID')}`;
  } else if (currency === 'SGD') {
    return `S$ ${converted.toFixed(2)}`;
  } else if (currency === 'MYR') {
    return `RM ${converted.toFixed(2)}`;
  } else {
    return `$ ${converted.toFixed(2)}`;
  }
};
