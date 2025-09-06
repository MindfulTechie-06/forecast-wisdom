// src/components/WeatherChart.tsx
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ForecastData {
  date: string;
  temperature: number;
}

export const WeatherChart = () => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  useEffect(() => {
    // Mock Data: last 5 days + next 5 days
    const mockData: ForecastData[] = [
      { date: "Aug 27", temperature: 28 },
      { date: "Aug 28", temperature: 30 },
      { date: "Aug 29", temperature: 27 },
      { date: "Aug 30", temperature: 26 },
      { date: "Aug 31", temperature: 29 },
      { date: "Sep 1", temperature: 31 },
      { date: "Sep 2", temperature: 32 },
      { date: "Sep 3", temperature: 30 },
      { date: "Sep 4", temperature: 29 },
      { date: "Sep 5", temperature: 28 },
    ];
    setForecastData(mockData);
  }, []);

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold mb-4">10-Day Weather Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
