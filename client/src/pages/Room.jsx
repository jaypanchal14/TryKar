import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import { VideoPlayer } from '../component/VideoPlayer';

export const Room = () => {

    const { id } = useParams();

    const { socket, me, stream, peers } = useContext(RoomContext);

    useEffect(() => {
        if (me) {
            socket.emit('join-room', { roomId: id, peerId: me._id});
        }
    }, [id, socket, me]);

    return (
        <>
            <div className="font-sans flex justify-center items-center bg-white rounded-lg p-4 shadow-lg mb-4 px-4 py-3 w-80">
                ROOM-ID : {id}
            </div>
            <div className='grid grid-cols-4 gap-4' >
                My Video :
                <VideoPlayer stream={stream}  />
            
                Others Video :
                {
                    Object.values(peers).map((peer, k) => (
                        
                        <VideoPlayer key={k} stream={peer.stream} />
                    ))
                }
            </div>
        </>
    )
}
