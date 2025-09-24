'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  FaUsers,
  FaChartLine,
  FaShoppingCart,
  FaDollarSign,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaDownload,
  FaSyncAlt
} from 'react-icons/fa';
import { useLanguage } from '../lib/useLanguage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data for demonstration
const generateMockData = () => {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }).reverse();

  return {
    dailyVisitors: days.map(() => Math.floor(Math.random() * 500) + 100),
    dailyRevenue: days.map(() => Math.floor(Math.random() * 2000) + 500),
    dailyOrders: days.map(() => Math.floor(Math.random() * 50) + 10),
    trafficSources: {
      organic: 45,
      direct: 25,
      social: 15,
      referral: 10,
      email: 5
    },
    deviceTypes: {
      desktop: 60,
      mobile: 35,
      tablet: 5
    },
    topPages: [
      { page: '/home', views: 15430, bounce: 45 },
      { page: '/products', views: 12890, bounce: 38 },
      { page: '/about', views: 8765, bounce: 52 },
      { page: '/contact', views: 6543, bounce: 41 },
      { page: '/blog', views: 5432, bounce: 35 }
    ],
    realtimeUsers: Math.floor(Math.random() * 150) + 50,
    totalUsers: 25847,
    newUsers: 3421,
    sessions: 38569,
    pageviews: 156789,
    avgSessionDuration: '2m 34s',
    bounceRate: 42.5,
    conversionRate: 3.2,
    revenue: '$45,892',
    orders: 1247,
    avgOrderValue: '$36.82'
  };
};

export default function AnalyticsDashboard() {
  const { language } = useLanguage();
  const [data, setData] = useState(generateMockData());
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        realtimeUsers: Math.floor(Math.random() * 150) + 50
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Chart configurations
  const visitorsChartData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 29 + i);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: language === 'en' ? 'Daily Visitors' : 'Araw-araw na Bisita',
        data: data.dailyVisitors,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueChartData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 29 + i);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: language === 'en' ? 'Daily Revenue' : 'Araw-araw na Kita',
        data: data.dailyRevenue,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const trafficSourcesData = {
    labels: [
      language === 'en' ? 'Organic Search' : 'Organic Search',
      language === 'en' ? 'Direct' : 'Direct',
      language === 'en' ? 'Social Media' : 'Social Media',
      language === 'en' ? 'Referral' : 'Referral',
      language === 'en' ? 'Email' : 'Email'
    ],
    datasets: [
      {
        data: Object.values(data.trafficSources),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
        ],
        borderWidth: 0,
      },
    ],
  };

  const deviceTypesData = {
    labels: [
      language === 'en' ? 'Desktop' : 'Desktop',
      language === 'en' ? 'Mobile' : 'Mobile',
      language === 'en' ? 'Tablet' : 'Tablet'
    ],
    datasets: [
      {
        data: Object.values(data.deviceTypes),
        backgroundColor: ['#6366F1', '#EC4899', '#F97316'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(156, 163, 175, 0.8)',
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-white">
                {language === 'en' ? 'Analytics Dashboard' : 'Analytics Dashboard'}
              </h1>
              <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{language === 'en' ? 'Live' : 'Live'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">{language === 'en' ? 'Last 7 Days' : 'Huling 7 Araw'}</option>
                <option value="30d">{language === 'en' ? 'Last 30 Days' : 'Huling 30 Araw'}</option>
                <option value="90d">{language === 'en' ? 'Last 90 Days' : 'Huling 90 Araw'}</option>
              </select>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300 disabled:opacity-50"
              >
                <FaSyncAlt className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{language === 'en' ? 'Refresh' : 'I-refresh'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: language === 'en' ? 'Total Users' : 'Kabuuang Users',
                value: data.totalUsers.toLocaleString(),
                change: '+12.5%',
                trend: 'up',
                icon: FaUsers,
                color: 'blue'
              },
              {
                title: language === 'en' ? 'Page Views' : 'Page Views',
                value: data.pageviews.toLocaleString(),
                change: '+8.2%',
                trend: 'up',
                icon: FaEye,
                color: 'green'
              },
              {
                title: language === 'en' ? 'Revenue' : 'Kita',
                value: data.revenue,
                change: '+15.3%',
                trend: 'up',
                icon: FaDollarSign,
                color: 'yellow'
              },
              {
                title: language === 'en' ? 'Conversion Rate' : 'Conversion Rate',
                value: `${data.conversionRate}%`,
                change: '-2.1%',
                trend: 'down',
                icon: FaChartLine,
                color: 'purple'
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                    <div className={`flex items-center mt-2 text-sm ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.trend === 'up' ? (
                        <FaArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <FaArrowDown className="w-3 h-3 mr-1" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    metric.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    metric.color === 'green' ? 'bg-green-500/20 text-green-400' :
                    metric.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Real-time Stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {language === 'en' ? 'Real-time Overview' : 'Real-time Overview'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {data.realtimeUsers}
                </div>
                <div className="text-gray-400">
                  {language === 'en' ? 'Active Users' : 'Active na Users'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {data.avgSessionDuration}
                </div>
                <div className="text-gray-400">
                  {language === 'en' ? 'Avg. Session Duration' : 'Avg. Session Duration'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {data.bounceRate}%
                </div>
                <div className="text-gray-400">
                  {language === 'en' ? 'Bounce Rate' : 'Bounce Rate'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitors Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'en' ? 'Visitors Over Time' : 'Mga Bisita sa Paglipas ng Panahon'}
              </h3>
              <div className="h-64">
                <Line data={visitorsChartData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'en' ? 'Daily Revenue' : 'Araw-araw na Kita'}
              </h3>
              <div className="h-64">
                <Bar data={revenueChartData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Traffic Sources */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'en' ? 'Traffic Sources' : 'Mga Source ng Traffic'}
              </h3>
              <div className="h-64">
                <Doughnut data={trafficSourcesData} options={doughnutOptions} />
              </div>
            </motion.div>

            {/* Device Types */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'en' ? 'Device Types' : 'Mga Uri ng Device'}
              </h3>
              <div className="h-64">
                <Pie data={deviceTypesData} options={doughnutOptions} />
              </div>
            </motion.div>
          </div>

          {/* Top Pages Table */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {language === 'en' ? 'Top Pages' : 'Nangungunang Pahina'}
              </h3>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300">
                <FaDownload className="w-4 h-4" />
                <span>{language === 'en' ? 'Export' : 'I-export'}</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 pb-4 font-medium">
                      {language === 'en' ? 'Page' : 'Pahina'}
                    </th>
                    <th className="text-right text-gray-400 pb-4 font-medium">
                      {language === 'en' ? 'Views' : 'Views'}
                    </th>
                    <th className="text-right text-gray-400 pb-4 font-medium">
                      {language === 'en' ? 'Bounce Rate' : 'Bounce Rate'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPages.map((page, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200">
                      <td className="py-4 text-white font-medium">{page.page}</td>
                      <td className="py-4 text-right text-gray-300">{page.views.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className={`${
                          page.bounce < 40 ? 'text-green-400' :
                          page.bounce < 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {page.bounce}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <FaShoppingCart className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{data.orders}</div>
              <div className="text-gray-400">{language === 'en' ? 'Total Orders' : 'Kabuuang Orders'}</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <FaDollarSign className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{data.avgOrderValue}</div>
              <div className="text-gray-400">{language === 'en' ? 'Avg Order Value' : 'Avg Order Value'}</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <FaUsers className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{data.newUsers.toLocaleString()}</div>
              <div className="text-gray-400">{language === 'en' ? 'New Users' : 'Bagong Users'}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}