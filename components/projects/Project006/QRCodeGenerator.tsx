'use client';

import { useEffect, useState } from 'react';
import { Download, QrCode, AlertCircle } from 'lucide-react';
import { generateQRCode } from './qrService';
import { QRCodeState, ErrorCorrectionLevel } from './types';

const SIZES = [200, 300, 400] as const;
const ERROR_LEVELS: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: 'L', label: 'Düşük (7%)' },
  { value: 'M', label: 'Orta (15%)' },
  { value: 'Q', label: 'Yüksek (25%)' },
  { value: 'H', label: 'En Yüksek (30%)' },
];

export function QRCodeGenerator() {
  const [text, setText] = useState('https://nextjs-projects-library.vercel.app');
  const [size, setSize] = useState<number>(300);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>('M');
  const [foregroundColor, setForegroundColor] = useState('#0A1111');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [state, setState] = useState<QRCodeState>({
    dataUrl: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      createQRCode();
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, size, errorCorrectionLevel, foregroundColor, backgroundColor]);

  const createQRCode = async () => {
    if (!text.trim()) {
      setState({ dataUrl: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const dataUrl = await generateQRCode({
        text,
        size,
        errorCorrectionLevel,
        foregroundColor,
        backgroundColor,
      });
      setState({ dataUrl, loading: false, error: null });
    } catch (error) {
      setState({
        dataUrl: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Bir hata oluştu',
      });
    }
  };

  const handleDownload = () => {
    if (!state.dataUrl) return;

    const link = document.createElement('a');
    link.href = state.dataUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 dark:text-primary-400" />
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl text-secondary-900 dark:text-white">
            QR Kod Oluşturucu
          </h2>
        </div>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          Metin veya URL&apos;den anında QR kod oluşturun
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="qr-text"
              className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white"
            >
              Metin / URL
            </label>
            <textarea
              id="qr-text"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={3}
              placeholder="QR koda dönüştürmek istediğiniz metni girin..."
              className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg resize-none sm:text-base dark:bg-secondary-800 dark:border-secondary-700 dark:text-white text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              aria-label="QR kod için metin girişi"
            />
          </div>

          <div>
            <label
              htmlFor="qr-size"
              className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white"
            >
              Boyut
            </label>
            <div className="flex flex-wrap gap-2" id="qr-size">
              {SIZES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`touch-manipulation min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    size === s
                      ? 'bg-primary-500 text-white dark:bg-primary-600'
                      : 'bg-gray-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                  }`}
                  aria-pressed={size === s}
                >
                  {s}x{s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="qr-error-level"
              className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white"
            >
              Hata Düzeltme Seviyesi
            </label>
            <select
              id="qr-error-level"
              value={errorCorrectionLevel}
              onChange={e =>
                setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)
              }
              className="w-full min-h-[44px] p-3 text-sm bg-white border border-gray-200 rounded-lg sm:text-base dark:bg-secondary-800 dark:border-secondary-700 dark:text-white text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            >
              {ERROR_LEVELS.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="qr-fg-color"
                className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white"
              >
                Ön Plan Rengi
              </label>
              <input
                id="qr-fg-color"
                type="color"
                value={foregroundColor}
                onChange={e => setForegroundColor(e.target.value)}
                className="w-full h-11 rounded-lg cursor-pointer touch-manipulation border border-gray-200 dark:border-secondary-700"
              />
            </div>
            <div>
              <label
                htmlFor="qr-bg-color"
                className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white"
              >
                Arka Plan Rengi
              </label>
              <input
                id="qr-bg-color"
                type="color"
                value={backgroundColor}
                onChange={e => setBackgroundColor(e.target.value)}
                className="w-full h-11 rounded-lg cursor-pointer touch-manipulation border border-gray-200 dark:border-secondary-700"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-secondary-700 rounded-xl bg-gray-50 dark:bg-secondary-800/50">
          {state.loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 rounded-full border-primary-200 dark:border-primary-900 border-t-primary-500 dark:border-t-primary-400 animate-spin" />
              <p className="mt-4 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Oluşturuluyor...
              </p>
            </div>
          )}

          {state.error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                {state.error}
              </p>
            </div>
          )}

          {!state.loading && !state.error && !state.dataUrl && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <QrCode className="w-10 h-10 text-secondary-400 dark:text-secondary-600" />
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                QR kodu görmek için metin girin
              </p>
            </div>
          )}

          {!state.loading && !state.error && state.dataUrl && (
            <div className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.dataUrl}
                alt={`"${text}" için oluşturulan QR kod`}
                className="rounded-lg shadow-md max-w-full h-auto"
                width={size}
                height={size}
              />
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all shadow-lg touch-manipulation min-h-[44px] bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-xl hover:shadow-xl"
                aria-label="QR kodu PNG olarak indir"
              >
                <Download className="w-5 h-5" />
                <span>PNG İndir</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
