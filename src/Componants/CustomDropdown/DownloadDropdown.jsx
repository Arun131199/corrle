// components/Dropdown/DownloadDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DownloadDropdown = ({ onDownload, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const downloadOptions = [
        { 
            id: 'pdf', 
            label: 'PDF Document', 
            icon: '📄',
            description: 'Best for printing',
            color: 'text-red-600'
        },
        { 
            id: 'csv', 
            label: 'CSV File', 
            icon: '📊',
            description: 'Spreadsheet format',
            color: 'text-green-600'
        },
        { 
            id: 'xlsx', 
            label: 'Excel Workbook', 
            icon: '💼',
            description: 'Microsoft Excel',
            color: 'text-green-600'
        },
        { 
            id: 'json', 
            label: 'JSON Data', 
            icon: '{}',
            description: 'Raw data format',
            color: 'text-yellow-600'
        }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDownload = (format) => {
        onDownload(format);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Dropdown Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-800 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Data
                <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50">
                            <h3 className="font-semibold text-gray-800">Export Reports</h3>
                            <p className="text-sm text-gray-600 mt-1">Choose your preferred format</p>
                        </div>

                        {/* Options List */}
                        <div className="p-2">
                            {downloadOptions.map((option, index) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleDownload(option.id)}
                                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 group"
                                >
                                    <span className="text-2xl">{option.icon}</span>
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800 group-hover:text-purple-700">
                                                {option.label}
                                            </span>
                                            <span className={`text-xs font-semibold ${option.color} bg-opacity-10 px-2 py-1 rounded-full`}>
                                                .{option.id}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500 text-center">
                                Files will be generated instantly
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DownloadDropdown;