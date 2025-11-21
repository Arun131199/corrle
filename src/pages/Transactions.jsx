import { useState } from "react"

import { MdArrowUpward, MdArrowDownward, MdAccountBalance, MdFilterList, MdSearch } from "react-icons/md"
import { FaMoneyBillWave, FaCreditCard, FaPiggyBank } from "react-icons/fa"
import transactions from "../utils/transactions "

export default function Transactions() {
    const [transaction] = useState(transactions)
    const [filter, setFilter] = useState("all") // all, income, expense
    const [searchTerm, setSearchTerm] = useState("")
    const [toggle, setToggle] = useState("TableView")
    const [currentPage, setCurrentpage] = useState(1)
    const itemsPerpage = 9;

    const startIndex = (currentPage - 1) * itemsPerpage;
    const endIndex = (startIndex + itemsPerpage)

    const currentPageData = transaction.slice(startIndex, endIndex);

    const totalPage = Math.ceil(transaction.length / itemsPerpage)

    // Filter transactions based on filter and search
    const filteredTransactions = transaction.filter(item => {
        const matchesFilter =
            filter === "all" ||
            (filter === "income" && item.amount > 0) ||
            (filter === "expense" && item.amount < 0)

        const matchesSearch = item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesFilter && (searchTerm === "" || matchesSearch)
    })

    // Calculate totals
    const totalIncome = transaction.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = transaction.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
    const netBalance = totalIncome - totalExpenses

    const getTransactionIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'salary':
            case 'income':
                return <FaMoneyBillWave className="text-green-500" />
            case 'shopping':
            case 'entertainment':
                return <FaCreditCard className="text-purple-500" />
            case 'savings':
            case 'investment':
                return <FaPiggyBank className="text-blue-500" />
            default:
                return <MdAccountBalance className="text-gray-500" />
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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR'
        }).format(amount)
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Transactions</h1>
                <p className="text-gray-600">Manage and track your financial activities</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 mb-1">Total Income</p>
                            <p className="text-2xl font-bold text-gray-800">{formatAmount(totalIncome)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <MdArrowUpward className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 mb-1">Total Expenses</p>
                            <p className="text-2xl font-bold text-gray-800">{formatAmount(totalExpenses)}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <MdArrowDownward className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600 mb-1">Net Balance</p>
                            <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                                {formatAmount(netBalance)}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <MdAccountBalance className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Filter Buttons */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === "all"
                                    ? "bg-white text-purple-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter("income")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === "income"
                                    ? "bg-white text-green-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Income
                            </button>
                            <button
                                onClick={() => setFilter("expense")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === "expense"
                                    ? "bg-white text-red-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Expenses
                            </button>
                        </div>

                        {/* Sort Button */}
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                            <MdFilterList size={18} />
                            <span className="text-sm font-medium">Sort</span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Enhanced Toggle Buttons */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm w-fit">
                    <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${toggle === "TableView"
                            ? "bg-white text-purple-600 shadow-md border border-purple-100"
                            : "text-gray-600 hover:text-purple-500 hover:bg-white"
                            }`}
                        onClick={() => setToggle('TableView')}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Table View
                    </button>

                    <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${toggle === "GridView"
                            ? "bg-white text-purple-600 shadow-md border border-purple-100"
                            : "text-gray-600 hover:text-purple-500 hover:bg-white"
                            }`}
                        onClick={() => setToggle('GridView')}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Grid View
                    </button>
                    <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${toggle === "ChartView"
                            ? "bg-white text-purple-600 shadow-md border border-purple-100"
                            : "text-gray-600 hover:text-purple-500 hover:bg-white"
                            }`}
                        onClick={() => setToggle('ChartView')}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        ChartView
                    </button>
                </div>

                {/* Enhanced Content Area */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
                    {toggle === "TableView" ? (
                        // Table View
                        <div className="min-h-[400px]">
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                                    <div className="col-span-5 flex items-center gap-2">
                                        <span>Transaction</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                    <div className="col-span-3">Category</div>
                                    <div className="col-span-2">Date</div>
                                    <div className="col-span-2 text-right">Amount</div>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((item, index) => (
                                        <div
                                            key={index}
                                            className="px-6 py-4 hover:bg-purple-50 transition-all duration-200 group cursor-pointer transform hover:scale-[1.002]"
                                        >
                                            <div className="grid grid-cols-12 gap-4 items-center">
                                                {/* Transaction Details */}
                                                <div className="col-span-5 flex items-center space-x-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md ${item.amount > 0
                                                        ? 'bg-gradient-to-br from-green-100 to-green-50 text-green-600'
                                                        : 'bg-gradient-to-br from-red-100 to-red-50 text-red-600'
                                                        }`}>
                                                        {getTransactionIcon(item.category)}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-200 truncate">
                                                            {item.description || "Transaction"}
                                                        </p>
                                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            {item.account || "Main Account"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Category */}
                                                <div className="col-span-3">
                                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${item.amount > 0
                                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                                        : 'bg-red-100 text-red-800 border border-red-200'
                                                        }`}>
                                                        {item.category || (item.amount > 0 ? 'Income' : 'Expense')}
                                                    </span>
                                                </div>

                                                {/* Date */}
                                                <div className="col-span-2">
                                                    <p className="text-sm font-medium text-gray-700">{formatDate(item.date)}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(item.date).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>

                                                {/* Amount */}
                                                <div className="col-span-2 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <p className={`text-lg font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                            }`}>
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
                                    // Empty State
                                    <div className="px-6 py-16 text-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <MdAccountBalance className="text-purple-500" size={32} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No transactions found</h3>
                                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                            We couldn't find any transactions matching your criteria. Try adjusting your search or filters.
                                        </p>
                                        <button
                                            onClick={() => { setFilter("all"); setSearchTerm(""); }}
                                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {filteredTransactions.length > 0 && (
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600 font-medium">
                                            Showing <span className="text-purple-600 font-semibold">{filteredTransactions.length}</span> of{" "}
                                            <span className="text-gray-800 font-semibold">{transaction.length}</span> transactions
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Last updated: {new Date().toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((item, index) => (
                                        <div
                                            key={index}
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
                                                    {item.category || (item.amount > 0 ? 'Income' : 'Expense')}
                                                </span>
                                            </div>

                                            <h3 className="font-semibold text-gray-800 mb-1 truncate">
                                                {item.description || "Transaction"}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                {item.account || "Main Account"}
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
                                                    <p className={`text-lg font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {formatAmount(item.amount)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full">
                                        #ef4444
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}