const { generator } = require("./generator.js");

const rooms = {};

const RoomHandler = (socket) => {

    socket.on("create-room", () => {
        console.log("Creating room by socket-id:" + socket.id);
        const roomId = generator();
        rooms[roomId] = [];
        console.log("New created Room-id: " + roomId);
        // socket.join(roomId);
        socket.emit("room-created", { roomId });
    });

    const joinRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            if (!rooms[roomId].includes(peerId)) {
                console.log("User joined the room:" + roomId + ", with peerId: " + peerId);
                rooms[roomId].push(peerId);
                socket.join(roomId);
                socket.to(roomId).emit("user-joined", {peerId});
                socket.emit("get-users", {
                    roomId,
                    participants: rooms[roomId]
                });
            }else{
                console.log("User with peerId: "+ peerId + ", is already in room: " + roomId);
            }
        }else{
            console.log("Room with id: " + roomId + ", does not exist");
        }

        socket.on("disconnect", () => {
            leaveRoom({ roomId, peerId });
        });
    };

    socket.on("join-room", joinRoom);

    const leaveRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            console.log("User left the room:" + roomId + ", with peerId: " + peerId);
            rooms[roomId] = rooms[roomId].filter(id => id !== peerId);
            socket.to(roomId).emit("user-disconnected", peerId);
        }
    };


}

module.exports = { RoomHandler };