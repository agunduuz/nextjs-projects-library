export type Operation = '+' | '-' | '×' | '÷' | null;

export interface CalculatorState {
  currentValue: string; // Ekrandaki değer
  previousValue: string; // Önceki değer
  operation: Operation; // Seçili operatör
  waitingForOperand: boolean; // Yeni sayı girilecek mi?
  history: string; // Son işlem gösterimi
}

export type ButtonType = 'number' | 'operator' | 'function' | 'equals';
