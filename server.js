const socketio = require('socket.io');
const router = require('./router');
const http = require('http');
const express= require('express');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(router);
/*
const io = socketio(server,{
    cors:{
        origins:"http://localhost:3000",
        method:["GET","POST"],
        credentials: true
    }
})
*/
const io = socketio(server,{
    cors:{
        origins:"http://localhost:3000",
        method:["GET","POST"],
        credentials:true}
})
const users = {}

io.on('connection',socket => {
//   socket.emit('chat-message','hello world');

    socket.on('new-user',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name);

    });
    socket.on('send-chat-message' , message =>{
      //  console.log(message)
      
        socket.broadcast.emit('chat-message',{message:message, name:users[socket.id] })

    })
    socket.on('disconnect',() => {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
})

server.listen(PORT,()=>{
    console.log(`server is run on ${PORT}`)
})