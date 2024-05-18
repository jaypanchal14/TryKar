import { createContext, useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { v4 as uuidV4 } from "uuid";
import Peer from 'peerjs';
import { PeerReducer } from './PeerReducer';
import { addPeerAction, removePeerAction } from './PeerActions';

const RoomContext = createContext(null);
const WS = "http://localhost:8000";

const socket = io(WS);

const RoomProvider = ({ children }) => {

    const navigate = useNavigate();
    
    const [me, setMe] = useState(null);
    const [stream, setStream] = useState(null);
    const [peers, dispatch] = useReducer(PeerReducer, {});

    const enterRoom = ({ roomId }) => {
        console.log("Entering room:" + roomId);
        navigate(`/room/${roomId}`);
    };

    const getUsers = ({ participants }) => {
        console.log({ participants });
    };

    const removePeer = (peerId) => {
        dispatch(removePeerAction(peerId));
    };

    useEffect(() => {

        const meId = uuidV4();
        const peer = new Peer(meId);
        setMe(peer);

        try {

            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {
                setStream(stream);
            }).catch(err => {
                console.error('Error accessing media devices: ' + err);
            })


        } catch (error) {
            console.error("Error accessing media devices: ", error);
        }

        socket.on("room-created", enterRoom);
        socket.on("get-users", getUsers);
        socket.on("user-disconnected", removePeer);

        // return () => {
        //     socket.off('room-created', enterRoom);
        // };
    }, []);

    useEffect(() => {
        if (!me) return;
        if (!stream) return;

        socket.on("user-joined", ({ peerId }) => {
            const call = me.call(peerId, stream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerAction(peerId, peerStream));
                //dispatch({ type : "ADD_PEER", payload : { peerId, peerStream}});
            })
        });

        me.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerAction(call.peer, peerStream));
                // dispatch({ type : "ADD_PEER", payload : { peerId : `${call.peer}`, peerStream}});
                
            })
        })

    }, [me, stream]);

    console.log({ peers });

    return (
        <RoomContext.Provider value={{
            socket,
            me,
            stream,
            peers
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export { RoomContext, RoomProvider };