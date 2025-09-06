import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", temp: 27 },
  { day: "Tue", temp: 26 },
  { day: "Wed", temp: 29 },
  { day: "Thu", temp: 30 },
  { day: "Fri", temp: 28 },
  { day: "Sat", temp: 31 },
  { day: "Sun", temp: 32 },
  { day: "Mon+", temp: 33 },
  { day: "Tue+", temp: 31 },
  { day: "Wed+", temp: 29 },
];

export default function WeatherChart() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-8 shadow-lg">
      <h2 className="text-xl font-bold text-gray-200 mb-4 text-center">
        📈 10-Day Weather Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 6, fill: "#f43f5e" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
