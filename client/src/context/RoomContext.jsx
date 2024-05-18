import { createContext, useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { v4 as uuidV4 } from "uuid";
import Peer, { util } from 'peerjs';
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

        console.log({socket});

        const meId = uuidV4();
        // Using local peer signaling server
        const peer = new Peer(meId, {
            host: "localhost",
            port: 9001,
            path: "/",
        });
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

        return () => {
            socket.off('room-created');
            socket.off("get-users");
            socket.off("user-disconnected");
            // socket.off("user-joined");
            me?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!me) return;
        if (!stream) return;

        socket.on("user-joined", ({ peerId }) => {
            //This call is mediaConnection instance
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
        });

        // me.on("error", (err) => {
        //     console.error("Error-type: "+err.type);
        //     console.error(err);
        // });
        socket.on('check-room-result', (res) => {
            console.log("result: " + JSON.stringify(res));
            if(res.resp === true){
                navigate(`/room/${res.roomId}`);
            }else{
                alert("No such ROOM-ID exists");
            }
        });

        console.log({ peers });

        return () => {
            socket.off("user-joined");

        };

    }, [me, stream]);

    // To check if it supports or not
    // console.log("Is supported: "+util.supports.audioVideo);

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