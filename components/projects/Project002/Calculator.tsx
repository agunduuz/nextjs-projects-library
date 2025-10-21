'use client';

import { useState, useCallback, useEffect } from 'react';
import { CalculatorState, Operation } from './types';
import { Display } from './Display';
import { Button } from './Button';

export function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operation: null,
    waitingForOperand: false,
    history: '',
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const MAX_LENGTH = isMobile ? 10 : 15;

  // Sayı girişi
  const handleNumber = useCallback(
    (num: string) => {
      setState(prev => {
        if (prev.waitingForOperand) {
          return {
            ...prev,
            currentValue: num,
            waitingForOperand: false,
          };
        }

        if (prev.currentValue === '0' && num !== '.') {
          return { ...prev, currentValue: num };
        }

        // Ondalık nokta kontrolü
        if (num === '.' && prev.currentValue.includes('.')) {
          return prev;
        }

        if (prev.currentValue.length >= MAX_LENGTH && num !== '.') {
          return prev;
        }

        return {
          ...prev,
          currentValue: prev.currentValue + num,
        };
      });
    },
    [MAX_LENGTH]
  );

  // Operatör seçimi
  const handleOperation = useCallback((op: Operation) => {
    setState(prev => {
      if (prev.operation && !prev.waitingForOperand) {
        // Önceki işlemi tamamla
        const result = calculate(
          parseFloat(prev.previousValue),
          parseFloat(prev.currentValue),
          prev.operation
        );

        return {
          currentValue: String(result),
          previousValue: String(result),
          operation: op,
          waitingForOperand: true,
          history: `${prev.previousValue} ${prev.operation} ${prev.currentValue} =`,
        };
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operation: op,
        waitingForOperand: true,
        history: `${prev.currentValue} ${op}`,
      };
    });
  }, []);

  // Eşittir
  const handleEquals = useCallback(() => {
    setState(prev => {
      if (!prev.operation || prev.waitingForOperand) {
        return prev;
      }

      const result = calculate(
        parseFloat(prev.previousValue),
        parseFloat(prev.currentValue),
        prev.operation
      );

      return {
        currentValue: String(result),
        previousValue: '',
        operation: null,
        waitingForOperand: true,
        history: `${prev.previousValue} ${prev.operation} ${prev.currentValue} =`,
      };
    });
  }, []);

  // Temizle
  const handleClear = useCallback(() => {
    setState({
      currentValue: '0',
      previousValue: '',
      operation: null,
      waitingForOperand: false,
      history: '',
    });
  }, []);

  // Sil (Backspace)
  const handleBackspace = useCallback(() => {
    setState(prev => {
      if (prev.currentValue.length === 1) {
        return { ...prev, currentValue: '0' };
      }
      return {
        ...prev,
        currentValue: prev.currentValue.slice(0, -1),
      };
    });
  }, []);

  // Hesaplama fonksiyonu
  const calculate = (a: number, b: number, op: Operation): number => {
    let result: number;

    switch (op) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '×':
        result = a * b;
        break;
      case '÷':
        result = b !== 0 ? a / b : NaN;
        break;
      default:
        result = b;
    }

    // ✅ Floating point hatalarını düzelt
    // Örnek: 0.1 + 0.2 = 0.30000000000000004 → 0.3
    if (!isNaN(result) && isFinite(result)) {
      // 10 ondalık basamağa yuvarla
      result = Math.round(result * 1e10) / 1e10;
    }

    return result;
  };

  // Klavye desteği (ADIM 6'da ekleyeceğiz)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      // Sayılar
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      }
      // Ondalık
      else if (e.key === '.') {
        handleNumber('.');
      }
      // Operatörler
      else if (e.key === '+') {
        handleOperation('+');
      } else if (e.key === '-') {
        handleOperation('-');
      } else if (e.key === '*') {
        handleOperation('×');
      } else if (e.key === '/') {
        handleOperation('÷');
      }
      // Eşittir
      else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      }
      // Backspace
      else if (e.key === 'Backspace') {
        handleBackspace();
      }
      // Temizle
      else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleNumber,
    handleOperation,
    handleEquals,
    handleBackspace,
    handleClear,
  ]);

  return (
    <div className="max-w-md mx-auto">
      {state.currentValue.length >= MAX_LENGTH - 2 && (
        <div className="mb-2 text-center">
          <span className="text-xs text-amber-500 dark:text-amber-400">
            ⚠️ Maksimum {MAX_LENGTH} karakter
          </span>
        </div>
      )}
      {/* Display */}
      <Display
        value={state.currentValue}
        history={state.history}
        operation={state.operation}
        isMobile={isMobile}
      />

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {/* Fonksiyon butonları */}
        <Button onClick={handleClear} variant="function" span={2}>
          C
        </Button>
        <Button onClick={handleBackspace} variant="function">
          ←
        </Button>
        <Button onClick={() => handleOperation('÷')} variant="operator">
          ÷
        </Button>

        {/* Sayılar ve operatörler */}
        <Button onClick={() => handleNumber('7')} variant="number">
          7
        </Button>
        <Button onClick={() => handleNumber('8')} variant="number">
          8
        </Button>
        <Button onClick={() => handleNumber('9')} variant="number">
          9
        </Button>
        <Button onClick={() => handleOperation('×')} variant="operator">
          ×
        </Button>

        <Button onClick={() => handleNumber('4')} variant="number">
          4
        </Button>
        <Button onClick={() => handleNumber('5')} variant="number">
          5
        </Button>
        <Button onClick={() => handleNumber('6')} variant="number">
          6
        </Button>
        <Button onClick={() => handleOperation('-')} variant="operator">
          -
        </Button>

        <Button onClick={() => handleNumber('1')} variant="number">
          1
        </Button>
        <Button onClick={() => handleNumber('2')} variant="number">
          2
        </Button>
        <Button onClick={() => handleNumber('3')} variant="number">
          3
        </Button>
        <Button onClick={() => handleOperation('+')} variant="operator">
          +
        </Button>

        <Button onClick={() => handleNumber('0')} variant="number" span={2}>
          0
        </Button>
        <Button onClick={() => handleNumber('.')} variant="number">
          .
        </Button>
        <Button onClick={handleEquals} variant="equals">
          =
        </Button>
      </div>
    </div>
  );
}
