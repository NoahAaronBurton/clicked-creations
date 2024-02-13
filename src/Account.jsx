
import axios from 'axios';
import { useState } from 'react';
const api = import.meta.env.VITE_API_URL;
import { FaSignOutAlt } from 'react-icons/fa';

function Account({setUser, getUser, setOpenTool, logout, user}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    axios.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2));
        return request;
    });

    const signupSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('signupSubmit')
            const response = await axios.post( api + '/auth/signup', { email, password, name });
            console.log(response.data);
            setUser(response.data.user);
            setOpenTool('social');
        } catch (error) {
            console.error(error);
        }
    };

    const googleAuth = () => {
        window.open(api + '/auth/google/callback', '_self');
    };

    const passwordAuth = async (event) => {
        event.preventDefault();
        console.log('passwordAuth')
        try {
            console.log('passwordAuth')
            console.log(email)
            console.log(password)
            const response = await axios.post( api + '/auth/login/password', { email, password });
            console.log()
            console.log(response.data);
            setUser(response.data.user);
            setOpenTool('social');
        } catch (error) {
            console.error(error);
        }
    }    
    

    return (
        <>
        {user ? (
            <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4 align-center'>
                <h1>Welcome {user.name}</h1>
                <button onClick={logout} className='flex space-x-2 bg-red-600 hover:bg-red-400 rounded-lg' >
                    <p>Click here to log out</p> 
                    <FaSignOutAlt size='24px'  />
                </button>
            </div>
        ) : (

        <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4'>
            <button onClick={googleAuth}>Sign in with Google</button>
            <br />
                
            <form onSubmit={signupSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>

            <h1>log in</h1>
            <form onSubmit={passwordAuth}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
        )}

        </>
    );
}

export default Account;