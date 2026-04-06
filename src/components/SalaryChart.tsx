// src/components/SalaryChart.tsx
import React from"react";
import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer,
} from"recharts";

const data = [
 { year:"2020", salary: 400000 },
 { year:"2021", salary: 450000 },
 { year:"2022", salary: 500000 },
 { year:"2023", salary: 600000 },
 { year:"2024", salary: 700000 },
 { year:"2025", salary: 850000 },
];

const SalaryChart: React.FC = () => {
 return (
 <div style={{ width:"100%", height: 300 }}>
 <ResponsiveContainer>
 <LineChart data={data}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="year" />
 <YAxis />
 <Tooltip />
 <Legend />
 <Line type="monotone" dataKey="salary" stroke="#8884d8" strokeWidth={2} />
 </LineChart>
 </ResponsiveContainer>
 </div>
 );
};

export default SalaryChart;

