export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeOptions {
  text: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
}

export interface QRCodeState {
  dataUrl: string | null;
  loading: boolean;
  error: string | null;
}
