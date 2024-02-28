import axios from 'axios'
import { useState, useEffect } from 'react';
const api = import.meta.env.VITE_API_URL;

//todo: format chat output

const Chat = ({initialMessage, onSendChat}) => {
    const [messages, setMessages] = useState([{content: initialMessage, role: "system"}]); // new array to store messages
    const [userMessage, setUserMessage] = useState(''); // contents of the field next to the send button
    const [isLoading, setIsLoading] = useState(false);
  
    const sendChat = async () => {
      setIsLoading(true);
      try {
        const url = api +'/chat/social';
        const { data } = await axios.post(url, { userMessage: userMessage, messages: messages }, { withCredentials: true });
        setMessages(data.messages); // update the messages array with the updated array from the server
        setUserMessage('');
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  
    const renderMessages = () => {
      return (
        <>
          {messages.map((message, index) => {
            return (
              <div key={index} className='rounded-lg p-2 mb-2 drop-shadow-lg'>
                {message.role === 'user' ? (
                  <p className="bg-blue-500 text-black rounded-lg p-2">{message.content}</p>    
                ) : (
                  <>
                    <p className="bg-dark text-white rounded-lg p-2">{message.content}</p>
                    <p className='text-white'>Social Assistant</p>
                  </>
                )}
              </div>
            )
          })}
          {isLoading && <p>Loading...</p>}
        </>
      );
    }
  
    return (
      <div className="container mx-auto h-[75vh] sm:4/4 md:w-3/4">
        <div className="flex flex-col justify-between bg-darker drop-shadow-xl p-4 rounded  h-full shadow-lg w-full ">
          <div className="overflow-auto h-full">
            {renderMessages()}
          </div>
          <div className='flex w-full space-x-2'>
            {!isLoading && <button className="bg-secondary text-black px-4 py-2 rounded drop-shadow-xl" onClick={sendChat}>
              Send
            </button>}
            {isLoading && <p>Loading...</p>}
            <textarea className='w-full rounded drop-shadow-xl ring-2 text-black' value={userMessage} placeholder='What would you like to post? Please provide an ideal length, content direction, and tone/style' onChange={e => setUserMessage(e.target.value)} />
          </div>
        </div>
      </div>
    );
  }

export default Chat;