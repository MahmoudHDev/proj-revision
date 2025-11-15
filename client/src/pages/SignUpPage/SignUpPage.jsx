import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function SignUpPage() {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [regError, setRegError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInfo((previousStatus) => ({ ...previousStatus, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.email !== "" && userInfo.password !== "") {
            try {
                const response = await axios.post('http://localhost:5001/auth/signup', userInfo);
                console.log("response from the server: ", response.data);
                if (response.data.registered) {
                    setRegError(false);
                    navigate('/');
                } else {
                    setRegError(true);
                }
            } catch (err) {
                console.log("Error in connection: " + err)
            };

        } else {
            console.log("Please fill the fields.")
        };
    };

    return (
        <div>
            <h1>Welcome to <span style={{ color: "red" }}>Sign up page</span> </h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input required={true} id='email' type="text" name='email' onChange={handleChange} value={userInfo.email || ""} />
                <br></br>
                <label htmlFor="password">Password</label>
                <input required={true} id='password' type="password" name='password' onChange={handleChange} value={userInfo.password || ""} />
                <br></br>
                <button type='submit'>signup</button>
            </form>
            {regError && <p style={{ color: 'red' }}>Error in registration. Please try again.</p>}
            <p> have an account? <span style={{ color: 'blue', cursor: "pointer" }} onClick={() => navigate('/')}>login</span> </p>
        </div>
    );
};

export default SignUpPage;