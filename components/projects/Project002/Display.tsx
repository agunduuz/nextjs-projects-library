import { Operation } from './types';

interface DisplayProps {
  value: string;
  history: string;
  operation: Operation;
  isMobile: boolean;
}

export function Display({ value, history, operation, isMobile }: DisplayProps) {
  // NaN kontrolü
  const displayValue = isNaN(parseFloat(value)) ? 'Error' : value;
  const isError = displayValue === 'Error';

  // Sayı formatı (uzun sayıları kısalt)
  const formatDisplay = (val: string): string => {
    if (val === 'Error') return val;

    const num = parseFloat(val);
    const maxLength = isMobile ? 10 : 15;

    const scientificLimit = isMobile ? 1e10 : 1e15;

    // Çok büyük veya çok küçük sayılar için scientific notation
    if (
      Math.abs(num) >= scientificLimit ||
      (Math.abs(num) < 1e-6 && num !== 0)
    ) {
      return num.toExponential(isMobile ? 4 : 8); // Mobilde 4, desktop'ta 8 basamak
    }

    // Ondalık kısmı kısalt (max 10 basamak)
    if (val.includes('.')) {
      const [integer, decimal] = val.split('.');
      if (integer.length > maxLength - 2) {
        return num.toExponential(isMobile ? 4 : 8);
      }
      const maxDecimal = isMobile ? 4 : 10;
      return `${integer}.${decimal.slice(0, maxDecimal)}`;
    }

    // Tam sayı çok uzunsa bilimsel gösterim
    if (val.length > maxLength) {
      return num.toExponential(isMobile ? 4 : 8);
    }

    return val;
  };

  const formattedValue = formatDisplay(displayValue);

  // Font boyutunu dinamik ayarla
  const getFontSize = (val: string): string => {
    const len = val.length;

    if (isMobile) {
      // Mobil font boyutları
      if (len <= 6) return 'text-4xl';
      if (len <= 8) return 'text-3xl';
      if (len <= 10) return 'text-2xl';
      return 'text-xl';
    } else {
      // Desktop font boyutları
      if (len <= 10) return 'text-4xl sm:text-5xl';
      if (len <= 12) return 'text-3xl sm:text-4xl';
      if (len <= 15) return 'text-2xl sm:text-3xl';
      return 'text-xl sm:text-2xl';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-xl p-6 shadow-inner border border-gray-700">
      {/* Geçmiş gösterimi */}
      {history && (
        <div className="text-right text-sm text-gray-400 dark:text-gray-500 mb-2 h-6 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
          {history}
        </div>
      )}

      {/* Ana ekran */}
      <div
        className={`text-right font-bold font-mono transition-all overflow-hidden text-ellipsis whitespace-nowrap ${getFontSize(
          formattedValue
        )} ${
          isError
            ? 'text-red-400 dark:text-red-500'
            : 'text-white dark:text-gray-100'
        }`}
        title={displayValue} // Hover'da tam sayı göster
      >
        {formattedValue}
      </div>

      {/* Aktif operatör göstergesi */}
      {operation && !history && (
        <div className="text-right text-xl text-primary-400 dark:text-primary-500 mt-2">
          {operation}
        </div>
      )}
    </div>
  );
}
