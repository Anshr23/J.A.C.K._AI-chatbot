import React from "react";
import { AppBar, Toolbar } from '@mui/material';
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Header = () => {
    const auth = useAuth();
    return (
    <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
        <Toolbar sx={{display: "flex"}}>
            <Logo/>
            <div>
                {auth?.isLoggedIn ? (
                <>
                <NavLink to="/chat" style={{ background: "#00fffc", color: "black", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", marginRight: "8px" }}>
                    Go To Chat
                </NavLink>
                <NavLink to="/" onClick={auth.logout} style={{ background: "#51538f", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none" }}>
                    logout
                </NavLink>
                </>
                ) : (
                    <>
                    <NavLink to="/login" style={{ background: "#00fffc", color: "black"}}>
                        Login
                    </NavLink>
                    <NavLink to="/sign-up" style={{ background: "#51538f", color: "white"}}>
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