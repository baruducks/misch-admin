import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
  Area,
  AreaChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineCharts = (props: any) => {
  const { data, datakey } = props;
  console.log(data);

  return (
    <>
      <ResponsiveContainer width="99%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64b6ec" stopOpacity={0.8} />
              <stop offset="75%" stopColor="#64b6ec" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={[0, "dataMax"]}
            // dataKey={(datakey: any) => parseInt(datakey.daily)}
          />
          <Tooltip />
          <Legend />
          <Area
            dataKey={datakey}
            stroke="#64b6ec"
            fill="url(#color)"
            type="monotone"
            animationEasing="linear"
            activeDot={{ r: 6 }}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineCharts;
