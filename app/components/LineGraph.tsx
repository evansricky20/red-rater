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

const example_data = [
    {semester: "Spring '22", rating: 90},
    {semester: "Fall '22", rating: 85},
    {semester: "Spring '23", rating: 75},
    {semester: "Fall '23", rating: 87},
    {semester: "Spring '24", rating: 80}
  ]

  const LineGraph = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart margin={{top:10, right:50, bottom:10, left:0}} data={example_data}>
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" vertical={false}/>
            <XAxis dataKey="semester" />
            <YAxis />
            <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  export default LineGraph;