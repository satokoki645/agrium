import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useFetchWeatherData, {
  WeatherInfo,
} from "../../usecase/useFetchWeather";

type Props = {
  yearMonth: Date;
  single: boolean;
  rcseq: number;
};

const Yotei: React.FC<Props> = ({ yearMonth, single, rcseq }) => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = React.useState<{
    [key: string]: WeatherInfo | null;
  }>({});

  const [location, setLocation] = React.useState("Tokyo");
  const [apiKey, setApiKey] = React.useState(
    "ff599c365a84e0bece77454bb9e800d2"
  );

  React.useEffect(() => {
    const fetchWeatherData = async (location: string, date: string) => {
      const data = await useFetchWeatherData(location, date);
      return data;
    };

    const fetchAllWeatherData = async () => {
      const daysInMonth = countAvailableDaysInMonth(
        yearMonth.getFullYear(),
        yearMonth.getMonth()
      );
      const weatherPromises = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${yearMonth.getFullYear()}-${String(
          yearMonth.getMonth() + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        weatherPromises.push(fetchWeatherData(location, date));
      }
      const results = await Promise.all(weatherPromises);
      const weatherDataMap: { [key: string]: WeatherInfo | null } = {};
      results.forEach((data, index) => {
        const day = index + 1;
        const date = `${yearMonth.getFullYear()}-${String(
          yearMonth.getMonth() + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        weatherDataMap[date] = data;
      });
      setWeatherData(weatherDataMap);
    };

    fetchAllWeatherData();
  }, [yearMonth, location, apiKey]);

  const countAvailableDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(
      yearMonth.getFullYear(),
      yearMonth.getMonth() + offset,
      1
    );
    const path = newMonth.toISOString().substring(0, 7);
    navigate(single ? `/yotei/${path}` : `/user/${rcseq}/yotei/${path}`);
  };

  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 bg-green-600 text-white py-2">
      {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
        <div key={day} className="flex justify-center items-center gap-4">
          <span>{day}</span>
        </div>
      ))}
    </div>
  );

  const renderDay = (day: number, offset: number) => {
    const date = `${yearMonth.getFullYear()}-${String(
      yearMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const weather = weatherData[date];

    return (
      <div
        key={day}
        className={`col-start-${offset} flex flex-col items-center justify-center h-24 border border-gray-300 bg-white`}
      >
        <span className="text-sm font-bold">{day}</span>
        {weather ? (
          <>
            <span className="text-lg">{weather.temp}°C</span>
            <span className="text-sm">{weather.description}</span>
          </>
        ) : (
          <span className="text-sm">Loading...</span>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    const startOfMonth = new Date(
      yearMonth.getFullYear(),
      yearMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      yearMonth.getFullYear(),
      yearMonth.getMonth() + 1,
      0
    );
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfWeek =
      startOfMonth.getDay() === 0 ? 7 : startOfMonth.getDay();
    const weeks = [];
    let offset = firstDayOfWeek;
    let day = 1;

    while (day <= daysInMonth) {
      weeks.push(
        <div
          key={`week-${weeks.length}`}
          className="grid grid-cols-7 border-t border-gray-300"
        >
          {Array.from({ length: 7 }).map((_, index) => {
            if (
              day > daysInMonth ||
              (weeks.length === 0 && index < firstDayOfWeek - 1)
            ) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-24 border border-gray-300 bg-gray-100"
                />
              );
            }
            return renderDay(day++, offset++);
          })}
        </div>
      );
    }

    return weeks;
  };

  return (
    <>
      <div className="bg-green-600 text-white text-center py-2 mb-1">予定</div>
      <div className="flex justify-between items-center mb-2 px-5">
        <Button
          id="arrow-back-btn"
          onClick={() => changeMonth(-1)}
          size={""}
          name={""}
        >
          <span>&lt;</span>
        </Button>
        <Button
          id="arrow-forward-btn"
          onClick={() => changeMonth(1)}
          size={""}
          name={""}
        >
          <span>&gt;</span>
        </Button>
      </div>
      {renderDaysOfWeek()}
      <div className="w-full">{renderCalendar()}</div>
    </>
  );
};

export default Yotei;
