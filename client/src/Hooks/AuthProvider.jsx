import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../api/axios.js';
const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [loginErr, setLoginErr] = useState(null);
    const navigate = useNavigate();

    const loginAction = async (userInfo) => {
        try {
            const resp = await api.post('/auth/login', userInfo)
            if (resp && resp.data.success) {
                setUser(resp.data.user);
                setToken(resp.data.token);
                localStorage.setItem("site", resp.data.token);
                setLoginErr(false);
                navigate('/');
            } else {
                setLoginErr(true);
                console.log("Check the credintials")
            };
        } catch (err) {
            setLoginErr(true);
            console.log("Error in the connection: " + err)
        };
    };

    const logOut = async () => {
        try {
            const resp = await api.get('http://localhost:5001/api/auth/logout');
            if (resp && resp.success) {
                setUser(null);
                setToken("");
                localStorage.removeItem("site");
                window.location.href("/login")
                console.log("signed out succ")
            };
        } catch (err) {
            // Show a message for the user.
            console.log(err)
        };
    };

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const isExp = decoded.exp * 1000 < Date.now();
            if (isExp) {
                setUser(null);
                setToken("");
                localStorage.removeItem("site");
                window.location.href("/login")
                return isExp;
            } else {
                return isExp;
            };
        } catch {
            logOut()
            return true;
        };
    };

    const isExp = isTokenExpired(token);

    return <AuthContext.Provider value={{ token, loginErr, user, loginAction, logOut, isExp }}>{children}</AuthContext.Provider>
}
export default AuthProvider;

const useAuth = () => {
    return useContext(AuthContext);
};
export { useAuth };