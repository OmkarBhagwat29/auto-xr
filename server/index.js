import express from "express";
import http from "http";

import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors()); //middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //frontend running on
    methods: ["Get", "Post"],
  },
});

const geometryAddKey = "geometry_added";
const geometryDeleteKey = "geometry_delete";

const geomAddedBoradcast = "get added rhino geometry";

const geomDeletedcast = "rhino geometry deleted";

io.on("connection", (socket) => {
  try {
    console.log("user id =>", socket.id);

    socket.on(geometryAddKey, (data) => {
      try {
        socket.broadcast.emit(geomAddedBoradcast, data);
      } catch (error) {
        console.error("Error processing 'doc' event:", error);
      }
    });

    socket.on(geometryDeleteKey, (data) => {
      try {
        console.log(data);
        socket.broadcast.emit(geomDeletedcast, data);
      } catch (error) {
        console.error("Error processing 'socket' event:", error);
      }
    });

    socket.on("message", (data) => {
      //console.log(data);
      socket.broadcast.emit("offMe", data);
    });
  } catch (error) {
    console.error("Error handling 'connection' event:", error);
  }
});

server.listen(3001, () => {
  console.log("server listening on 3001");
});
