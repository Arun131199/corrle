import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CustomizedPopup from "../Componants/popup/CustmoizedPopup"

export default function Goals() {
    const [goals, setGoals] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)
    const [editValue, setEditValue] = useState("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const addGoal = () => {
        if (inputValue.trim() !== "") {
            setGoals([...goals, {
                goal: inputValue.trim(),
                completed: false,
                createdAt: new Date().toLocaleDateString()
            }])
            setInputValue("")
            setIsPopupOpen(true)
        }
    }

    const deleteGoal = (index) => {
        const newGoals = goals.filter((_, i) => i !== index)
        setGoals(newGoals)
    }

    const toggleComplete = (index) => {
        const newGoals = goals.map((goal, i) =>
            i === index ? { ...goal, completed: !goal.completed } : goal
        )
        setGoals(newGoals)
    }

    const startEditing = (index, goal) => {
        setEditingIndex(index)
        setEditValue(goal)
    }

    const saveEdit = (index) => {
        if (editValue.trim() !== "") {
            const newGoals = goals.map((goal, i) =>
                i === index ? { ...goal, goal: editValue.trim() } : goal
            )
            setGoals(newGoals)
            setEditingIndex(null)
            setEditValue("")
        }
    }

    const cancelEdit = () => {
        setEditingIndex(null)
        setEditValue("")
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addGoal()
        }
    }

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#5e1994] to-[#8228d4] bg-clip-text text-transparent mb-2">
                        My Goals
                    </h1>
                    <p className="text-gray-600">Track your progress and achieve your dreams</p>
                </motion.div>

                {/* Add Goal */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="What do you want to achieve?"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />

                        <motion.button
                            onClick={addGoal}
                            disabled={!inputValue.trim()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-[#5e1994] to-[#8228d4] text-white rounded-xl font-semibold disabled:opacity-50"
                        >
                            Add Goal
                        </motion.button>
                    </div>
                </motion.div>

                {/* Goals List */}
                <AnimatePresence>
                    {goals.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200"
                        >
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No goals yet</h3>
                            <p className="text-gray-500">Add your first goal to get started!</p>
                        </motion.div>
                    ) : (
                        goals.map((goal, index) => (
                            <AnimatePresence key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${goal.completed
                                        ? 'border-l-green-500 bg-green-50'
                                        : 'border-l-purple-500'
                                        }`}
                                >
                                    {/* Editing mode */}
                                    {editingIndex === index ? (
                                        <motion.div
                                            initial={{ scale: 0.95, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="flex flex-col sm:flex-row gap-3"
                                        >
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                                autoFocus
                                            />
                                            <div className="flex gap-2">
                                                <motion.button
                                                    onClick={() => saveEdit(index)}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                                >
                                                    Save
                                                </motion.button>
                                                <motion.button
                                                    onClick={cancelEdit}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                                                >
                                                    Cancel
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <input
                                                    type="checkbox"
                                                    checked={goal.completed}
                                                    onChange={() => toggleComplete(index)}
                                                    className="w-5 h-5 text-purple-500 rounded focus:ring-purple-400"
                                                />
                                                <div className="flex-1">
                                                    <p className={`text-lg font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                                        }`}>
                                                        {goal.goal}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Added: {goal.createdAt}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 ml-4">
                                                <motion.button
                                                    onClick={() => startEditing(index, goal.goal)}
                                                    disabled={goal.completed}
                                                    whileHover={{ scale: goal.completed ? 1 : 1.1 }}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                                                >
                                                    ✏️
                                                </motion.button>

                                                <motion.button
                                                    onClick={() => deleteGoal(index)}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    🗑️
                                                </motion.button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        ))
                    )}
                </AnimatePresence>

                {/* Stats */}
                {goals.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-purple-600">{goals.length}</p>
                                <p className="text-sm text-gray-600">Total</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {goals.filter(goal => goal.completed).length}
                                </p>
                                <p className="text-sm text-gray-600">Completed</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600">
                                    {goals.filter(goal => !goal.completed).length}
                                </p>
                                <p className="text-sm text-gray-600">Pending</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-orange-600">
                                    {Math.round((goals.filter(goal => goal.completed).length / goals.length) * 100)}%
                                </p>
                                <p className="text-sm text-gray-600">Progress</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <CustomizedPopup
                title="Payment Successful!"
                subTitle="Your payment has been processed successfully. You will receive a confirmation email shortly."
                type="success"
                isOpen={isPopupOpen}
                onConfirm={() => setIsPopupOpen(false)}
                showCancelButton={false}
                confirmText="Continue Shopping"
                animation="bounce"
                blurBackground={true}
                autoClose={true}
                autoCloseTime={5000}
                theme="dark"
                size="lg"
            />
        </motion.div>
    )
}
