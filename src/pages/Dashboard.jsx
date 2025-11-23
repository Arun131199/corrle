import { MdContactEmergency, MdSavings, MdPayments, MdAccountBalance, MdTrendingUp, MdSecurity } from "react-icons/md";
import { FaPiggyBank, FaHandHoldingUsd, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
} from "chart.js";

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController
);

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const zoomIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

const fadeLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
};

const fadeRight = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
};

export default function Dashboard() {
    const quickAccessItems = [
        {
            icon: <MdContactEmergency className="text-purple-600" size={28} />,
            title: "Emergency Fund",
            description: "Secure your future",
            bgGradient: "from-purple-50 to-pink-50",
            borderColor: "border-purple-200",
            hoverEffect: "hover:shadow-purple-200"
        },
        {
            icon: <MdSavings className="text-blue-600" size={28} />,
            title: "Savings",
            description: "Grow your money",
            bgGradient: "from-blue-50 to-cyan-50",
            borderColor: "border-blue-200",
            hoverEffect: "hover:shadow-blue-200"
        },
        {
            icon: <FaPiggyBank className="text-green-600" size={28} />,
            title: "Investments",
            description: "Smart investing",
            bgGradient: "from-green-50 to-emerald-50",
            borderColor: "border-green-200",
            hoverEffect: "hover:shadow-green-200"
        },
        {
            icon: <GiPayMoney className="text-red-600" size={28} />,
            title: "Payments",
            description: "Quick transfers",
            bgGradient: "from-red-50 to-pink-50",
            borderColor: "border-red-200",
            hoverEffect: "hover:shadow-red-200"
        },
        {
            icon: <FaChartLine className="text-orange-600" size={28} />,
            title: "Analytics",
            description: "Track growth",
            bgGradient: "from-orange-50 to-amber-50",
            borderColor: "border-orange-200",
            hoverEffect: "hover:shadow-orange-200"
        },
        {
            icon: <FaShieldAlt className="text-indigo-600" size={28} />,
            title: "Insurance",
            description: "Stay protected",
            bgGradient: "from-indigo-50 to-violet-50",
            borderColor: "border-indigo-200",
            hoverEffect: "hover:shadow-indigo-200"
        }
    ];

    const chartDatas = [
        {
            date: '10/11/2025',
            amount: "500"
        },
        {
            date: '11/11/2025',
            amount: "200"
        },
        {
            date: '11/11/2025',
            amount: "103"
        },
        {
            date: '12/11/2025',
            amount: "1500"
        },
        {
            date: '13/11/2025',
            amount: "2381"
        },
        {
            date: '14/11/2025',
            amount: "116"
        },
        {
            date: '15/11/2025',
            amount: "11.78"
        }
    ];

    const savingsData = [
        {
            date: '10/11/2025',
            amount: "1200"
        },
        {
            date: '11/11/2025',
            amount: "800"
        },
        {
            date: '12/11/2025',
            amount: "1500"
        },
        {
            date: '13/11/2025',
            amount: "900"
        },
        {
            date: '14/11/2025',
            amount: "1300"
        },
        {
            date: '15/11/2025',
            amount: "1100"
        }
    ];

    const [chartData] = useState(chartDatas);
    const [savingChartData] = useState(savingsData);

    const spendingChartConfig = {
        labels: chartData.map(item => item.date),
        datasets: [
            {
                label: "Amount Spent",
                data: chartData.map(item => item.amount),
                borderColor: "rgba(239, 68, 68, 1)",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "rgba(239, 68, 68, 1)",
            }
        ]
    };

    const savingsChartConfig = {
        labels: savingChartData.map(item => item.date),
        datasets: [
            {
                label: "Amount Saved",
                data: savingChartData.map(item => item.amount),
                backgroundColor: "rgba(34, 197, 94, 0.8)",
                borderColor: "rgba(34, 197, 94, 1)",
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Welcome Section */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back! 👋
                </h1>
                <p className="text-gray-600">
                    Here's your financial overview for today
                </p>
            </motion.div>


            {/* Quick Access Section */}
            <motion.div
                className="mb-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <motion.h2
                        variants={fadeUp}
                        transition={{ delay: 0.1 }}
                        className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                        Quick Access
                    </motion.h2>

                    <motion.button
                        variants={fadeUp}
                        transition={{ delay: 0.15 }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                        View All →
                    </motion.button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {quickAccessItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={zoomIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
                            className={`bg-gradient-to-br ${item.bgGradient} border ${item.borderColor} p-4 rounded-2xl shadow-lg hover:shadow-xl ${item.hoverEffect} transition-all duration-300 transform hover:scale-105 cursor-pointer group h-full flex flex-col`}
                        >
                            <div className="flex flex-col items-center text-center space-y-3 flex-1">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 mb-2">
                                    {item.icon}
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <p className="font-semibold text-gray-800 text-sm mb-1 leading-tight">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500 leading-tight">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>


            {/* Stats Overview Section */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {[
                    {
                        title: "Total Balance",
                        amount: "$12,458",
                        color: "green",
                        icon: <MdAccountBalance className="text-green-600" size={24} />,
                        change: "↑ 12% from last month",
                        changeColor: "text-green-600"
                    },
                    {
                        title: "Monthly Savings",
                        amount: "$1,250",
                        color: "blue",
                        icon: <FaPiggyBank className="text-blue-600" size={24} />,
                        change: "↑ 8% from last month",
                        changeColor: "text-blue-600"
                    },
                    {
                        title: "Investments",
                        amount: "$8,742",
                        color: "purple",
                        icon: <MdTrendingUp className="text-purple-600" size={24} />,
                        change: "↑ 15% from last month",
                        changeColor: "text-purple-600"
                    },
                    {
                        title: "Emergency Fund",
                        amount: "$3,500",
                        color: "orange",
                        icon: <MdSecurity className="text-orange-600" size={24} />,
                        change: "Fully funded ✓",
                        changeColor: "text-orange-600"
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        transition={{ delay: index * 0.15, duration: 0.6 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                                <p className="text-2xl font-bold text-gray-800">{item.amount}</p>
                            </div>
                            <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center`}>
                                {item.icon}
                            </div>
                        </div>
                        <p className={`text-xs mt-3 ${item.changeColor}`}>{item.change}</p>
                    </motion.div>
                ))}
            </motion.div>


            {/* Charts Section - Side by Side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

                {/* Spending Chart */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Money Spending</h3>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
                            View Details
                        </button>
                    </div>

                    <div className="h-80">
                        <Line
                            data={spendingChartConfig}
                            options={{
                                ...chartOptions,
                                plugins: {
                                    ...chartOptions.plugins,
                                    title: {
                                        display: true,
                                        text: "Daily Spending Trend",
                                        color: "#ef4444",
                                        font: { size: 16, weight: "bold" }
                                    }
                                }
                            }}
                        />
                    </div>
                </motion.div>

                {/* Savings Chart */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Monthly Savings</h3>
                        <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                            View Details
                        </button>
                    </div>

                    <div className="h-80">
                        <Bar
                            data={savingsChartConfig}
                            options={{
                                ...chartOptions,
                                plugins: {
                                    ...chartOptions.plugins,
                                    title: {
                                        display: true,
                                        text: "Monthly Savings Overview",
                                        color: "#22c55e",
                                        font: { size: 16, weight: "bold" }
                                    }
                                }
                            }}
                        />
                    </div>
                </motion.div>

            </div>


            {/* Recent Activity Section */}
            <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                        See All Activity
                    </button>
                </div>

                <div className="space-y-3">
                    {[
                        { type: "Deposit", amount: "+$1,200", date: "2 hours ago", icon: <GiReceiveMoney className="text-green-600" /> },
                        { type: "Investment", amount: "-$500", date: "5 hours ago", icon: <MdTrendingUp className="text-blue-600" /> },
                        { type: "Transfer", amount: "-$150", date: "1 day ago", icon: <FaHandHoldingUsd className="text-purple-600" /> },
                        { type: "Savings", amount: "+$300", date: "2 days ago", icon: <FaPiggyBank className="text-orange-600" /> }
                    ].map((activity, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.12 }}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 border border-gray-100"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    {activity.icon}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{activity.type}</p>
                                    <p className="text-sm text-gray-500">{activity.date}</p>
                                </div>
                            </div>

                            <p
                                className={`font-semibold text-lg ${activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {activity.amount}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}