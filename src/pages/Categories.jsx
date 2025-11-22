import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ExpenceCard from "../Componants/Card/ExpenceCard";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export default function Categories() {
    const [getExpenceData, setGetExpenceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        amount: "",
        purpose: ""
    })
    const addRef = useRef("");
    const purposeRef = useRef('');
    const dateRef = useRef("");

    const fetchExpence = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/expenses');
            setGetExpenceData(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setError("Failed to load expenses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpence();
    }, []);

    const handleAddExpence = async () => {
        const value = Number(addRef.current.value);
        const purpose = String(purposeRef.current.value).trim();
        const date = dateRef.current.value;
        if (!value || value <= 0) {
            setError("Please enter a valid amount greater than 0.");
            return;
        }
        if (!purpose) {
            setError("Please enter a purpose for this expense.");
            return;
        }
        if (!date) {
            setError("Please select a date.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const newExpense = {
                amount: value,
                purpose: purpose,
                date: new Date(date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
            };

            const response = await axios.post('http://localhost:3000/expenses', newExpense);
            setGetExpenceData(prev => [response.data, ...prev]);

            addRef.current.value = "";
            purposeRef.current.value = "";
            dateRef.current.value = new Date().toISOString().split('T')[0];

            setSuccess("Expense added successfully!");
            setTimeout(() => setSuccess(""), 3000);

        } catch (error) {
            console.error("Error adding expense:", error);
            setError("Failed to add expense. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setEditData({ amount: expense.amount, purpose: expense.purpose });
    };

    const handleEditSaveData = async () => {
        if (!editData.amount || !editData.purpose) {
            setError("Please fill all fields");
            return;
        }
        try {
            const response = await axios.patch(`http://localhost:3000/expenses/${editingId}`, {
                amount: Number(editData.amount),
                purpose: editData.purpose
            })
            setGetExpenceData(prev =>
                prev.map(item => item.id === editingId ? response.data : item)
            );
            setEditingId(null);
            setEditData({ amount: '', purpose: "" });
            setSuccess("Field updated successfully")

        } catch (error) {
            setError("Failed to update expense");
            console.log(error)
        }
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({ amount: "", purpose: "" });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/expenses/${id}`);
            setGetExpenceData(prev => prev.filter(item => item.id !== id))
            setSuccess("Expense deleted successfully!");
        } catch (error) {
            setError("Failed to delete expense");
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddExpence();
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Expense Tracker</h1>
                    <p className="text-gray-600 text-lg">Manage and track your daily expenses</p>
                </motion.div>

                {/* Add Expense Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 bg-gradient-to-br from-[#621c9b] to-[#7b25c8] p-8 rounded-2xl shadow-2xl border border-purple-500 mb-8"
                >
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Add New Expense</h2>
                        <p className="text-purple-200 text-sm">Track your spending easily</p>
                    </div>

                    {/* Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {success}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label className="block text-white font-medium text-sm">
                                Amount <span className="text-red-300">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    ref={addRef}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    min="0"
                                    step="0.01"
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                        </div>

                        {/* Purpose Input */}
                        <div className="space-y-2">
                            <label className="block text-white font-medium text-sm">
                                Purpose <span className="text-red-300">*</span>
                            </label>
                            <input
                                type="text"
                                ref={purposeRef}
                                placeholder="Dinner, Groceries, Shopping..."
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                maxLength={50}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-2">
                        <label className="block text-white font-medium text-sm">Date</label>
                        <input
                            type="date"
                            ref={dateRef}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            onKeyPress={handleKeyPress}
                        />
                    </div>

                    {/* Add Expense Button */}
                    <motion.button
                        onClick={handleAddExpence}
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="w-full bg-white text-purple-600 font-bold text-lg py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Expense
                            </>
                        )}
                    </motion.button>
                </motion.div>

                {/* Expenses List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Recent Expenses</h2>
                        <div className="text-sm text-gray-600">
                            Total: {getExpenceData.length} expenses
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                        </div>
                    ) : getExpenceData.length === 0 ? (
                        <div className="text-center py-12">
                            <FaMoneyBillTransfer className="mx-auto text-gray-400 text-6xl mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No expenses yet</h3>
                            <p className="text-gray-500">Add your first expense to get started!</p>
                        </div>
                    ) : (
                        <div className="overflow-y-auto">
                            <ExpenceCard
                                data={getExpenceData}
                                icon={<FaMoneyBillTransfer color="white" size={24} />}
                                heading="Expenses"
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
            {
                editingId && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Edit Expense</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Amount</label>
                                    <input
                                        type="number"
                                        value={editData.amount}
                                        onChange={(e) => setEditData(prev => ({ ...prev, amount: e.target.value }))}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Purpose</label>
                                    <input
                                        type="text"
                                        value={editData.purpose}
                                        onChange={(e) => setEditData(prev => ({ ...prev, purpose: e.target.value }))}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditSaveData(editingId)}
                                        className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex-1 bg-gray-300 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}