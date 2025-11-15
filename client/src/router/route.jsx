import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider.jsx";
import Header from '../components/Layout/Header/Header.jsx';
import Footer from '../components/Layout/Footer/Footer.jsx';
import { useEffect } from 'react';



const PrivateRoute = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("PrivateRoute token:", token);
        if (!token || token === "") { navigate("/login") }

    }, [token])


    return (<>
        <Header />
        <Outlet></Outlet>
        <Footer />
    </>);

};
export default PrivateRoute;