// Sayıya önde sıfır ekle (9 → "09")
export function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}

// Millisaniye → MM:SS:MS formatı
export function formatStopwatch(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);

  return `${padZero(minutes)}:${padZero(seconds)}:${padZero(ms)}`;
}

// Saniye → HH:MM:SS formatı
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

// Gerçek zamanlı saat formatı
export function formatClock(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

// Tarih formatı
export function formatDate(date: Date): string {
  return date.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
