import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'


function App() {
  const [user, setUser] = useState(null);

  // get user info from server
  const getUser = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      console.log('current user: '+ JSON.stringify(data.user.name));

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

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Clicked Creations</h1>
      {user ? (
        <div>
          <h2>Welcome {user.name}</h2>
          <br />
          <button onClick={logout}>Click here to sign out</button>
        </div>
      ) : (
        <button onClick={googleAuth}>Click here to sign with google</button>
      )}
    </>
  )
}

export default App
