import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartData,
  ChartOptions,
  Filler,
  
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const LineChart: React.FC = () => {

  const data: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','august','september','october','november','december'],
    datasets: [
      {
        fill: true,
        borderColor: '#328BFF',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75,192,192,1)',
        hoverBorderColor: 'rgba(75,192,192,0)',
        data: [30, 59, 29, 81, 56, 100,40,50,41,65,29,73],
        tension:0.4,
        pointRadius:0,
        backgroundColor:(context)=>{
          if(!context.chart.chartArea) return "";
          const {ctx,chartArea:{top,bottom}}=context.chart;
          const gradientBg=ctx.createLinearGradient(0,top,0,bottom);
          gradientBg.addColorStop(0,'rgba(50,139,255,0.8)');
          gradientBg.addColorStop(0.5,'rgba(50,139,255,0.4)');
          gradientBg.addColorStop(1,'rgba(50,139,255,0.1)');
          return gradientBg;
        },
      },


    ],
  };
  const options: ChartOptions<'line'> = {
    plugins:{
    
      legend:{
        // display:false
      }
    },
    scales: {
      
      y: {
        display:false,
        beginAtZero: false,
        grid:{
          display:false,
        },
        ticks:{
          display:false,
        },

      },
      x:{
        display:false,
        grid:{
          display:false,
          
        },
        ticks:{
            display:false
        },
      },

    },
  };
  const lineMarker={
    id:"lineMarker",
    beforeDatasetsDraw:(chart:any)=>{
      const {ctx,chartArea:{top,bottom},scales:{x}}=chart;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle="white";
      ctx.lineWidth=1;
      ctx.moveTo(x.getPixelForValue(2),top)
      ctx.lineTo(x.getPixelForValue(2),bottom);
      ctx.stroke();
    }
  }

  return (
    <div className='m-4 w-48'>
      <Line  data={data} options={options}  />
    </div>
  );
};

export default LineChart;



