const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server}=require('socket.io');
const socketManager=require('./socketManager');

const app=express();
app.use(cors());
app.use(express.json());

const server=http.createServer(app);

const io=new Server(server,{
 origin:"*",
 methods:["GET","POST"]
});

const rooms={};

app.get('/',(req,res)=>{
res.send('Collaborative Editor Server Running');
});

app.get('/rooms',(req,res)=>{
res.json(rooms);
});

io.on('connection',(socket)=>{
console.log('User connected',socket.id);
socketManager(io,socket,rooms);

socket.on('disconnect',()=>{
console.log('Disconnected',socket.id);

for(let room in rooms){
 if(rooms[room].users[socket.id]){
    delete rooms[room].users[socket.id];

    io.to(room).emit(
      'participants',
      Object.values(rooms[room].users)
    );
 }
}
});

});

const PORT=5000;
server.listen(PORT,()=>{
console.log(`Server started on ${PORT}`);
});
