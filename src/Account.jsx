
import axios from 'axios';
import { useState } from 'react';
const api = import.meta.env.VITE_API_URL;

function Account() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post( api + '/auth/signup', { email, password, name });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4'>
            
        <form onSubmit={handleSubmit}>
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
        </div>
    );
}

export default Account;