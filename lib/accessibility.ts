// eslint-disable-next-line @typescript-eslint/no-unused-vars
// ARIA label oluşturucu
export function createAriaLabel(text: string, context?: string): string {
  return context ? `${text} - ${context}` : text;
}

// Klavye navigasyonu için handler
export function handleKeyboardNavigation(
  e: React.KeyboardEvent,
  callback: () => void
) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    callback();
  }
}

// Focus trap için
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  element.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
