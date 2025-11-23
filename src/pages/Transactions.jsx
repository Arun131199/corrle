import { useState, useMemo } from "react"
import { MdArrowUpward, MdArrowDownward, MdAccountBalance, MdFilterList, MdSearch, MdTrendingUp, MdPieChart } from "react-icons/md"
import { FaMoneyBillWave, FaCreditCard, FaPiggyBank, FaShoppingBag, FaUtensils, FaCar, FaHome } from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { motion } from "framer-motion";

import { Sort2Icon } from "@1771technologies/lytenyte-core/icons"

// Mock transactions data (replace with your actual import)
const mockTransactions = [
    { id: 1, description: "Salary Deposit", amount: 50000, category: "Salary", date: "2024-01-15", account: "Salary Account", type: "income" },
    { id: 2, description: "Amazon Purchase", amount: -2500, category: "Shopping", date: "2024-01-14", account: "Main Account", type: "expense" },
    { id: 3, description: "Restaurant Dinner", amount: -1200, category: "Food", date: "2024-01-13", account: "Main Account", type: "expense" },
    { id: 4, description: "Freelance Work", amount: 15000, category: "Income", date: "2024-01-12", account: "Freelance Account", type: "income" },
    { id: 5, description: "Grocery Shopping", amount: -3500, category: "Food", date: "2024-01-11", account: "Main Account", type: "expense" },
    { id: 6, description: "Car Maintenance", amount: -5000, category: "Transport", date: "2024-01-10", account: "Main Account", type: "expense" },
    { id: 7, description: "Investment Return", amount: 3000, category: "Investment", date: "2024-01-09", account: "Investment Account", type: "income" },
    { id: 8, description: "Netflix Subscription", amount: -649, category: "Entertainment", date: "2024-01-08", account: "Main Account", type: "expense" },
    { id: 9, description: "Bonus Payment", amount: 10000, category: "Bonus", date: "2024-01-07", account: "Salary Account", type: "income" },
    { id: 10, description: "Mobile Recharge", amount: -299, category: "Utilities", date: "2024-01-06", account: "Main Account", type: "expense" },
]

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const fadeScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
};

