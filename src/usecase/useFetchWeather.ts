import axios from "axios";

export type WeatherInfo = {
  date: string;
  temp: number;
  description: string;
};

const API_KEY: string = import.meta.env.VITE_API_KEY;

const useFetchWeatherData = async (location: string) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
  );
  const data = response.data.list;

  // 日付ごとにデータをまとめる
  const weatherData: { [date: string]: WeatherInfo } = {};
  data.forEach((entry: any) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!weatherData[date]) {
      weatherData[date] = {
        temp: entry.main.temp,
        description: entry.weather[0].description,
      };
    }
  });
  return weatherData;
};

export default useFetchWeatherData;
