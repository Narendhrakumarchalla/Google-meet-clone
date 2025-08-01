import React, { useState } from 'react'
import Navbar from '../../components/Navbar';

const Home = () => {

    const [roomID, setRoomID] = useState('');

    const handleStartCall = (e) => {
        e.preventDefault();
        if (!roomID) {
            alert('Please enter a room ID');
            return;
        }
        // Redirect to the Room page with the roomID
        window.location.href = `/room/${roomID}`;
    }
  return (
    <>
    <div className='bg-gray-800  top-0 left-0 w-full z-50 absolute'>
        <Navbar />
    </div>
    <div className='text-white min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-[25px] mb-4'>Welcome to the Zego Video Call App</h1>

        <input type='text' placeholder='Room Id' 
            className='text-gray-900 base-sm border border-gray-600 rounded p-2 mb-4 focus:outline-none focus:border-blue-500 ring-1 ring-gray-600 transition-colors duration-300 w-full max-w-xs'
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            autoFocus
            required
        />
        <button onClick={handleStartCall}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'>
          Start a New Call
        </button>
    </div>
    </>
  )
}

export default Home