import { AppBar, Toolbar } from '@mui/material';
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
//import { NavLink } from "react-router-dom";
import NavLink from "./shared/NavLink";

const Header = () => {
    const auth = useAuth();
    const location = useLocation();
    const isChatRoute = location.pathname === "/chat";
    return (
    <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
        <Toolbar sx={{display: "flex"}}>
            <Logo/>
            <div>
                {auth?.isLoggedIn ? (
                <>
                {isChatRoute ? (
                    <NavLink to="/chat?new=1" className="chatLink">
                        Start New Chat
                    </NavLink>
                ) : (
                    <NavLink to="/chat" className="chatLink">
                        Go To Chat
                    </NavLink>
                )}
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