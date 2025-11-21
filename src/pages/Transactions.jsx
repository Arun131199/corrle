import { useState } from "react"

import { MdArrowUpward, MdArrowDownward, MdAccountBalance, MdFilterList, MdSearch } from "react-icons/md"
import { FaMoneyBillWave, FaCreditCard, FaPiggyBank } from "react-icons/fa"
import transactions from "../utils/transactions "

export default function Transactions() {
    const [transaction] = useState(transactions)
    const [filter, setFilter] = useState("all") // all, income, expense
    const [searchTerm, setSearchTerm] = useState("")

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

            {/* Transactions List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                        <div className="col-span-5">Transaction</div>
                        <div className="col-span-3">Category</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-2 text-right">Amount</div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="divide-y divide-gray-100">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((item, index) => (
                            <div
                                key={index}
                                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group"
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    {/* Transaction Details */}
                                    <div className="col-span-5 flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                                            }`}>
                                            {getTransactionIcon(item.category)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                                                {item.description || "Transaction"}
                                            </p>
                                            <p className="text-sm text-gray-500">{item.account || "Main Account"}</p>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="col-span-3">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.amount > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.category || (item.amount > 0 ? 'Income' : 'Expense')}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-600">{formatDate(item.date)}</p>
                                    </div>

                                    {/* Amount */}
                                    <div className="col-span-2 text-right">
                                        <p className={`text-lg font-semibold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {formatAmount(item.amount)}
                                        </p>
                                        {item.amount > 0 ? (
                                            <MdArrowUpward className="inline text-green-500 ml-1" size={16} />
                                        ) : (
                                            <MdArrowDownward className="inline text-red-500 ml-1" size={16} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MdAccountBalance className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={() => { setFilter("all"); setSearchTerm(""); }}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {filteredTransactions.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing {filteredTransactions.length} of {transaction.length} transactions
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}