// src/components/BarChartComponent.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  'positive': '#00FFA3',         // Neon Mint Green
  'neutral': '#00E5FF',          // Neon Cyan
  'negative': '#FF2A55'          // Neon Pink/Red
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        fontFamily: 'Outfit, sans-serif'
      }}>
        <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Date: <span style={{ color: '#0f172a' }}>{label}</span>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#475569', fontSize: '13px', textTransform: 'capitalize', fontWeight: '600', paddingRight: '20px' }}>
                {entry.name}
              </span>
              <span style={{ color: entry.fill, fontSize: '15px', fontWeight: '800' }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

function BarChartComponent({ trendData }) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#cbd5e1" 
            tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Outfit, sans-serif', fontWeight: 500 }} 
            tickLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#cbd5e1" 
            tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Outfit, sans-serif', fontWeight: 500 }} 
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px', fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 600, color: '#475569' }} 
            iconType="circle"
          />
          <Bar dataKey="positive" stackId="a" fill={COLORS['positive']} radius={[0, 0, 0, 0]} />
          <Bar dataKey="neutral" stackId="a" fill={COLORS['neutral']} radius={[0, 0, 0, 0]} />
          <Bar dataKey="negative" stackId="a" fill={COLORS['negative']} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
