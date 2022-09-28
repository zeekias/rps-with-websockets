const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
const roomsInServer = [];

io.on("connect", (socket) => {
  console.log("[IO] Connection ==> Server has a new connection");

  socket.on("option.choosed", (data) => {
    console.log("[SOCKET] Connection ==> OPTION CHOOSED");
    let currentRoomId = roomsInServer.findIndex(
      (room) => room.roomId === data.connectionId
    );
    if (currentRoomId === -1) {
        roomsInServer.push({roomId: data.connectionId, roomInfo: []});
        currentRoomId = roomsInServer.findIndex(
            (room) => room.roomId === data.connectionId
          ); 
    }
    const userIndex = roomsInServer[currentRoomId].roomInfo.findIndex((user)=>user.id === data.id);

    if(userIndex > -1){
      roomsInServer[currentRoomId].roomInfo[userIndex] = data; 
    }
    else{
      if(roomsInServer[currentRoomId].roomInfo.length < 2){
        roomsInServer[currentRoomId].roomInfo.push(data);
      }
    }
    io.emit(`${roomsInServer[currentRoomId].roomId}`, roomsInServer[currentRoomId].roomInfo);
  });

  socket.on("create.room", (data) => {
    console.log("[SOCKET] CREATE ROOM ==> ", data);
    roomsInServer.push(data);
  });

  socket.on("play.again", (data) => {
    console.log("[SOCKET] PLAY AGAIN IN ROOM  ==> ", data);
    if(data.connectionId){ 
      let currentRoomId = roomsInServer.findIndex((room) => room.roomId === data.connectionId);
        roomsInServer[currentRoomId].roomInfo.length = 0;
        console.log(`reset.${roomsInServer[currentRoomId].roomId}`, roomsInServer[currentRoomId].roomInfo);
        io.emit(`reset.${roomsInServer[currentRoomId].roomId}`, roomsInServer[currentRoomId].roomInfo);
    }
  });

  socket.on("disconnect", () => { 
    console.log("[SOCKET] Disconnect => A connection was disconnected");
  });
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(
    `[HTTP] Listen ==> Server is running at http://${SERVER_HOST}:${SERVER_PORT}`
  );
  console.log(`[HTTP] Listen ==> Press CTRL+C to stop it`);
});
