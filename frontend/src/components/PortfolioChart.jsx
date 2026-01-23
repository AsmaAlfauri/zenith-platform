import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PortfolioChart = ({ assets, darkMode }) => {
  const chartData = assets.map(asset => ({
    name: asset.assetId,
    value: asset.value
  }));

  const axisStyle = { 
    fill: darkMode ? "#e5e7eb" : "#1f2937", // light gray for dark mode, dark gray for light
    fontSize: 12 
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-colors duration-300 ">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Asset Values</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip 
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#fff", borderColor: darkMode ? "#374151" : "#ccc", color: darkMode ? "#fff" : "#111" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: darkMode ? "#fff" : "#111" }} />
          <Line type="monotone" dataKey="value" stroke={darkMode ? "#60a5fa" : "#3b82f6"} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
