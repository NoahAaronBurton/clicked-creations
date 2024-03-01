
import axios from 'axios';
import { useState } from 'react';
const api = import.meta.env.VITE_API_URL;
import { FaSignOutAlt } from 'react-icons/fa';
import Button from './components/Button';

function Account({setUser, getUser, setOpenTool, logout, user}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [LocalAuthError, setLocalAuthError] = useState('');
    const [signupError, setSignupError] = useState('');

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
            // console.log('signupSubmit')
            const response = await axios.post( api + '/auth/signup', { email, password, name });
            setSignupError('');
            // console.log(response.data);
            setUser(response.data.user);
            setOpenTool('social');
        } catch (error) {
            console.error(error);
            setSignupError(error.response.data.message);
        }
    };

    const googleAuth = () => {
        window.open(api + '/auth/google/callback', '_self');
        
    };

    const passwordAuth = async (event) => {
        event.preventDefault();
        // console.log('passwordAuth')
        try {
            // console.log('passwordAuth')
            // console.log(email)
            // console.log(password)
            const response = await axios.post( api + '/auth/login/password', { email, password });
            setLocalAuthError('');
            // console.log()
            // console.log(response.data);
            setUser(response.data.user);
            setOpenTool('social');
        } catch (error) {
            console.error(error);
            setLocalAuthError(error.response.data.message);
        }
    }    
    

    return (
        <>
        {user ? (
            <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4 align-center'>
                <h1 className='text-4xl mb-10'> <strong>Welcome to Clicked Creations,</strong>  {user.name}!</h1>
                <p className="text-lg mb-10 text-white">Select a tool on the left to get started.</p>
                <Button className='flex' onClick={logout}>
                    Click here to log out
                    <FaSignOutAlt className='ml-2' size='20px' />
                </Button>
            </div>
        ) : (

            <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4 space-y-10'>
            <h1 className='text-4xl'>Select a way to Sign in:</h1>

            {/* <div className='container  space-y-5 p-2'>
                    <h1 className='text-2xl'>Sign in with Google</h1>
                    <p>Click the button below to sign in with your Google account. A password is not required if you select this option.</p>
                    <button className='flex bg-gradient-to-r from-blue-600 to-green-500 text-xl text-white rounded-full p-2 hover:bg-black hover:bg-opacity-50' onClick={googleAuth}>Sign in with Google</button>
            </div> */}

            <div className='flex flex-col  space-y-5 p-2'>
                <h1 className='text-2xl'>Sign up</h1>
                <p className='text-white'>Sign up with your email and a password.</p>
                <form className='grid grid-cols-2' onSubmit={signupSubmit}>
                    <label>
                        <p>Name:</p>
                        <input
                            className='text-black'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Email:</p>
                        <input
                            className='text-black'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Password:</p>
                        <input
                            className='text-black'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Confirm Password:</p>
                        <input
                            className='text-black'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </form>
                <Button onClick={signupSubmit}>
                    Sign Up
                </Button>
                {signupError && <div className='border-2 border-red-500/100'><p>{signupError}</p></div>}
            </div>    


            <div className='flex flex-col  space-y-5 p-2'>
                    <h1 className='text-2xl'>Log in</h1>
                    <p className='text-white'>If you already have an account, sign in below:</p>
                    <form onSubmit={passwordAuth}>
                        <label>
                            <p>Email:</p>
                            <input
                                className='text-black'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <p>Password:</p>
                            <input
                                className='text-black'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </form>
                    <Button onClick={passwordAuth}>
                        Log In
                    </Button>
                        {LocalAuthError && <div className='border-2 border-red-500/100'><p>{LocalAuthError}</p></div>}
            </div>
        </div>
        )}

        </>
    );
}

export default Account;