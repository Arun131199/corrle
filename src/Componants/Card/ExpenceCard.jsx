export default function ExpenceCard({ data = [], heading, icon, onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {data.map((value, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl shadow-lg border border-purple-200 p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                            <span className="text-white text-xl">{icon}</span>
                        </div>
                        <p className="text-purple-800 font-semibold text-sm uppercase tracking-wide bg-purple-50 px-3 py-1 rounded-full">
                            {heading}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 flex-1">
                        <div>
                            <p className="text-gray-600 text-xs font-medium mb-1">Purpose</p>
                            <p className="text-gray-900 font-semibold text-lg">{value.purpose}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs font-medium mb-1">Date</p>
                                <p className="text-gray-700 font-medium text-sm">{value.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-600 text-xs font-medium mb-1">Amount</p>
                                <p className="text-green-600 font-bold text-xl">₹{value.amount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-purple-100">
                        <button
                            onClick={() => onEdit(value)}
                            className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors duration-200"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(value.id)}
                            className="flex-1 bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}