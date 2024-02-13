
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

            <div className='container bg-slate-100 space-y-5 p-2'>
                    <h1 className='text-2xl'>Sign in with Google</h1>
                    <p>Click the button below to sign in with your Google account. A password is not required if you select this option.</p>
                    <button className='flex bg-gradient-to-r from-blue-600 to-green-500 text-xl text-white rounded-full p-2 hover:bg-black hover:bg-opacity-50' onClick={googleAuth}>Sign in with Google</button>
            </div>

            <div className='flex flex-col bg-slate-100 space-y-5 p-2'>
                <h1 className='text-2xl'>Sign up</h1>
                <p>Sign up with your email and a password.</p>
                <form className='grid grid-cols-2' onSubmit={signupSubmit}>
                    <label>
                        <p>Name:</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Email:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Confirm Password:</p>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </form>
                    <button className='justify-center w-full mt-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white' onClick={signupSubmit}>Sign Up</button>
                
            </div>    


            <div className='flex flex-col bg-slate-100 space-y-5 p-2'>
                    <h1 className='text-2xl'>Log in</h1>
                    <p>If you already have an account, sign in below:</p>
                    <form onSubmit={passwordAuth}>
                        <label>
                            <p>Email:</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <p>Password:</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </form>
                        <button className='justify-center w-full mt-4 rounded-full bg-gradient-to-r from-purple-400 to-orange-500 text-white' onClick={passwordAuth}>Log In</button>
            </div>
        </div>
        )}

        </>
    );
}

export default Account;