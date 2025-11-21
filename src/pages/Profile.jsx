import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    const { user, isLoggedIn, isLoading, error } = useSelector((state) => state.auth);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Handle logout with loading state
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await dispatch(logout()).unwrap();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Add keyboard accessibility for logout
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleLogout();
        }
    };

    const navigate = useNavigate()

    // Redirect or show login message if not authenticated
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 border border-white/60 p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Authentication Required
                    </h2>
                    <p className="text-gray-600 mb-6">Please login to access your dashboard</p>
                    <button
                        onClick={() => navigate('../login')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-300/50 transition-all duration-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-3 border-white/30 border-t-white"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h3>
                    <p className="text-gray-500">Preparing your workspace...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-red-200/50 border border-white/60 p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Error
                    </h2>
                    <p className="text-gray-700 text-center mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-red-300/50 transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 lg:p-8">
            {/* Main Dashboard Card */}
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 border border-white/60 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
                            <div className="text-center lg:text-left mb-6 lg:mb-0">
                                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                                    Welcome back, {user.name?.split(' ')[0] || 'User'}!
                                </h1>
                                <p className="text-blue-100 text-lg">Here's your account overview</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
                                    <span className="text-2xl font-bold text-white">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 -mt-8 relative z-20">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Profile Status</h3>
                            <p className="text-2xl font-bold text-gray-800">Complete</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Account Type</h3>
                            <p className="text-2xl font-bold text-gray-800 capitalize">{user.role || 'User'}</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Member Since</h3>
                            <p className="text-2xl font-bold text-gray-800">Today</p>
                        </div>
                    </div>
                </div>

                {/* User Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information Card */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 border border-white/60 p-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Personal Information
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Full Name
                                </label>
                                <p className="text-xl font-bold text-gray-800">
                                    {user.name || 'Not provided'}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Email Address
                                </label>
                                <p className="text-xl font-bold text-gray-800 break-all">
                                    {user.email || 'Not provided'}
                                </p>
                            </div>

                            {user.role && (
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        Role
                                    </label>
                                    <p className="text-xl font-bold text-gray-800 capitalize">
                                        {user.role}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Card */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-200/50 border border-white/60 p-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Quick Actions
                        </h2>

                        <div className="space-y-4">
                            <button
                                onClick={handleLogout}
                                onKeyPress={handleKeyPress}
                                disabled={isLoggingOut}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-red-300/50 disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-3 group"
                                aria-label={isLoggingOut ? "Logging out..." : "Logout from account"}
                            >
                                {isLoggingOut ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                                        <span className="text-lg">Logging Out...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="text-lg">Sign Out</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-blue-300/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="text-lg">Refresh Dashboard</span>
                            </button>

                            <button
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-purple-300/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-lg">Account Settings</span>
                            </button>
                        </div>

                        {/* Last login info */}
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-500">
                                Last login: <span className="font-semibold text-gray-700">{new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}