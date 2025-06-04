import React from "react";
import { AppBar, Toolbar } from '@mui/material';
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
//import { NavLink } from "react-router-dom";
import NavLink from "./shared/NavLink";

const Header = () => {
    const auth = useAuth();
    return (
    <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
        <Toolbar sx={{display: "flex"}}>
            <Logo/>
            <div>
                {auth?.isLoggedIn ? (
                <>
                <NavLink to="/chat" className="chatLink">
                    Go To Chat
                </NavLink>
                <NavLink to="/" onClick={auth.signout} className="Sign-outLink">
                    Sign out
                </NavLink>
                </>
                ) : (
                    <>
                    <NavLink to="/login" className="loginLink">
                        Login
                    </NavLink>
                    <NavLink to="/sign-up" className="signupLink">
                        SignUp 
                    </NavLink>
                    </>
                )}
            </div>
        </Toolbar>
    </AppBar>
    );
};

export default Header; 