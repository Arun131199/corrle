import { useEffect, useRef, useState } from "react"
import BuildingLogoLoaderWithText from "./pages/BuildingLogo";
import Login from "./Login";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

export default function Web() {
    const count = useRef(0);

    useEffect(() => {
        count.current = count.current + 1;
        console.log("");

    }, []);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    return (
        <div>
            
        </div>
    )
}