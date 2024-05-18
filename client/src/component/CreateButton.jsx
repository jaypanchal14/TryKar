import React, { useContext } from 'react'
import { RoomContext } from '../context/RoomContext'

export const CreateButton = () => {

    const { socket } = useContext(RoomContext);

    const joinRoom = () => {
        // console.log({socket});
        // socket.emit("join-room");
        socket.emit("create-room");
    };

    return (
        <button 
            onClick={joinRoom}
        className="bg-[#d1137f] my-4 text-white text-xl px-8 py-3 rounded-lg
      hover:bg-[#b0106b] hover:text-white">
            Start new Meeting
        </button>
    )
}
