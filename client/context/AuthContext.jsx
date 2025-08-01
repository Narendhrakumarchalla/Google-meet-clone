import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthProvider = createContext();

const AuthContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState( localStorage.getItem('token') || null );
    const [loading, setLoading] = useState(true);

    axios.defaults.baseURL =import.meta.env.VITE_API_URL || 'https://google-meet-clone-dyml.onrender.com/api';
    const Login = async ({email, password}) => {
        try {
            const {data} = await axios.post('/auth/login', { email, password });
            if(data.success){
                setLoading(false);
                setToken(data.token);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['token'] = data.token;
                setUser(data.user);
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    const SignUp = async ({name, email, password}) => {
        try {
            const {data} = await axios.post('/auth/signup', {name, email, password});
            if(data.success){
                setLoading(false);
                setToken(data.token);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['token'] = data.token;
                setUser(data.user);
            }
        } catch (error) {
            console.error("SignUp failed:", error);
            throw error;
        }
    }
    const Logout = async () => {
        try {
            setToken(null);
            localStorage.removeItem('token');
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const Me = async () => {
        try {
            const {data} = await axios.get('/auth/check');
            if(data.success){
                setUser(data.user);
            }
        } catch (error) {
            console.error("Fetching user data failed:", error);
            throw error;
        }
    }


    useEffect(() => {
        if(token){
            axios.defaults.headers.common['token'] = token;
            Me();
        }
    },[token])


    const value={
        axios,
        token,
        setToken,
        user,
        setUser,
        loading,
        setLoading,
        Login,
        SignUp,
        Logout
    }
  return (
    <AuthProvider.Provider value={value}>
        {children}
    </AuthProvider.Provider>
  )
}

export default AuthContext