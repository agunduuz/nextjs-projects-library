'use client';

import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { WeatherState } from './types';
import {
  getWeatherByCity,
  getWeatherByCoords,
  getForecast,
} from './weatherService';
import { CurrentWeather } from './CurrentWeather';
import { Forecast } from './Forecast';

export function WeatherApp() {
  const [city, setCity] = useState('');
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  // Şehir arama
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecast(city),
      ]);

      setState({
        current: weatherData,
        forecast: forecastData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Bir hata oluştu!',
      }));
    }
  };

  // Mevcut konum
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Tarayıcınız konum özelliğini desteklemiyor!',
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(async position => {
      try {
        const { latitude, longitude } = position.coords;
        const weatherData = await getWeatherByCoords(latitude, longitude);
        const forecastData = await getForecast(weatherData.name);

        setState({
          current: weatherData,
          forecast: forecastData,
          loading: false,
          error: null,
        });
        setCity(weatherData.name);
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Konum alınamadı!',
        }));
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="flex items-center justify-center gap-2 mb-2 text-2xl font-bold sm:text-3xl text-secondary-900 dark:text-white">
          <span className="text-3xl">🌤️</span>
          <span>Weather App</span>
        </h3>
        <p className="text-sm sm:text-base text-secondary-500 dark:text-secondary-400">
          Hava durumu ve 5 günlük tahmin
        </p>
      </div>

      {/* Arama Formu */}
      <div className="p-4 bg-white border border-gray-200 shadow-lg dark:bg-secondary-800 rounded-xl dark:border-secondary-700 sm:p-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-secondary-400" />
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Şehir adı giriniz..."
              className="w-full py-3 pl-10 pr-4 transition-all bg-white border border-gray-300 rounded-lg dark:border-secondary-600 dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={state.loading || !city.trim()}
            className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed"
          >
            {state.loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Ara'
            )}
          </button>
          <button
            type="button"
            onClick={handleGeolocation}
            disabled={state.loading}
            className="px-4 py-3 text-white transition-colors rounded-lg bg-accent-500 hover:bg-accent-600 disabled:bg-gray-300 dark:disabled:bg-secondary-700 disabled:cursor-not-allowed"
            title="Konumumu kullan"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Error */}
      {state.error && (
        <div className="p-4 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          ⚠️ {state.error}
        </div>
      )}

      {/* Loading */}
      {state.loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      )}

      {/* Current Weather */}
      {state.current && !state.loading && (
        <CurrentWeather data={state.current} />
      )}

      {/* Forecast */}
      {state.forecast && !state.loading && <Forecast data={state.forecast} />}

      {/* İlk Yükleme Mesajı */}
      {!state.current && !state.loading && !state.error && (
        <div className="py-12 text-center text-secondary-500 dark:text-secondary-400">
          <div className="mb-4 text-6xl">🌍</div>
          <p className="text-lg">Şehir adı girerek hava durumunu öğrenin</p>
          <p className="mt-2 text-sm">veya konum butonunu kullanın</p>
        </div>
      )}
    </div>
  );
}
