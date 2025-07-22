import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Updated to accept dynamic data as props
export const MealDistributionChart = ({ data }) => {
  const theme = useTheme();

  // Helper function to get the short name of a day
  const getDayShortName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  // Generate labels for the last 7 days
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(getDayShortName(date));
  }

  const chartData = {
    labels: labels,
    datasets:
      Array.isArray(data.datasets) && data.datasets.length > 0
        ? data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data || [],
          }))
        : [],
  };

  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      }}
      className="p-6 rounded-lg"
    >
      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: theme.palette.text.primary }}
      >
        Meal Distribution
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: theme.palette.text.secondary }}
      >
        Weekly meal service trends
      </p>
      <Line options={options} data={chartData} />
    </div>
  );
};
