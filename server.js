const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log('a user is connected', msg);
        io.emit('reply', msg);
    });
});

app.get("/", (req, res) => {
   return res.sendFile('/public/index.html');
});


const PORT = 3000;

server.listen(PORT, () => console.log(`server is listening on ${PORT}`));