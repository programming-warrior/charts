import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  ChartData,
  ChartOptions,
  Tooltip
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip
);

const PieChart: React.FC = () => {


  const data: ChartData<'doughnut'> = {
    labels: ['USA', 'UK', 'Italy', 'France', 'Germany', 'Others'],
    datasets: [
      {
        data:[36,21.6,15.51,11.5,8.8,7.32],
        backgroundColor:[
            '#99D8FF',' #47B9FF', '#0AA1FF','#0084FF','#00619A','#004B75'
        ],
        borderColor:"#081018",
        borderWidth:5,
        borderRadius:8,
      },
    ],
  };
  const options: ChartOptions<'doughnut'> = {
    plugins:{
      legend:{
        display:false
        
      },
      tooltip:{
        enabled:true
      }
    },
    cutout:"60%",
    rotation:-20*Math.PI,
  };

  return (
    <div className='m-4 w-48'>
        <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
};

export default PieChart;







