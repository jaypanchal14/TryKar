const { generator } = require("./generator.js");

const rooms = {};

const RoomHandler = (socket) => {

    const createRoom = () => {
        console.log("Creating room by socket-id:" + socket.id);
        const roomId = generator();
        rooms[roomId] = [];
        console.log("New created Room-id: " + roomId);
        // socket.join(roomId);
        socket.emit("room-created", { roomId });
    };

    const joinRoom = ({ roomId, peerId }) => {
        if (!rooms[roomId]) rooms[roomId] = [];
        
        if (!rooms[roomId].includes(peerId)) {
            console.log("User joined the room:" + roomId + ", with peerId: " + peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.to(roomId).emit("user-joined", { peerId });
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
        } else {
            console.log("User with peerId: " + peerId + ", is already in room: " + roomId);
        }

        socket.on("disconnect", () => {
            leaveRoom({ roomId, peerId });
        });
    };

    const leaveRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            console.log("User left the room:" + roomId + ", with peerId: " + peerId);
            rooms[roomId] = rooms[roomId].filter(id => id !== peerId);
            socket.to(roomId).emit("user-disconnected", peerId);
        }
    };

    const checkRoom = ({ roomId }) => {
        if (rooms[roomId]) {
            console.log("Room exists:" + roomId);
            socket.emit("check-room-result", {resp : true, roomId});
        }else{
            console.log("Room does not exist:" + roomId);
            socket.emit("check-room-result", {resp : false, roomId});
        }
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on("check-room", checkRoom);


}

module.exports = { RoomHandler };