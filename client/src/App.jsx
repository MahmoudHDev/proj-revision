import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/styles/App.css'
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/LoginPage/LoginPage.jsx';
import AuthProvider from './Hooks/AuthProvider.jsx';
import PrivateRoute from './router/route.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes  */}
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignUpPage />}></Route>


            <Route element={<PrivateRoute />} >
              <Route path='/' index={0} element={<HomePage />}></Route>
              <Route path='/profile' element={<ProfilePage />}></Route>
            </Route>

            <Route path='/*' element={<h1>Page not Found, Error 404.</h1>}></Route>
          </Routes>
        </AuthProvider>
      </Router >
    </>);
};

export default App
