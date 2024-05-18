import React, { useContext } from 'react'
import { RoomContext } from '../context/RoomContext';

export const CreateButton = () => {

    const { socket } = useContext(RoomContext);

    const createRoom = () => {
        // console.log({socket});
        // socket.emit("join-room");
        socket.emit("create-room");
    };

    return (
        <div>
            <button
                onClick={createRoom}
                className="bg-blue-500 hover:bg-blue-600 my-4 text-white text-xl px-8 py-3 rounded-lg">
                Start new Meeting
            </button>
        </div>
    )
}
