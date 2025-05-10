import { startTransition, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const dummyData = [
  { label: "Jan", users: 400, comments: 240 },
  { label: "Feb", users: 300, comments: 139 },
  { label: "Mar", users: 200, comments: 980 },
  { label: "Apr", users: 278, comments: 390 },
  { label: "May", users: 189, comments: 480 },
  { label: "Jun", users: 356, comments: 300 },
  { label: "Jul", users: 410, comments: 210 },
  { label: "Aug", users: 470, comments: 330 },
  { label: "Sep", users: 390, comments: 290 },
  { label: "Oct", users: 450, comments: 370 },
  { label: "Nov", users: 320, comments: 190 },
  { label: "Dec", users: 510, comments: 420 },
];

interface ChartProps {
  dataKey: "users" | "comments";
}

const Chart = ({ dataKey }: ChartProps) => {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const { t } = useTranslation();

  const handleChartTypeChange = (value: "bar" | "line") => {
    startTransition(() => {
      setChartType(value);
    });
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300} minWidth={550}>
            <BarChart
              data={dummyData}
              margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={"#667185" + "33"} />
              <XAxis dataKey="label" stroke={"#667185"} />
              <YAxis stroke={"#667185"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#667185" }} />
              <Bar dataKey={dataKey} fill="#ffb616" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300} minWidth={550}>
            <LineChart
              data={dummyData}
              margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={"#667185" + "33"} />
              <XAxis dataKey="label" stroke={"#667185"} />
              <YAxis stroke={"#667185"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#667185",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#667185" }} />
              <Line type="monotone" dataKey={dataKey} stroke="#ffb616" />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark dark:bg-light rounded-xl shadow p-4 w-full max-w-full overflow-x-auto">
      <div className="flex  justify-between items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold capitalize dark:text-[#667185] text-white">
          {t(dataKey)} {t("chart")}
        </h2>
        <Select
          value={chartType}
          onChange={handleChartTypeChange}
          className="w-24"
        >
          <Option value="bar">Bar</Option>
          <Option value="line">Line</Option>
        </Select>
      </div>
      <div className="w-full min-w-full overflow-x-auto">{renderChart()}</div>
    </div>
  );
};

export default Chart;
