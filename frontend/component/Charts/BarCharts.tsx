import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarCharts = (props: any) => {
  const { data, datakey } = props;
  console.log(data);
  return (
    <>
      <ResponsiveContainer width="99%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={[0, "dataMax"]}
            dataKey={(datakey: any) => parseInt(datakey.daily)}
          />
          <Tooltip />
          <Legend
            // verticalAlign="top"
            // layout="vertical"
            // align="right"
            wrapperStyle={
              {
                // position: "relative",
                // marginTop: "10px",
                // padding: "auto",
              }
            }
          />
          <Bar dataKey={datakey} fill="#f16623" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarCharts;
