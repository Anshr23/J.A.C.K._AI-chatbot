import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuthStatus, loginUser, signoutUser, signupUser } from "../helpers/apiCommunicator";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    isLoading: boolean; // <-- ADDED: Needed to track the initial API check
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: {children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // <-- ADDED: This state starts as true so the app knows we are "Checking" 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        async function checkStatus() {
            try {
                // Keep isLoading true while this runs
                const data = await checkAuthStatus();
                if (data) {
                    setUser({ email: data.email, name: data.name });
                    setIsLoggedIn(true);
                }
            } catch (error) {
                // If it fails, the user isn't logged in, which is fine
                console.log("No active session");
            } finally {
                // <-- ADDED: Crucial. This stops the loading state whether 
                // the API call succeeded or failed.
                setIsLoading(false); 
            }
        }
        checkStatus();
    }, []);

    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password);
        if(data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if(data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };

    const signout = async () => {
        await signoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    };

    const value = {
        user,
        isLoggedIn,
        isLoading, // <-- ADDED: Must be passed here so useAuth() can see it
        login,
        signout,
        signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 

export const useAuth = () => {
    const context = useContext(AuthContext);
    // <-- IMPROVED: Added a safety check to ensure hook is used inside Provider
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};