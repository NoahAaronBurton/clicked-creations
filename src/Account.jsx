
import axios from 'axios';
import { useState } from 'react';
const api = import.meta.env.VITE_API_URL;
import { FaSignOutAlt } from 'react-icons/fa';

function Account({setUser, getUser, setOpenTool, logout, user}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // axios.interceptors.request.use(request => {
    //     console.log('Starting Request', JSON.stringify(request, null, 2));
    //     return request;
    // });

    const signupSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
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

            <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4 space-y-10'>
                <h1 className='text-4xl'>Select a way to Sign in:</h1>

                <div className='container bg-slate-100 space-y-5'>
                    <h1 className='text-2xl'>Sign in with Google</h1>
                    <p>Click the button below to sign in with your Google account. A password is not required if you select this option.</p>
                    <button className='flex bg-gradient-to-r from-blue-600 to-green-500 text-xl text-white rounded-full p-2 hover:bg-black hover:bg-opacity-50' onClick={googleAuth}>Sign in with Google</button>
                </div>

            <div className='container bg-slate-100'>
                <h1 className='text-2xl'>Sign up</h1>
                <p>Sign up with your email and a password.</p>
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
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
                
            </div>    

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