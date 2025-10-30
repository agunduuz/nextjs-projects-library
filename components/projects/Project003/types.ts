export interface WeatherData {
  name: string; // Şehir adı
  sys: {
    country: string; // Ülke kodu
  };
  main: {
    temp: number; // Sıcaklık (Celsius)
    feels_like: number; // Hissedilen
    humidity: number; // Nem (%)
    pressure: number; // Basınç
  };
  weather: {
    id: number;
    main: string; // Açıklama (Clear, Clouds, Rain)
    description: string; // Detaylı açıklama
    icon: string; // Icon kodu (01d, 02n, etc.)
  }[];
  wind: {
    speed: number; // Rüzgar hızı (m/s)
  };
  dt: number; // Unix timestamp
}

export interface ForecastData {
  list: {
    dt: number; // Unix timestamp
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    dt_txt: string; // Tarih saat string
  }[];
  city: {
    name: string;
    country: string;
  };
}

export interface WeatherState {
  current: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}
