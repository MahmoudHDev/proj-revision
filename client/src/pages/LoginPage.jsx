import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    return (

        <div>
            <h1>Welcome to<span style={{ color: "green" }}> Login Page.</span></h1>

            <form>
                <label htmlFor="email">Email</label>
                <input id='email' type="text" name='email' />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <input id='password' type="password" name='password' />
                <br />
                <br />

                <button type='submit'>Login</button>
            </form>

            <p>don't you have an account, <Link to={"/signup"}>Create one</Link></p>
        </div>
    )
}

export default LoginPage