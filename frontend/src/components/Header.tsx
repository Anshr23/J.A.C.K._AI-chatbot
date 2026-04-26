import { AppBar, Toolbar, Button } from '@mui/material';
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
//import { NavLink } from "react-router-dom";
import NavLink from "./shared/NavLink";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Header = () => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const isChatRoute = location.pathname === "/chat";
    const [demoLoading, setDemoLoading] = useState(false);

    const handleDemoLogin = async () => {
        try {
            setDemoLoading(true);
            toast.loading("Logging in with demo account...", { id: "demo" });
            await auth?.login("test@gmail.com", "test123");
            toast.success("Demo login successful!", { id: "demo" });
            navigate("/chat");
        } catch (error) {
            console.log(error);
            toast.error("Demo login failed", { id: "demo" });
            setDemoLoading(false);
        }
    };
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
                    <Button
                        onClick={handleDemoLogin}
                        disabled={demoLoading}
                        sx={{
                            px: 1.5,
                            py: 0.8,
                            backgroundColor: "#00fffc",
                            color: "black",
                            fontWeight: 600,
                            borderRadius: 2,
                            fontSize: "13px",
                            mr: 1,
                            transition: "all 0.3s ease",
                            ":hover": {
                                backgroundColor: "white",
                                boxShadow: "0 0 20px #00fffc",
                            },
                            ":disabled": {
                                backgroundColor: "#00fffc",
                                opacity: 0.7,
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        {demoLoading ? "Demo..." : "Try Demo"}
                    </Button>
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