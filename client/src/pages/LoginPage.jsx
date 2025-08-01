import React, { useContext, useState } from 'react'
import { AuthProvider } from '../../context/AuthContext';

const LoginPage = () => {

    const {Login, SignUp} = useContext(AuthProvider);

    const [current, setCurrent] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if(!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            if(current === 'Login') {
                Login({email, password})
                    .then(() => {
                        setEmail('');
                        setPassword('');
                    })
                    .catch((error) => {
                        console.error('Login failed:', error);
                        alert('Login failed. Please check your credentials.');
                    });
            } else {
                SignUp({name, email, password})
                    .then(() => {
                        setName('');
                        setEmail('');
                        setPassword('');
                    })
                    .catch((error) => {
                        console.error('Sign Up failed:', error);
                        alert('Sign Up failed. Please try again.');
                    });
            }

        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred. Please try again later.');
        }
    }
    // Render the form based on the current state (Login or Register)
  return (
    <div className='text-white min-h-screen flex flex-col items-center justify-center p-4'>
        <div className='bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-black'>
        <h1 className='flex text-black justify-center text-[25px] items-center font-semibold '>{current}</h1>
        <form className='flex flex-col gap-4 space-y-4 w-full max-w-md mx-auto mt-8'
            onSubmit={handleSubmit}
        >
            {
                current === 'Register' && (
                    <input type='text'  
                        placeholder='Name'
                        className='text-gray-900 base-sm border border-gray-600 rounded p-2 focus:outline-none focus:border-blue-500 ring-1 ring-gray-600 transition-colors duration-300 w-full'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                    />
                )
            }
            <input type='email'  
                placeholder='Email'
                className='text-gray-900 base-sm border border-gray-600 rounded p-2 focus:outline-none focus:border-blue-500 ring-1 ring-gray-600 transition-colors duration-300 w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input type='password'  
                placeholder='Password'
                className='text-gray-900 base-sm border border-gray-600 rounded p-2 focus:outline-none focus:border-blue-500 ring-1 ring-gray-600 transition-colors duration-300 w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit' 
                className='bg-blue-600 font-bold text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'>
                {current}
            </button>

            <p className=''>
                {current === 'Login' ? 'Don\'t have an account? ' : 'Already have an account? '}
                <span 
                    className='text-blue-500 cursor-pointer hover:underline font-semibold'
                    onClick={() => setCurrent(current === 'Login' ? 'Register' : 'Login')}
                >
                    {current === 'Login' ? 'Register' : 'Login'}
                </span>
            </p>
        </form>
        </div>
    </div>
  )
}

export default LoginPage