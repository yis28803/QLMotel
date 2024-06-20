import { Outlet, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBed, faConciergeBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import  { useEffect, useState } from "react";
import { apiLogin} from "../api";

const StaffHeader = ({ onLogout }) => {
  return (
    <header className='bg-gray-900 text-gray-100 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <Link to='/staff' className='flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300 font-semibold'>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>

        <nav className='hidden md:flex'>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/staff/rooms' className='flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300 font-semibold'>
                <FontAwesomeIcon icon={faBed} />
                <span>Booking</span>
              </Link>
            </li>
            <li>
              <Link to='/staff/services' className='flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300 font-semibold'>
                <FontAwesomeIcon icon={faConciergeBell} />
                <span>Book Services</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className='flex items-center space-x-4'>
          <button
            onClick={onLogout}
            className='bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2'
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const StaffLayout = () => {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    let localStorageData = window.localStorage.getItem("persist:hotelmanagement/user");
    let token = localStorageData ? JSON.parse(localStorageData).token : null;

    if (!token) {
      setHasToken(false);
    } else {
      setHasToken(true);
    }
  }, [navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { username, password };
    try {
      const response = await apiLogin(body);

      if (response === undefined) {
        setLoginError(true);
        return;
      }

      if (response.access_token !== undefined) {
        let localStorageData = window.localStorage.getItem(
          "persist:hotelmanagement/user"
        );
        localStorageData = JSON.parse(localStorageData);
        if (!localStorageData) localStorageData = {};
        localStorageData.token = JSON.stringify(response.access_token);

        window.localStorage.setItem(
          "persist:hotelmanagement/user",
          JSON.stringify(localStorageData)
        );
        setLoginError(false);
        setHasToken(true);
        navigate("/staff", { state: { fullName: response.fullName } });
      } else {
        console.log("Login failed");
        setLoginError(true);
        setHasToken(false);
      }

    } catch (error) {
      console.error('Login error', error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("persist:hotelmanagement/user");
    setHasToken(false);
    // No need to navigate since we're staying on the same route
  };

  return (
    <div>
      {hasToken ? (
        <>
          <StaffHeader onLogout={handleLogout} />
          <Outlet />
        </>
      ) : (
        <div className='flex flex-col h-screen justify-between'>
          <header className='text-center p-4 bg-blue-600 text-white text-2xl font-bold'>
            Hotel Management System
          </header>

          <div className='flex-grow flex items-center justify-center'>
            <div className='bg-white shadow-xl rounded-lg w-96 p-6 space-y-4'>
              <h1 className='text-3xl font-semibold text-center text-gray-700'>Login Staff</h1>
              <form onSubmit={handleLogin} className='space-y-6'>
                <div>
                  <input type='text' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <input type='password' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {loginError && <div className="text-sm text-red-500 text-center">Mật khẩu/tài khoản không đúng, vui lòng nhập lại</div>}
                <div className='text-center'>
                  <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 text-white py-3 rounded-md transition duration-300'>Login</button>
                </div>
              </form>
            </div>
          </div>

          <footer className='text-center p-4 bg-gray-100 text-gray-600'>
            © 2024 Born Pink, Inc.
          </footer>
        </div>
      )}
    </div>
  );
};

export default StaffLayout;

