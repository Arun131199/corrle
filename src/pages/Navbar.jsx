import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import logo from '../assets/logo.png'

export default function Navbar({ options = [] }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Fixed Horizontal Navbar */}
            <nav className="bg-gradient-to-r from-[#571788] to-[#8a2be2] shadow-2xl shadow-purple-900/30 border-b border-purple-300/20 z-50 fixed top-0 left-0 right-0">
                <div className="flex items-center justify-between px-6 py-3">
                    {/* Left side - Page title or breadcrumb */}
                    <div className="flex items-center space-x-4">
                        <h1 className="text-white text-xl font-bold hidden md:block">
                            Welcome, {user?.name || 'User'}
                        </h1>
                    </div>

                    {/* Right side - Profile section */}
                    <div className="flex items-center space-x-4 profile-dropdown">
                        {/* Notification Bell */}
                        <button className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 0-6 6v2.25l-2.47 2.47a.75.75 0 0 0 .53 1.28h15.88a.75.75 0 0 0 .53-1.28L16.5 12V9.75a6 6 0 0 0-6-6z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#571788]"></span>
                        </button>

                        {/* Search Bar */}
                        <div className="hidden md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-64 bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Profile Section */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 transition-all duration-300 hover:scale-105 group"
                            >
                                {/* User Avatar */}
                                <div className="w-8 h-8 bg-gradient-to-br from-white to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-[#571788] font-bold text-sm">
                                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="text-left hidden lg:block">
                                    <p className="text-white font-medium text-sm">{user?.name || 'User'}</p>
                                    <p className="text-white/70 text-xs">{user?.role || 'Member'}</p>
                                </div>

                                {/* Dropdown Arrow */}
                                <svg
                                    className={`w-4 h-4 text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-purple-900/50 border border-white/20 py-2 z-50">
                                    {/* User Summary */}
                                    <div className="px-4 py-3 border-b border-gray-100/50">
                                        <p className="text-gray-800 font-semibold text-sm">{user?.name || 'User'}</p>
                                        <p className="text-gray-600 text-sm truncate">{user?.email || 'No email'}</p>
                                        <p className="text-purple-600 text-xs font-medium mt-1 capitalize">{user?.role || 'Member'}</p>
                                    </div>

                                    {/* Dropdown Options */}
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-purple-50 transition-colors duration-200 group"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-sm">Profile Settings</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigate('/settings');
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-purple-50 transition-colors duration-200 group"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm">Account Settings</span>
                                        </button>
                                    </div>

                                    {/* Logout Section */}
                                    <div className="border-t border-gray-100/50 pt-2">
                                        <button
                                            onClick={() => {
                                                // Add logout logic here
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                                        >
                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span className="text-sm font-medium">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area with Vertical Sidebar */}
            <div className="flex flex-1 pt-16"> {/* Added pt-16 for horizontal navbar height */}
                {/* Fixed Vertical Sidebar */}
                <div className={`bg-gradient-to-b from-[#571788] to-[#8a2be2] h-[calc(100vh-64px)] shadow-2xl shadow-purple-900/30 border-r border-purple-300/20 transition-all duration-300 fixed top-16 bottom-0 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                    {/* Header Section */}
                    <div className="p-6 border-b border-purple-300/20">
                        <div className="flex items-center justify-between">
                            {!isCollapsed && (
                                <div className="text-white">
                                    {/* Optional: Add sidebar header content here */}
                                    <img src={logo} alt="" />
                                </div>
                            )}

                            {/* Collapse Toggle Button */}
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Options */}
                    <div className="p-4 space-y-2">
                        {options.map((value, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(value.path)}
                                className={`flex items-center text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-105 group relative w-full ${isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
                                    }`}
                            >
                                <span className={`text-lg group-hover:scale-110 transition-transform duration-300 ${isCollapsed ? '' : 'mr-3'
                                    }`}>
                                    {value.icon}
                                </span>

                                {!isCollapsed && (
                                    <>
                                        <span className="font-medium text-sm">{value.name}</span>
                                        {/* Hover indicator */}
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 group-hover:h-6 bg-white rounded-r-full transition-all duration-300"></div>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable Main Content Area */}
                <div className={`flex-1 transition-all duration-300 min-h-[calc(100vh-64px)] overflow-auto ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                    <div className=""> {/* Added proper padding */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}