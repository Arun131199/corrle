// pages/Budgets.jsx
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { monthlyBudgets } from "../utils/monthlyBudgets";
import BudgetCard from "../Componants/Card/BudgetCard";

import { FcMoneyTransfer, FcBarChart, FcLineChart, FcPieChart, FcGrid } from "react-icons/fc";
import BudgetChart from "../Componants/Chart/BudgetChart";

export default function Budgets() {
    const [getBudget, setGetBudget] = useState('');
    const [error, setError] = useState('');
    const [preview, setPreview] = useState("grid");
    const budgetRef = useRef();
    const [budgetData, setBudgetData] = useState(monthlyBudgets);
    const [isVisible, setIsVisible] = useState(false);

    // Scroll animation trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const handleUpdateBudget = () => {
        const value = Number(budgetRef.current.value);
        if (!value || value <= 0) {
            setError("Please enter a valid amount greater than 0.");
            return;
        }
        setError("");
        setGetBudget(value.toLocaleString());

        const newBudget = {
            month: new Date().toLocaleString('default', { month: 'long' }),
            budget: value
        };
        setBudgetData(prev => [newBudget, ...prev.slice(0, 5)]);

        budgetRef.current.value = "";
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const chartTypes = [
        { id: 'bar', name: 'Bar Chart', icon: <FcBarChart size={20} /> },
        { id: 'line', name: 'Line Chart', icon: <FcLineChart size={20} /> },
        { id: 'doughnut', name: 'Pie Chart', icon: <FcPieChart size={20} /> },
    ];

    const [selectedChart, setSelectedChart] = useState('bar');

    return (
        <motion.div
            className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Add Budget Section */}
            <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Budget Management</h1>
                    <p className="text-gray-600 text-lg">Set and track your monthly spending limits</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-12">
                    <motion.div
                        key={getBudget}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex flex-col border border-gray-200 p-8 rounded-2xl shadow-lg bg-gradient-to-br from-purple-600 to-violet-800 text-white"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <FcMoneyTransfer size={28} />
                            </div>
                            <div>
                                <p className="font-semibold text-xl">Monthly Budget</p>
                                <p className="text-purple-200 text-sm">Current spending limit</p>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-purple-200 text-lg mb-2">Available Budget</p>
                                <div className="text-5xl font-bold mb-2">
                                    ₹ {getBudget || "0"}
                                </div>
                                <p className="text-purple-200">for this month</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Set New Budget</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Budget Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                        ₹
                                    </span>
                                    <input
                                        type="number"
                                        ref={budgetRef}
                                        placeholder="Enter amount (e.g., 50000)"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-lg transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200"
                                    >
                                        ⚠️ {error}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <motion.button
                                onClick={handleUpdateBudget}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-purple-600 to-violet-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-violet-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Update Budget
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Previous Budgets Section */}
            <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Budget History & Analytics</h2>

                        <div className="flex flex-wrap gap-3">
                            {/* View Toggle Buttons */}
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setPreview("grid")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${preview === "grid"
                                            ? "bg-white text-purple-600 shadow-sm"
                                            : "text-gray-600 hover:text-purple-600"
                                        }`}
                                >
                                    <FcGrid size={18} />
                                    Grid
                                </button>
                                <button
                                    onClick={() => setPreview("chart")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${preview === "chart"
                                            ? "bg-white text-purple-600 shadow-sm"
                                            : "text-gray-600 hover:text-purple-600"
                                        }`}
                                >
                                    <FcBarChart size={18} />
                                    Charts
                                </button>
                            </div>

                            {/* Chart Type Selector */}
                            {preview === "chart" && (
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    {chartTypes.map((chart) => (
                                        <button
                                            key={chart.id}
                                            onClick={() => setSelectedChart(chart.id)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${selectedChart === chart.id
                                                    ? "bg-white text-purple-600 shadow-sm"
                                                    : "text-gray-600 hover:text-purple-600"
                                                }`}
                                        >
                                            {chart.icon}
                                            {chart.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {preview === "grid" ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BudgetCard
                                    data={budgetData}
                                    icon={<FcMoneyTransfer size={24} />}
                                    text={"Budget for"}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chart"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <BudgetChart
                                    data={budgetData}
                                    type={selectedChart}
                                    title={`Monthly Budget ${selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)}`}
                                    height={400}
                                    showLegend={true}
                                    animation={true}
                                />

                                {/* Additional Stats */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-r from-purple-50 to-violet-100 p-4 rounded-xl border border-purple-200">
                                        <p className="text-purple-600 text-sm font-medium">Total Budget</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            ₹{budgetData.reduce((sum, item) => sum + item.budget, 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-4 rounded-xl border border-blue-200">
                                        <p className="text-blue-600 text-sm font-medium">Average Monthly</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            ₹{Math.round(budgetData.reduce((sum, item) => sum + item.budget, 0) / budgetData.length).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                                        <p className="text-green-600 text-sm font-medium">Months Tracked</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {budgetData.length}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}