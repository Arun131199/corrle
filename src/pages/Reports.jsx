import axios from "axios";
import { useEffect, useState } from "react"
import BudgetChart from "../Componants/Chart/BudgetChart";
import { motion } from "framer-motion";
import DownloadDropdown from "../Componants/CustomDropdown/DownloadDropdown";

export default function Reports() {
    const [getData, setGetData] = useState([]);
    const [getError, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleFetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/expenses')
            setGetData(response.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchData();
    }, [])

    // Calculate total expenses
    const totalExpenses = getData.reduce((sum, item) => sum + (item.amount || 0), 0);
    const averageExpense = getData.length > 0 ? totalExpenses / getData.length : 0;

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-br from-[#631c9c] to-[#7623be] bg-clip-text text-transparent mb-2">
                        Expense Reports
                    </h1>

                    <p className="text-gray-600">Analyze your spending patterns and trends</p>
                </motion.div>

                {/* Stats Overview */}
                <div >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">₹{totalExpenses.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{getData.length}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Average Expense</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">₹{averageExpense.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="flex items-end justify-end mb-2">
                        <DownloadDropdown /> 
                    </div>
                </div>

                {/* Main Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Expense Overview</h2>
                        <BudgetChart
                            data={getData}
                            title="Monthly Expenses"
                            subTitle="Detailed breakdown of your spending"
                            animation={true}
                            height={400}
                            type="bar"
                        />
                    </div>
                </motion.div>

                {/* Secondary Charts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                >
                    {/* Line Chart */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Spending Trend</h2>
                        <BudgetChart
                            data={getData}
                            title="Expense Trend"
                            subTitle="Track your spending pattern over time"
                            animation={true}
                            height={300}
                            type="line"
                        />
                    </div>

                    {/* Doughnut Chart */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Category Distribution</h2>
                        <BudgetChart
                            data={getData}
                            title="Expense Distribution"
                            subTitle="Breakdown by categories"
                            animation={true}
                            height={300}
                            type="doughnut"
                        />
                    </div>
                </motion.div>

                {/* Error State */}
                {getError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-700">Error loading data: {getError}</p>
                        </div>
                    </motion.div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && getData.length === 0 && !getError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200"
                    >
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
                        <p className="text-gray-500">Start adding expenses to see your reports here.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}