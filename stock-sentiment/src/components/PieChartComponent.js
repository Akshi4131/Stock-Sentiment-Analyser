// src/components/PieChartComponent.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  'positive': '#00FFA3',         // Neon Mint Green
  'neutral': '#00E5FF',          // Neon Cyan
  'negative': '#FF2A55'          // Neon Pink/Red
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: `1px solid ${data.payload.fill || '#e2e8f0'}`,
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px ${data.payload.fill}30`,
        fontFamily: 'Outfit, sans-serif'
      }}>
        <p style={{ margin: 0, color: '#64748b', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          {data.name}
        </p>
        <p style={{ margin: '5px 0 0 0', color: data.payload.fill, fontSize: '20px', fontWeight: '800' }}>
          {data.value}
        </p>
      </div>
    );
  }
  return null;
};

function PieChartComponent({ sentimentCounts }) {
  const pieData = Object.entries(sentimentCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            stroke="rgba(15, 23, 42, 1)"
            strokeWidth={3}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#999'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px', fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: '600', color: '#475569' }} 
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
