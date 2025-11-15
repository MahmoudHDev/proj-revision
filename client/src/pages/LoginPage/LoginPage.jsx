
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/AuthProvider';

function LoginPage() {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [loginErr, setLoginErr] = useState(false);
    const auth = useAuth();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((previousData) => ({ ...previousData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.email !== "" && userInfo.password !== "") {
            auth.loginAction(userInfo);
        } else {
            setLoginErr("Please the fields.")
        };
    };

    return (
        <div>
            <h1>Welcome to<span style={{ color: "green" }}> Login Page.</span></h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input required={true} id='email' type="text" name='email' value={userInfo.email || ""} onChange={handleChange} />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <input required={true} id='password' type="password" name='password' value={userInfo.password || ""} onChange={handleChange} />
                <br />
                <br />

                <button type='submit'>Login</button>
            </form>
            {loginErr && <p style={{ color: 'red' }}>error while login in. Please try again.</p>}
            <p>don't you have an account, <Link to={"/signup"}>Create one</Link></p>
        </div>
    );
};

export default LoginPage;