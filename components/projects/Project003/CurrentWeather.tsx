import Image from 'next/image';
import { WeatherData } from './types';
import { getWeatherIconUrl } from './weatherService';
import { Droplets, Wind, Gauge, Eye } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const { name, sys, main, weather, wind } = data;
  const weatherInfo = weather[0];

  // Tarih formatla
  const date = new Date();
  const formattedDate = date.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 text-white shadow-xl bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 rounded-2xl sm:p-8">
      {/* Şehir & Tarih */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="mb-1 text-3xl font-bold sm:text-4xl">
            {name}, {sys.country}
          </h2>
          <p className="text-sm text-white/80 sm:text-base">{formattedDate}</p>
        </div>
        <Image
          src={getWeatherIconUrl(weatherInfo.icon)}
          alt={weatherInfo.description}
          className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
          width={96}
          height={96}
        />
      </div>

      {/* Sıcaklık & Açıklama */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-6xl font-bold sm:text-7xl">
            {Math.round(main.temp)}°
          </span>
          <span className="text-2xl font-medium sm:text-3xl opacity-80">C</span>
        </div>
        <p className="text-xl font-medium capitalize sm:text-2xl">
          {weatherInfo.description}
        </p>
        <p className="mt-1 text-sm text-white/80 sm:text-base">
          Hissedilen: {Math.round(main.feels_like)}°C
        </p>
      </div>

      {/* Detaylar Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Nem */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5" />
            <span className="text-sm opacity-80">Nem</span>
          </div>
          <p className="text-2xl font-bold">{main.humidity}%</p>
        </div>

        {/* Rüzgar */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5" />
            <span className="text-sm opacity-80">Rüzgar</span>
          </div>
          <p className="text-2xl font-bold">{wind.speed} m/s</p>
        </div>

        {/* Basınç */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5" />
            <span className="text-sm opacity-80">Basınç</span>
          </div>
          <p className="text-2xl font-bold">{main.pressure} hPa</p>
        </div>

        {/* Görüş */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5" />
            <span className="text-sm opacity-80">Hissedilen</span>
          </div>
          <p className="text-2xl font-bold">{Math.round(main.feels_like)}°</p>
        </div>
      </div>
    </div>
  );
}
