export default function BudgetCard({ data = [], icon, text }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {data.map((value, index) => (
                <div
                    className="relative border border-gray-200 flex flex-col p-6 bg-gradient-to-br from-violet-600 to-purple-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    key={index}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-white to-transparent rounded-2xl"></div>

                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                            <span className="text-white text-xl">{icon}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-semibold text-lg capitalize">{text}</p>
                            <p className="text-purple-200 text-sm">{value.month}</p>
                        </div>
                    </div>

                    {/* Budget Amount Section */}
                    <div className="mt-2 relative z-10">
                        <p className="text-gray-300 text-sm font-medium mb-1">Budget Amount</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">
                                ₹{value.budget?.toLocaleString() || '0'}
                            </span>
                            <span className="text-purple-200 text-sm">INR</span>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}