"use client";

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

interface LineGraphProps {
  data: { term: string; rating: number }[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  // Custom tick formatter to ensure the first and last term are always shown
  const formatTick = (term: string, index: number) => {
    if (index === 0 || index === data.length - 1) {
      return term;
    }
    return '';
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart margin={{ top: 10, right: 50, bottom: 10, left: 0 }} data={data}>
        <Line type="monotone" dataKey="rating" stroke="#dc2626" />
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis dataKey="term" tickFormatter={formatTick} interval="preserveStartEnd" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;