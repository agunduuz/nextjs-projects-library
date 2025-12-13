import Image from 'next/image';
import { ForecastData } from './types';
import { getWeatherIconUrl } from './weatherService';

interface ForecastProps {
  data: ForecastData;
}

export function Forecast({ data }: ForecastProps) {
  // 5 günlük tahmin için günlük öğle verisini al (12:00)
  const dailyForecasts = data.list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 5);

  // Gün adı al
  const getDayName = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { weekday: 'short' });
  };

  // Tarih formatla
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-secondary-800 rounded-2xl dark:border-secondary-700">
      <h3 className="mb-6 text-xl font-bold sm:text-2xl text-secondary-900 dark:text-white">
        📅 5 Günlük Tahmin
      </h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {dailyForecasts.map((forecast, index) => (
          <div
            key={index}
            className="p-4 text-center transition-shadow bg-gray-50 dark:bg-secondary-700 rounded-xl hover:shadow-md"
          >
            {/* Gün */}
            <p className="mb-1 font-semibold text-secondary-900 dark:text-white">
              {index === 0 ? 'Bugün' : getDayName(forecast.dt_txt)}
            </p>
            <p className="mb-3 text-xs text-secondary-500 dark:text-secondary-400">
              {formatDate(forecast.dt_txt)}
            </p>

            {/* Icon */}
            <Image
              src={getWeatherIconUrl(forecast.weather[0].icon)}
              alt={forecast.weather[0].description}
              className="w-16 h-16 mx-auto mb-2"
              width={64}
              height={64}
            />

            {/* Sıcaklık */}
            <p className="mb-1 text-2xl font-bold text-secondary-900 dark:text-white">
              {Math.round(forecast.main.temp)}°
            </p>

            {/* Açıklama */}
            <p className="text-xs capitalize text-secondary-600 dark:text-secondary-400 line-clamp-2">
              {forecast.weather[0].description}
            </p>

            {/* Nem */}
            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-secondary-600">
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                💧 {forecast.main.humidity}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
