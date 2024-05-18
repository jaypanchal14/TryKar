const { PeerServer } = require("peer");

// Set up the PeerServer
const peerServer = PeerServer({ port: 9001, path: "/" });

// Optionally, you can listen for events on the PeerServer, such as 'connection'
peerServer.on('connection', (client) => {
    console.log('New connection:', client.id);
});

// Optionally, handle other events or actions related to the PeerServer
