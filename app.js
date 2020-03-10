const socketIo = require("socket.io");
const axios = require("axios");
const express = require('express');
var port = process.env.PORT || 4000
const http = require('http')

//54.188.143.78


const app = express();
app.get('/info', function(req,res){
    res.send({response: "I AM ALIVE"})
})

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!


io.on("connect", socket => {
  console.log("New client connected");
  socket.emit("poop", "pooped on " + Math.random())
  //interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on('imonline', (data)=>{
      console.log('im online')
      console.log(data)
  })
  socket.on('batchpushed', (data)=>{
    console.log(data)
  })
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port,'0.0.0.0');

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
