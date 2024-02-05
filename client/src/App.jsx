import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import { FaUserAlt,FaSignOutAlt } from "react-icons/fa";



function App() {
  const [user, setUser] = useState(null);

  

  // get user info from server
  const getUser = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      console.log(data); // todo: remove google id from client side

    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
      await axios.get(url, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google/callback`, '_self');
  }

  useEffect(() => {
    getUser();
  }, []);

  const Header = () => {
    return (
      <header className="flex justify-between items-center p-5 bg-gray-200">
        <div>
          <h1 className="text-2xl font-bold">Clicked Creations</h1>
          <p className="text-sm">Marketing Your Product with AI</p>
        </div>
        <div className="flex items-center">
          {user ? (
            <>
              <FaUserAlt className='mr-2' />
              <p>{user.name}</p>
              
              <FaSignOutAlt className='ml-2 hover:text-blue-500' onClick={logout} />
            </>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={googleAuth}>
              Sign in with Google
            </button>
          )}
        </div>
      </header>
    );
  };

  return (
    <div className='flex flex-col lg:px-[150px] font-inter'>  
      <Header />
    </div>
    
  )
}

export default App
