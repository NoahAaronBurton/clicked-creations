import { useState, useEffect } from 'react';
import '.././App.css'
import axios from 'axios'
import { FaUserAlt} from "react-icons/fa";
import { FaMicroblog } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { FaRegImage } from "react-icons/fa6";
import NavItem from '.././components/NavItem';
import Chat from '.././components/Chat';
import ImageForm from '../components/Image';
import { TbSocial } from "react-icons/tb";
import Account from '../Account';
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

//blog chat component
const BlogChat = () => {
  const sendChatToServer = async (userMessage, messages) => {
    const url = api +'/chat/blog';
    const { data } = await axios.post(url, { userMessage: userMessage, messages: messages }, { withCredentials: true });
    return data.messages;
  }

  return (
    <Chat 
      initialMessage="I can help write blog content for you! I have a range of skills including writing, editing, paraphrasing, summarizing, research, SEO optimization, adaptability, and citing sources. I can even analyze the style of your existing content to match. Share some details and let's get started!" 
      onSendChat={sendChatToServer} 
    />
  );
}


function Root() {
  const [user, setUser] = useState(null);
  const [openTool, setOpenTool] = useState(null);

  console.log('User:', user);
  console.log('Open tool:', openTool);


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



  useEffect(() => {
    getUser();
  }, []);

  const Nav = () => {
    return (
      <nav className="h-full w-16 m-0 flex flex-col bg-gray-200 text-white drop-shadow-xl space-y-8 items-center justify-center">
        <NavItem name="social" icon={TbSocial} onClick={() => setOpenTool('social')} />
        <NavItem name="blog" icon={FaMicroblog} onClick={() => setOpenTool('blog')} />
        <NavItem name="image" icon={FaRegImage} onClick={() => setOpenTool('image')} />
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
          {user && <p className="mr-4">{user.name}</p>}
          {<VscAccount size='48px' onClick={() => setOpenTool('account')} />}
          
        </div>
      </header>
    );
  };

  const Welcome = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Welcome to Clicked Creations</h1>
        <p className="text-lg">Select a tool to get started</p>
      </div>
    );
  }
 
   
    

  return (
    <div className='flex font-inter h-screen'>
    {user && <Nav />}
    <div className='flex flex-col w-full overflow-y-auto'>  
      <Header />
      {!openTool && user && <Welcome />}
      {!openTool && !user && <p>Sign in on the top right of the page to begin</p>}
      {user && openTool === 'blog' && <BlogChat />}
      {user && openTool === 'social' && <SocialChat />}
      {openTool === 'account' && <Account getUser={getUser} setUser={setUser} setOpenTool={setOpenTool} logout={logout} user={user}/>}
      {openTool === 'image' && <ImageForm />}
    </div>
  </div>
  );
  }
    




export default Root
