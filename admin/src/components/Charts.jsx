import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ stats }) => {
  // Sample data - in real app, this would come from API
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: [65, 89, 80, 81, 56, 55, 40, 70, 85, 95, 88, 100],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [300, 250, 180, 220, 150, 200],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const orderStatusData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [12, 19, 8, 25, 5],
        backgroundColor: [
          'rgba(251, 146, 60, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(251, 146, 60, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Revenue & Orders Line Chart */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold mb-6 text-white">Revenue & Orders Trend</h3>
        <div className="h-80">
          <Line data={monthlyData} options={chartOptions} />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category Bar Chart */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold mb-6 text-white">Sales by Category</h3>
          <div className="h-80">
            <Bar data={categoryData} options={chartOptions} />
          </div>
        </div>

        {/* Order Status Doughnut Chart */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold mb-6 text-white">Order Status Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={orderStatusData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg">
          <div className="text-white">
            <p className="text-sm opacity-90">Monthly Revenue</p>
            <p className="text-2xl font-bold">$45,000</p>
            <p className="text-xs opacity-75">+12% from last month</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg">
          <div className="text-white">
            <p className="text-sm opacity-90">Total Orders</p>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-xs opacity-75">+8% from last month</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg">
          <div className="text-white">
            <p className="text-sm opacity-90">Avg. Order Value</p>
            <p className="text-2xl font-bold">$89.50</p>
            <p className="text-xs opacity-75">+5% from last month</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 rounded-lg">
          <div className="text-white">
            <p className="text-sm opacity-90">Conversion Rate</p>
            <p className="text-2xl font-bold">3.2%</p>
            <p className="text-xs opacity-75">+0.5% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
