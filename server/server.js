const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const { RoomHandler } = require("./room-handler.js");
const { logger } = require("./logger.js");

const port = 8000;
const app = express();

//Health
app.get('/health', (_, res) => {
    logger.info("Health endpoint invoked");
    res.send("Server is running");
});

app.use(cors);

const server = http.createServer(app);
const serverSocket = socket(server, {
    cors : {
        origin : "*"
    }
});


serverSocket.on("connection", (socket) => {

    logger.info("User request for connection received with socket-id:"+socket.id);
    // console.log("User request for connection received with socket-id:"+socket.id);

    // To handle room related logic in separate file
    // Not to make the code here look khichdi
    RoomHandler(socket);

    socket.on("disconnect", (data) => {
        // console.log("User going to disconnect:"+data);
        logger.info("User going to disconnect:"+data);
    })

});

// Server will be running on 8000 port
server.listen( port, () => {
    // console.log(`server is running on port: ${port}`)
    logger.info(`server is running on port: ${port}`)
    }
);