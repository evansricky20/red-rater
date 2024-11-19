"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface LineGraphProps {
  data: { term: string; rating: number }[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  // Custom tick formatter to ensure the first and last term are always shown
  const formatTick = (term: string, index: number) => {
    if (index === 0 || index === data.length - 1) {
      return term;
    }
    return "";
  };

  return (
    <ResponsiveContainer aspect={2.5}>
      <LineChart
        margin={{ top: 10, right: 50, bottom: 0, left: 0 }}
        data={data}
      >
        <Line
          type="monotone"
          dataKey="rating"
          stroke="#f6f6f6"
          strokeWidth={2}
        />
        <CartesianGrid stroke="#000000" vertical={false} strokeWidth={2} />
        <XAxis
          dataKey="term"
          tickFormatter={formatTick}
          interval="preserveStartEnd"
          stroke="#000000"
          strokeWidth={2}
        />
        <YAxis stroke="#000000" strokeWidth={2} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#E90802",
            borderColor: "#000000",
            borderWidth: "2px",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
