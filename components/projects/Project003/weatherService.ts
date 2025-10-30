import { WeatherData, ForecastData } from './types';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

console.log('API_KEY:', API_KEY ? 'Var ✅' : 'YOK ❌');

// Şehir adına göre hava durumu
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Şehir bulunamadı!');
    }
    throw new Error('Hava durumu alınamadı!');
  }

  return response.json();
}

// Koordinatlara göre hava durumu
export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
  );

  if (!response.ok) {
    throw new Error('Hava durumu alınamadı!');
  }

  return response.json();
}

// 5 günlük tahmin
export async function getForecast(city: string): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
  );

  if (!response.ok) {
    throw new Error('Tahmin alınamadı!');
  }

  return response.json();
}

// Icon URL'si al
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
