import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";
import { PiContactlessPaymentLight, PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { HiOutlineQrcode } from "react-icons/hi";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";


export default function Accounts() {
    const [activeCard, setActiveCard] = useState(0);
    const [showBalance, setShowBalance] = useState(true);
    const [cards, setCards] = useState([
        {
            id: 1,
            type: "mastercard",
            number: "5412 7548 7578 1212",
            hiddenNumber: "5412 •••• •••• 1212",
            expiry: "12/28",
            name: "Arunkumar K",
            balance: 12456.78,
            bankName: "Premium Banking",
            gradient: "from-purple-500 to-blue-600",
            Icon: SiMastercard,
            cvv: "123",
            isActive: true
        },
        {
            id: 2,
            type: "visa",
            number: "4512 8456 7890 1234",
            hiddenNumber: "4512 •••• •••• 1234",
            expiry: "09/27",
            name: "Arunkumar K",
            balance: 8234.56,
            bankName: "Business Account",
            gradient: "from-green-500 to-teal-600",
            Icon: RiVisaLine,
            cvv: "456",
            isActive: true
        },
        {
            id: 3,
            type: "visa",
            number: "3789 4561 2345 6789",
            hiddenNumber: "3789 •••• •••• 6789",
            expiry: "03/26",
            name: "Arunkumar K",
            balance: 3125.34,
            bankName: "Savings Account",
            gradient: "from-orange-500 to-red-500",
            Icon: RiVisaLine,
            cvv: "789",
            isActive: true
        }
    ]);

    const [showCVV, setShowCVV] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [transferData, setTransferData] = useState({
        amount: "",
        toAccount: "",
        description: ""
    });
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'debit', amount: 150.00, description: 'Amazon Purchase', date: '2024-01-15', merchant: 'Amazon' },
        { id: 2, type: 'credit', amount: 2500.00, description: 'Salary', date: '2024-01-10', merchant: 'Company Inc' },
        { id: 3, type: 'debit', amount: 45.50, description: 'Restaurant', date: '2024-01-08', merchant: 'Food Palace' },
        { id: 4, type: 'debit', amount: 89.99, description: 'Netflix Subscription', date: '2024-01-05', merchant: 'Netflix' }
    ]);

    const formatBalance = (balance) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(balance);
    };

    const handleTransfer = () => {
        if (!transferData.amount || !transferData.toAccount) {
            alert('Please fill all required fields');
            return;
        }

        const amount = parseFloat(transferData.amount);
        if (amount > cards[activeCard].balance) {
            alert('Insufficient balance');
            return;
        }

        // Update card balance
        const updatedCards = [...cards];
        updatedCards[activeCard].balance -= amount;
        setCards(updatedCards);

        // Add transaction
        const newTransaction = {
            id: transactions.length + 1,
            type: 'debit',
            amount: amount,
            description: transferData.description || `Transfer to ${transferData.toAccount}`,
            date: new Date().toISOString().split('T')[0],
            merchant: 'Bank Transfer'
        };
        setTransactions([newTransaction, ...transactions]);

        // Reset form and close modal
        setTransferData({ amount: "", toAccount: "", description: "" });
        setShowTransferModal(false);
        alert('Transfer completed successfully!');
    };

    const toggleCardStatus = (cardId) => {
        setCards(cards.map(card =>
            card.id === cardId ? { ...card, isActive: !card.isActive } : card
        ));
    };

    const quickActions = [
        {
            icon: "💳",
            label: "Add Card",
            action: () => alert('Add card functionality would open card registration form')
        },
        {
            icon: "📱",
            label: "Mobile Pay",
            action: () => alert('Redirecting to mobile payment setup')
        },
        {
            icon: "🔄",
            label: "Transfer",
            action: () => setShowTransferModal(true)
        },
        {
            icon: "📊",
            label: "Statistics",
            action: () => alert('Opening spending statistics dashboard')
        }
    ];

    const cardActions = [
        { label: "View Transactions", action: () => alert('Showing transaction history') },
        { label: "Freeze Card", action: () => toggleCardStatus(cards[activeCard].id) },
        { label: "Show CVV", action: () => setShowCVV(!showCVV) },
        { label: "Card Details", action: () => setShowCardDetails(!showCardDetails) }
    ];

    const cardVariants = {
        inactive: { opacity: 0.4, scale: 0.92, y: 20 },
        active: {
            opacity: 1,
            scale: 1.05,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const sliderVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.35 }
        },
        exit: (direction) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
            transition: { duration: 0.3 }
        })
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };



    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                className="flex justify-between items-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Left side text */}
                <div>
                    <motion.h1
                        className="text-3xl font-bold text-gray-800 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        Your Cards
                    </motion.h1>

                    <motion.p
                        className="text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        Manage your payment cards and accounts
                    </motion.p>
                </div>

                {/* Show/Hide Button */}
                <motion.button
                    onClick={() => setShowBalance(!showBalance)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
                >
                    {showBalance ? <PiEyeSlashLight size={20} /> : <PiEyeLight size={20} />}
                    <span>{showBalance ? "Hide Balance" : "Show Balance"}</span>
                </motion.button>
            </motion.div>


            {/* Cards Carousel */}
            <div className="relative mb-12">
                {/* Navigation Arrows */}
                <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveCard((prev) => (prev > 0 ? prev - 1 : cards.length - 1))}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveCard((prev) => (prev < cards.length - 1 ? prev + 1 : 0))}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>

                {/* Cards Container */}
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {cards.map((card, index) => (
                        <AnimatePresence mode="wait" custom={index - activeCard} key={card.id}>
                            <motion.div
                                custom={index - activeCard}
                                variants={sliderVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="flex-shrink-0 w-96"
                            >
                                <motion.div
                                    variants={cardVariants}
                                    animate={index === activeCard ? "active" : "inactive"}
                                    className={`transition-all duration-500 ${!card.isActive ? 'opacity-60' : ''}`}
                                >
                                    <div className={`bg-gradient-to-br ${card.gradient} p-6 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm relative`}>

                                        {/* Card Status */}
                                        {!card.isActive && (
                                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Frozen
                                            </div>
                                        )}

                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <p className="text-white/80 text-sm font-medium">{card.bankName}</p>
                                                <p className="text-white font-bold text-xl">Word</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <PiContactlessPaymentLight size={28} color="white" className="opacity-90" />
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <HiOutlineQrcode size={20} color="white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Balance */}
                                        <div className="mb-8">
                                            <p className="text-white/80 text-sm mb-1">Current Balance</p>
                                            <p className="text-white font-bold text-2xl">
                                                {showBalance ? formatBalance(card.balance) : "••••••"}
                                            </p>
                                        </div>

                                        {/* Number */}
                                        <div className="mb-6">
                                            <p className="text-white text-lg font-mono tracking-widest">
                                                {showBalance ? card.number : card.hiddenNumber}
                                            </p>
                                        </div>

                                        {/* Card Details (Animated only on active) */}
                                        <AnimatePresence>
                                            {showCardDetails && index === activeCard && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="mb-4 p-3 bg-white/10 rounded-lg"
                                                >
                                                    <p className="text-white/80 text-sm">CVV: {showCVV ? card.cvv : "•••"}</p>
                                                    <p className="text-white/80 text-sm">Expiry: {card.expiry}</p>
                                                    <p className="text-white/80 text-sm">Status: {card.isActive ? "Active" : "Frozen"}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Footer */}
                                        <div className="flex items-end justify-between">
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider">
                                                        VALID THRU
                                                    </p>
                                                    <p className="text-white text-sm font-semibold">{card.expiry}</p>
                                                </div>
                                                <p className="text-white text-sm font-medium">{card.name}</p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                                <card.Icon size={40} color="white" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                    {cards.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setActiveCard(index)}
                            whileHover={{ scale: 1.3 }}
                            animate={{ scale: index === activeCard ? 1.3 : 1 }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeCard ? "bg-purple-600 w-6" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>


            {/* Card Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {cardActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.action}
                        className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-100 text-center"
                    >
                        <p className="text-sm font-medium text-gray-700">{action.label}</p>
                    </button>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.12 }}
            >
                {quickActions.map((action, index) => (
                    <motion.button
                        key={index}
                        onClick={action.action}
                        variants={fadeUp}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 text-center"
                    >
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <p className="text-sm font-medium text-gray-700">{action.label}</p>
                    </motion.button>
                ))}
            </motion.div>


            {/* Recent Transactions */}
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-6"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.12 }}
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-xl font-bold text-gray-800 mb-4"
                >
                    Recent Transactions
                </motion.h2>

                <div className="space-y-3">
                    {transactions.map(transaction => (
                        <motion.div
                            key={transaction.id}
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                                        }`}
                                >
                                    <span
                                        className={
                                            transaction.type === "credit"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {transaction.type === "credit" ? "⬆️" : "⬇️"}
                                    </span>
                                </div>

                                <div>
                                    <p className="font-medium text-gray-800">{transaction.description}</p>
                                    <p className="text-sm text-gray-500">
                                        {transaction.merchant} • {transaction.date}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`font-bold ${transaction.type === "credit"
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {transaction.type === "credit" ? "+" : "-"}
                                {formatBalance(transaction.amount)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>


            {/* Transfer Modal */}
            <AnimatePresence>
                {showTransferModal && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            key="modal-content"
                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl p-6 w-96 shadow-xl"
                        >
                            <h3 className="text-xl font-bold mb-4">Transfer Money</h3>

                            <div className="space-y-4">
                                {/* Amount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                    <input
                                        type="number"
                                        value={transferData.amount}
                                        onChange={(e) =>
                                            setTransferData({ ...transferData, amount: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* To Account */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
                                    <input
                                        type="text"
                                        value={transferData.toAccount}
                                        onChange={(e) =>
                                            setTransferData({ ...transferData, toAccount: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Account number"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <input
                                        type="text"
                                        value={transferData.description}
                                        onChange={(e) =>
                                            setTransferData({ ...transferData, description: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Optional description"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-3 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowTransferModal(false)}
                                        className="flex-1 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleTransfer}
                                        className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Transfer
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}