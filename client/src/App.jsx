import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import { FaUserAlt,FaSignOutAlt } from "react-icons/fa";



function App() {
  //todo: add user message feed
  const [user, setUser] = useState(null);

  const SocialChat = () => {
    // const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState([{content: "Let me write your social posts or give you feedback on your social strategy. Share some details about what you want to post about or give me a Keyword to get started.", role: "server"}]); // new array to store messages
    const [userMessage, setUserMessage] = useState('');
    
    //when a message is received, add it to the messages array
    const addMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    }

    //map over the messages array and display each message
    const renderMessages = () => {
      return messages.map((message, index) => {
        return (
          <div key={index} className='rounded-lg p-2 mb-2'>
            {message.role === 'user' ? (
              //user message
                <p className="bg-blue-500 text-black rounded-lg p-2">{message.content}</p>    
            ) : (
              //server message
              <>
                <p className="bg-gray-300 text-black rounded-lg p-2">{message.content}</p>
                <p className='text-gray-500'>Social Assistant</p>
              </>
              
            )}
            
          </div>
        )
      })
    }

    const getChat = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/chat/social`;
        const { data } = await axios.get(url, { withCredentials: true });
        console.log(data);
        addMessage({ content: data.message, role: 'server' }); // add the received message to the messages array
      } catch (error) {
        console.log(error);
      }
    }

   

    // const sendChat = async () => {
    //   event.preventDefault();
    //   try {
    //     const url = `${import.meta.env.VITE_API_URL}/chat/social`;
    //     const { data } = await axios.post(url, { message: userMessage }, { withCredentials: true });
    //     console.log(data);
    //     setUserMessage('');
    //     getChat();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }


    return (
      <div className="container mx-auto  h-[75vh] md:w-3/4">
        <div className="flex flex-col justify-between bg-white p-4 rounded  h-full shadow-lg w-full ">
          <div className="overflow-auto h-full">
            {renderMessages()}
          </div>
          <div className='flex w-full space-x-2'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={getChat}>
              Send
            </button>
            <input className='w-full' type="text" value={userMessage} placeholder='What would you like to post? Please provide an ideal length, content direction, and tone/style' onChange={e => setUserMessage(e.target.value)} />
          </div>
        </div>
      </div>
    );
  }

  

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
    <div className='flex flex-col font-inter'>  
      <Header />
      {user &&
        <SocialChat />
      }
    </div>
    
  )
}

export default App
