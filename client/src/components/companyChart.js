import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const CompanyChart = (props) => (
  <div>
    <LineChart width={600} height={300} data={props.values}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{r: 8}} />            
    </LineChart>
  </div>
);

export default CompanyChart;