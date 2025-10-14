export const useCurrency = () => {
  const currencyMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CHF: "CHF",
    CAD: "C$",
    AUD: "A$",
    CNY: "¥",
    INR: "₹",
    BRL: "R$",
    RUB: "₽",
    KRW: "₩",
    MXN: "$",
    ZAR: "R",
  };

  const getCurrencySign = (currency: string): string => {
    return currencyMap[currency.toUpperCase()] || currency;
  }; // Returns '$' '€' '₺'

  const formatCurrency = (amount: number, currency: string): string => {
    const sign = getCurrencySign(currency);
    return `${sign}${amount.toFixed(2)}`;
  }; // Returns '$25.50'

  const getSupportedCurrencies = (): string[] => {
    return Object.keys(currencyMap); // Returns ['USD', 'EUR', 'TL']
  };

  return {
    getCurrencySign,
    formatCurrency,
    getSupportedCurrencies,
  };
};
