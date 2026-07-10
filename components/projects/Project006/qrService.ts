import QRCode from 'qrcode';
import { QRCodeOptions } from './types';

export async function generateQRCode({
  text,
  size,
  errorCorrectionLevel,
  foregroundColor,
  backgroundColor,
}: QRCodeOptions): Promise<string> {
  if (!text.trim()) {
    throw new Error('Lütfen QR koda dönüştürülecek bir metin girin');
  }

  try {
    return await QRCode.toDataURL(text, {
      width: size,
      errorCorrectionLevel,
      margin: 2,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    });
  } catch {
    throw new Error('QR kod oluşturulurken bir hata oluştu');
  }
}
