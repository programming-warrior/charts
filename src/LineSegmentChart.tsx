import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LineSegmentChart = () => {
  const phases = {
    sourcing: [0, 4], 
    screening: [5, 9],
    assessment: [10, 16],
    preInterview: [17, 18],
    interview: [19, 20],
};

  const segmentBoundaries = [5, 10, 17];

  const data = {
    labels: '01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20'.split(','),
    datasets: [
      {
        fill: true,
        borderColor: '#328BFF',
        tension: 0.4,
        borderWidth: 2,
        backgroundColor: 'rgba(50, 139, 255, 0.2)',
        data: [250, 240, 230, 220, 175, 160, 150, 130, 110, 90, 88, 80, 79, 70, 55, 45, 30, 20, 10, 0],
        pointRadius: 0,
        segment: {
          borderColor: (ctx:any) => getSegmentColor(ctx.p0DataIndex, phases),
          backgroundColor: (ctx:any) => getSegmentBgColor(ctx.p0DataIndex, phases),
        },
      },
    ],
  };

  const options:any= {
    plugins: {
      legend: {
        display: false,
      },
      verticalLinePlugin: {
        segmentBoundaries: segmentBoundaries
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
            autoSkip: false, 
            callback:function(value:any,index:number):any {
                return index % 2 !== 0 ? data.labels[index] : '';
              }
          },
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const getSegmentColor = (index:any, phases:any) => {
    if (index <= phases.sourcing[1]) return '#FF6384'; 
    if (index >= phases.screening[0] && index <= phases.screening[1]) return '#36A2EB'; // Screening
    if (index >= phases.assessment[0] && index <= phases.assessment[1]) return '#FFCE56'; // Assessment
    if (index >= phases.preInterview[0] && index <= phases.preInterview[1]) return '#4BC0C0'; // Pre-Interview
    if (index >= phases.interview[0] && index <= phases.interview[1]) return '#9966FF'; // Interview
    return '#328BFF'; 

    };

  const getSegmentBgColor = (index:any, phases:any) => {
    if (index <= phases.sourcing[1]) return 'rgba(255, 99, 132, 0.2)'; // Sourcing
    if (index >= phases.screening[0] && index <= phases.screening[1]) return 'rgba(54, 162, 235, 0.2)'; // Screening
    if (index >= phases.assessment[0] && index <= phases.assessment[1]) return 'rgba(255, 206, 86, 0.2)'; // Assessment
    if (index >= phases.preInterview[0] && index <= phases.preInterview[1]) return 'rgba(75, 192, 192, 0.2)'; // Pre-Interview
    if (index >= phases.interview[0] && index <= phases.interview[1]) return 'rgba(153, 102, 255, 0.2)'; // Interview
    return 'rgba(50, 139, 255, 0.2)'; 
  };


  const verticalLinePlugin = {
    id: 'verticalLinePlugin',
    beforeDraw: (chart:any,args:any, options:any) => {
      const { ctx, chartArea: { left, right, top, bottom }, scales: { x } } = chart;
      options.segmentBoundaries.forEach((boundary:any) => {
        const xPos = x.getPixelForValue(boundary);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPos, top);
        ctx.lineTo(xPos, bottom);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#D3D3D3'; 
        ctx.stroke();
        ctx.restore();
      });
    }
  };


  return (
    <div className='m-4 w-96'>
      <Line data={data} options={options}  plugins={[verticalLinePlugin]}/>
    </div>
  );
};

export default LineSegmentChart;
