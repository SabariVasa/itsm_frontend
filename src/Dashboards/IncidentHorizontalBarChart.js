import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, defs, LinearGradient, Legend } from "recharts";

const dataset = [
  { state: "1-Critical", openIncidents: 10, count: 0 },
  { state: "5-Planning", openIncidents: 10, count: 5 },
  { state: "3-Moderate", openIncidents: 20, count: 10 },
  { state: "2-High", openIncidents: 15, count: 15 },
  { state: "4-Low", openIncidents: 20, count: 20 },
];

export default function IncidentHorizontalBarChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dataset}
          layout="vertical"
          margin={{ top: 40, right: 30, left: 30, bottom: 5 }}
        >
          {/* Define the gradient */}
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F51275" />
              <stop offset="100%" stopColor="#622098" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="state" />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="openIncidents"
            fill="url(#gradientColor)"
            label={{ position: "insideRight" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
