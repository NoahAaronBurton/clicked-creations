import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import { FaUserAlt, FaSignOutAlt} from "react-icons/fa";
import NavItem from './components/NavItem';
import Chat from './components/Chat';
import { TbSocial } from "react-icons/tb";
const api = import.meta.env.VITE_API_URL;



const SocialChat = () => {
  const sendChatToServer = async (userMessage, messages) => {
    const url = api +'/chat/social';
    const { data } = await axios.post(url, { userMessage: userMessage, messages: messages }, { withCredentials: true });
    return data.messages;
  }

  return (
    <Chat 
      initialMessage="Let me write your social posts or give you feedback on your social strategy. Share some details about what you want to post about or give me a Keyword to get started." 
      onSendChat={sendChatToServer} 
    />
  );
}


function App() {
  const [user, setUser] = useState(null);


  // get user info from server
  const getUser = async () => {
    try {
      const url = api + '/auth/login/success';
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      console.log(data.user);


    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      const url = api + '/auth/logout';
      await axios.get(url, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  const googleAuth = () => {
    window.open(api + '/auth/google/callback', '_self');
  }

  useEffect(() => {
    getUser();
  }, []);

  const Nav = () => {
    return (
      <nav className="h-full w-16 m-0 flex flex-col bg-gray-200 text-white drop-shadow-xl space-y-8 items-center">
        <NavItem name="social" icon={<TbSocial color='white' size={'48px'} />} onClick="" />
      </nav>
    );
  }

  const Header = () => {
    return (
      <header className="flex justify-between items-center p-5 drop-shadow-lg">
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
    <div className='flex h-screen'>
      {user && <Nav />}
      <div className='flex flex-col font-inter w-full'>  
        <Header />
        {user &&
          <SocialChat />
        }
      </div>
    </div>
  );
  }
    




export default App
