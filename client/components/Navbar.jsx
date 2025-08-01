import React, { useContext } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {Logout} = useContext(AuthProvider);
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout();
    }
    return (
        <nav className="bg-gray-800 p-4 flex flex-row justify-between items-center relative">
            <div className="text-white text-lg font-bold">
                Google Meet Clone
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;