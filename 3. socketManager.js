module.exports=(io,socket,rooms)=>{
 socket.on('join-room',({roomId,username})=>{
   socket.join(roomId);

   if(!rooms[roomId]){
      rooms[roomId]={
       code:'// Start Coding',
       users:{}
      }
   }

   rooms[roomId].users[socket.id]={
      id:socket.id,
      username
   };

   socket.emit('load-code',rooms[roomId].code);

   io.to(roomId).emit(
    'participants',
    Object.values(rooms[roomId].users)
   );
 });

 socket.on('code-change',data=>{
   rooms[data.roomId].code=data.code;
   socket.to(data.roomId)
    .emit('receive-code',data.code);
 });

 socket.on('chat-message',msg=>{
   io.to(msg.roomId)
   .emit('receive-message',msg);
 });
}
