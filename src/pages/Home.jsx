import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"


import { FiHome, FiLogOut, FiPieChart, FiUser } from "react-icons/fi";
import { MdListAlt } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineTags } from "react-icons/ai";
import { FaFlagCheckered, FaUniversity } from "react-icons/fa";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const navOptions = [
    { name: "Dashboard", path: "dashboard", icon: <FiHome /> },
    { name: "Transactions", path: "transactions", icon: <MdListAlt /> },
    { name: "Budgets", path: "budgets", icon: <IoWalletOutline /> },
    { name: "Categories", path: "categories", icon: <AiOutlineTags /> },
    { name: "Reports", path: "reports", icon: <FiPieChart /> },
    { name: "Accounts", path: "accounts", icon: <FaUniversity /> },
    { name: "Goals", path: "goals", icon: <FaFlagCheckered /> },
    { name: "Profile", path: "profile", icon: <FiUser /> },
    { name: "Logout", path: "login", icon: <FiLogOut /> },
];


export default function Home() {
    const [data, setData] = useState(navOptions)
    return (
        <div>
            <Navbar options={data} />
        </div>
    )
}