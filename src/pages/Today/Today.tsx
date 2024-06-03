import React, { useState, useEffect } from "react";
import useFetchWeatherData, {
  WeatherInfo,
} from "../../usecase/useFetchWeather";
import { useParams } from "react-router-dom";

type TodayWeatherProps = {
  location: string;
};

const TodayWeather: React.FC<TodayWeatherProps> = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  // URLパラメータのlocationを受け取る
  const location = useParams().location;
  // URLパラメータのdayを受け取る
  const day = useParams().day;

  useEffect(() => {
    const fetchWeather = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await useFetchWeatherData(location, today);
      setWeather(data);
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Today's Weather in {location}</h2>
      {weather ? (
        <div className="flex flex-col items-center">
          <span className="text-4xl">{weather.temp}°C</span>
          <span className="text-lg">{weather.description}</span>
        </div>
      ) : (
        <span className="text-lg">Loading...</span>
      )}
    </div>
  );
};

export default TodayWeather;