const staggerParent = {
    visible: {
        transition: { staggerChildren: 0.07 }
    }
};
export default function Transactions() {
    const [transactions] = useState(mockTransactions)
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [toggle, setToggle] = useState("TableView")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
    const itemsPerPage = 9

    // Memoized calculations
    const { filteredTransactions, totalIncome, totalExpenses, netBalance, chartData, categoryData } = useMemo(() => {
        // Filter transactions
        const filtered = transactions.filter(item => {
            const matchesFilter = filter === "all" || item.type === filter
            const matchesSearch = item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category?.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesFilter && (searchTerm === "" || matchesSearch)
        })

        // Sort transactions
        const sorted = [...filtered].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        })

        // Calculate totals
        const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
        const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
        const net = income - expenses

        // Prepare chart data
        const monthlyData = [
            { name: 'Jan', income: 65000, expenses: 12000 },
            { name: 'Feb', income: 58000, expenses: 15000 },
            { name: 'Mar', income: 72000, expenses: 18000 },
            { name: 'Apr', income: 69000, expenses: 14000 },
            { name: 'May', income: 75000, expenses: 16000 },
            { name: 'Jun', income: 68000, expenses: 17000 },
        ]

        // Category data for pie chart
        const categoryStats = transactions
            .filter(t => t.amount < 0)
            .reduce((acc, transaction) => {
                const category = transaction.category
                const amount = Math.abs(transaction.amount)
                if (!acc[category]) {
                    acc[category] = 0
                }
                acc[category] += amount
                return acc
            }, {})

        const categoryChartData = Object.entries(categoryStats).map(([name, value]) => ({
            name,
            value
        }))

        return {
            filteredTransactions: sorted,
            totalIncome: income,
            totalExpenses: expenses,
            netBalance: net,
            chartData: monthlyData,
            categoryData: categoryChartData
        }
    }, [transactions, filter, searchTerm, sortConfig])

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = filteredTransactions.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

    const getTransactionIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'salary':
            case 'income':
            case 'bonus':
                return <FaMoneyBillWave className="text-green-500" />
            case 'shopping':
            case 'entertainment':
                return <FaShoppingBag className="text-purple-500" />
            case 'food':
                return <FaUtensils className="text-orange-500" />
            case 'transport':
            case 'car':
                return <FaCar className="text-blue-500" />
            case 'investment':
            case 'savings':
                return <FaPiggyBank className="text-teal-500" />
            case 'utilities':
                return <FaHome className="text-gray-500" />
            default:
                return <FaCreditCard className="text-gray-500" />
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        })
    }

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) {
            return <MdFilterList size={14} className="text-gray-400" />
        }
        return sortConfig.direction === 'asc' ?
            <MdArrowUpward size={14} className="text-purple-600" /> :
            <MdArrowDownward size={14} className="text-purple-600" />
    }
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const clickBounce = {
        tap: { scale: 0.9 },
        hover: { scale: 1.05 }
    };


    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Transactions
                </h1>
                <p className="text-gray-600">
                    Manage and track your financial activities
                </p>
            </motion.div>


            {/* Summary Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Total Income */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: 0 * 0.15 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 mb-1">Total Income</p>
                            <p className="text-2xl font-bold text-gray-800">{formatAmount(totalIncome)}</p>
                            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <MdArrowUpward className="text-green-600" size={24} />
                        </div>
                    </div>
                </motion.div>

                {/* Total Expenses */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: 1 * 0.15 }}
                    className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 mb-1">Total Expenses</p>
                            <p className="text-2xl font-bold text-gray-800">{formatAmount(totalExpenses)}</p>
                            <p className="text-xs text-red-600 mt-1">+8% from last month</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <MdArrowDownward className="text-red-600" size={24} />
                        </div>
                    </div>
                </motion.div>

                {/* Net Balance */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: 2 * 0.15 }}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600 mb-1">Net Balance</p>
                            <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                                {formatAmount(netBalance)}
                            </p>
                            <p className={`text-xs mt-1 ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                {netBalance >= 0 ? '+5% growth' : '-3% decrease'}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <MdAccountBalance className="text-blue-600" size={24} />
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            {/* Filters and Search */}
            <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

                    {/* Filter Buttons Container */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        variants={fadeUp}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex bg-gray-100 rounded-lg p-1">

                            <motion.button
                                variants={fadeUp}
                                transition={{ delay: 0.15 }}
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === "all"
                                    ? "bg-white text-purple-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                All
                            </motion.button>

                            <motion.button
                                variants={fadeUp}
                                transition={{ delay: 0.25 }}
                                onClick={() => setFilter("income")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === "income"
                                    ? "bg-white text-green-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Income
                            </motion.button>

                            <motion.button
                                variants={fadeUp}
                                transition={{ delay: 0.35 }}
                                onClick={() => setFilter("expense")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === "expense"
                                    ? "bg-white text-red-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Expenses
                            </motion.button>

                        </div>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        className="relative"
                        variants={fadeUp}
                        transition={{ delay: 0.45 }}
                    >
                        <MdSearch
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 w-full md:w-64"
                        />
                    </motion.div>

                </div>
            </motion.div>


            {/* View Toggle */}
            <motion.div
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm w-fit mb-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                {/* Table Button */}
                <motion.button
                    variants={clickBounce}
                    whileTap="tap"
                    whileHover="hover"
                    onClick={() => setToggle("TableView")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${toggle === "TableView"
                        ? "bg-white text-purple-600 shadow-md border border-purple-100"
                        : "text-gray-600 hover:text-purple-500 hover:bg-white"
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Table
                </motion.button>

                {/* Grid Button */}
                <motion.button
                    variants={clickBounce}
                    whileTap="tap"
                    whileHover="hover"
                    onClick={() => setToggle("GridView")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${toggle === "GridView"
                        ? "bg-white text-purple-600 shadow-md border border-purple-100"
                        : "text-gray-600 hover:text-purple-500 hover:bg-white"
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid
                </motion.button>

                {/* Chart Button */}
                <motion.button
                    variants={clickBounce}
                    whileTap="tap"
                    whileHover="hover"
                    onClick={() => setToggle("ChartView")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${toggle === "ChartView"
                        ? "bg-white text-purple-600 shadow-md border border-purple-100"
                        : "text-gray-600 hover:text-purple-500 hover:bg-white"
                        }`}
                >
                    <MdPieChart className="w-4 h-4" />
                    Charts
                </motion.button>
            </motion.div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
                {toggle === "TableView" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[400px]"
                    >
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                                <div className="col-span-5 flex items-center gap-2 cursor-pointer" onClick={() => handleSort('description')}>
                                    <span>Transaction</span>
                                    <Sort2Icon columnKey="description" />
                                </div>
                                <div className="col-span-3 cursor-pointer" onClick={() => handleSort('category')}>
                                    Category
                                </div>
                                <div className="col-span-2 flex items-center gap-2 cursor-pointer" onClick={() => handleSort('date')}>
                                    <span>Date</span>
                                    <Sort2Icon columnKey="date" />
                                </div>
                                <div className="col-span-2 text-right cursor-pointer" onClick={() => handleSort('amount')}>
                                    Amount
                                </div>
                            </div>
                        </div>

                        {/* Table Body */}
                        <motion.div
                            variants={staggerParent}
                            initial="hidden"
                            animate="visible"
                            className="divide-y divide-gray-100"
                        >
                            {currentPageData.length > 0 ? (
                                currentPageData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="px-6 py-4 hover:bg-purple-50 transition-all duration-200 group cursor-pointer"
                                    >
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-5 flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${item.amount > 0
                                                    ? 'bg-gradient-to-br from-green-100 to-green-50 text-green-600'
                                                    : 'bg-gradient-to-br from-red-100 to-red-50 text-red-600'
                                                    }`}>
                                                    {getTransactionIcon(item.category)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-200 truncate">
                                                        {item.description}
                                                    </p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        {item.account}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-span-3">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${item.amount > 0
                                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                                    : 'bg-red-100 text-red-800 border border-red-200'
                                                    }`}>
                                                    {item.category}
                                                </span>
                                            </div>

                                            <div className="col-span-2">
                                                <p className="text-sm font-medium text-gray-700">{formatDate(item.date)}</p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(item.date).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>

                                            <div className="col-span-2 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <p className={`text-lg font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {formatAmount(item.amount)}
                                                    </p>
                                                    {item.amount > 0 ? (
                                                        <MdArrowUpward className="text-green-500" size={18} />
                                                    ) : (
                                                        <MdArrowDownward className="text-red-500" size={18} />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {item.amount > 0 ? 'Credit' : 'Debit'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <MdAccountBalance className="text-purple-500" size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No transactions found</h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                        We couldn't find any transactions matching your criteria.
                                    </p>
                                    <button
                                        onClick={() => { setFilter("all"); setSearchTerm(""); }}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        {/* Pagination */}
                        {filteredTransactions.length > 0 && (
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <p className="text-sm text-gray-600 font-medium">
                                        Showing <span className="text-purple-600 font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)}</span> of{" "}
                                        <span className="text-gray-800 font-semibold">{filteredTransactions.length}</span> transactions
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>

                                        <div className="flex gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                                                        ? 'bg-purple-600 text-white shadow-md'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {toggle === "GridView" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="p-6"
                    >
                        <motion.div
                            variants={staggerParent}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >

                            {currentPageData.length > 0 ? (
                                currentPageData.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={fadeScale}
                                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 hover:border-purple-200 group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${item.amount > 0
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}>
                                                {getTransactionIcon(item.category)}
                                            </div>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.amount > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {item.category}
                                            </span>
                                        </div>

                                        <h3 className="font-semibold text-gray-800 mb-1 truncate">
                                            {item.description}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                            {item.account}
                                        </p>

                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">{formatDate(item.date)}</p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(item.date).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-lg font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {formatAmount(item.amount)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-16">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <MdAccountBalance className="text-purple-500" size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No transactions found</h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                        We couldn't find any transactions matching your criteria.
                                    </p>
                                    <button
                                        onClick={() => { setFilter("all"); setSearchTerm(""); }}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        {/* Grid View Pagination */}
                        {filteredTransactions.length > 0 && (
                            <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Previous
                                </button>

                                <span className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

                {toggle === "ChartView" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Income vs Expenses Chart */}
                            <motion.div
                                variants={fadeScale}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <MdTrendingUp className="text-purple-500" />
                                    Income vs Expenses
                                </h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" stroke="#6b7280" />
                                            <YAxis stroke="#6b7280" />
                                            <Tooltip
                                                formatter={(value) => [`₹${value}`, 'Amount']}
                                                labelFormatter={(label) => `Month: ${label}`}
                                            />
                                            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                                            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Expense Categories Pie Chart */}
                            <motion.div
                                variants={fadeScale}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <MdPieChart className="text-purple-500" />
                                    Expense Categories
                                </h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={categoryData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {categoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>

                        {/* Monthly Trend Line Chart */}
                        <motion.div
                            variants={fadeScale}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <MdTrendingUp className="text-purple-500" />
                                Monthly Financial Trend
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip
                                            formatter={(value) => [`₹${value}`, 'Amount']}
                                            labelFormatter={(label) => `Month: ${label}`}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="income"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, fill: '#10b981' }}
                                            name="Income"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="expenses"
                                            stroke="#ef4444"
                                            strokeWidth={3}
                                            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, fill: '#ef4444' }}
                                            name="Expenses"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div >
    )
}