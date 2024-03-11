import Logo from "./Logo"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const { i18n } = useTranslation();

    const changeLanguage = () => {
        if (i18n.language === "en") {
            i18n.changeLanguage("spa")
        } else {
            i18n.changeLanguage("en")

        }

    }

    const handleClick = () => {
        logout()
    }

    return (
        <div className="navbar py-4 px-6 flex justify-between">
            <Link to={"/"}><Logo /></Link>
            <nav>
                {user && (
                    <div className="actions flex gap-6 text-purple-600 font-medium">
                        <button onClick={handleClick} className="hidden md:block px-3 hover:underline underline-offset-8 transition-all">Sign out - {user.email}</button>
                        <button onClick={handleClick} className="md:hidden px-3 hover:underline underline-offset-8 transition-all">Sign out</button>
                    </div>
                )}
                {!user && (
                    <div className="actions flex gap-6 text-purple-600 font-medium">
                        <Link to={"/login"} className="px-3 hover:underline underline-offset-8 transition-all">Sign In</Link>
                        <Link to={"/signup"} className="px-3 hover:underline underline-offset-8 transition-all">Sign Up</Link>
                    </div>
                )}
                <div className="actions flex gap-6 text-purple-600 font-medium">
                    <button onClick={changeLanguage} className="px-3 hover:underline underline-offset-8 transition-all">Change Language</button>

                </div>

            </nav>
        </div>
    );
}

export default NavBar;