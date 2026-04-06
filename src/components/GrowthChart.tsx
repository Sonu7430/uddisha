// src/components/GrowthChart.tsx
import React from"react";
import {
 PieChart,
 Pie,
 Cell,
 Tooltip,
 ResponsiveContainer,
} from"recharts";

const data = [
 { name:"Healthcare", value: 40 },
 { name:"Tech", value: 30 },
 { name:"Finance", value: 20 },
 { name:"Others", value: 10 },
];

const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042"];

const GrowthChart: React.FC = () => {
 return (
 <div style={{ width:"100%", height: 300 }}>
 <ResponsiveContainer>
 <PieChart>
 <Pie
 data={data}
 cx="50%"
 cy="50%"
 outerRadius={100}
 dataKey="value"
 label
 >
 {data.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
 ))}
 </Pie>
 <Tooltip />
 </PieChart>
 </ResponsiveContainer>
 </div>
 );
};

export default GrowthChart;
