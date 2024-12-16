import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, defs, linearGradient, stop } from "recharts";

const dataset = [
  { state: "1 - Critical", openIncidents: 10 },
  { state: "5 - Planning", openIncidents: 15 },
  { state: "3 - Moderate", openIncidents: 20 },
  { state: "2 - High", openIncidents: 5 },
  { state: "4 - Low", openIncidents: 0 },
];

export default function IncidentBarChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={dataset} margin={{ top: 40, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F51275" />
            <stop offset="100%" stopColor="#622098" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="openIncidents" fill="url(#gradientColor)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
