import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLogin();
    }, [user]);

    const checkLogin = async () => {
        try {
            const res = await authApi.me();

            setUser(res);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (user) => setUser(user);

    const logout = async () => {
        await authApi.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);