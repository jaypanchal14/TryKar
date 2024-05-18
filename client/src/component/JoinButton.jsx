import React, { useContext, useState } from 'react'
import { RoomContext } from '../context/RoomContext';

export const JoinButton = () => {

    const [roomId, setRoomId] = useState('');
    const {  socket } = useContext(RoomContext);


    const checkRoom = () => {
        console.log("clicked: " + roomId);

        socket.emit('check-room', { roomId: roomId});
    };

    return (
        <div className='flex-col'>
            <span className='text-xl'>Room-ID:  {` `}</span>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="bg-gray-100 hover:by-gray-600 my-4 text-xl px-4 py-2 rounded-lg focus:outline-none"
            />
            <button
                onClick={checkRoom}
                className="bg-blue-500 hover:bg-blue-600 my-4 text-white text-xl px-8 py-3 rounded-lg">
                Join an existing room
            </button>
        </div>
    )
}
