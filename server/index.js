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

io.on("connection", (socket) => {
  try {
    console.log("user id =>", socket.id);

    socket.on("doc", (data) => {
      try {
        // data is the json object
        //const byteArray = Buffer.from(data, 'base64');
        //get buffer
        console.log(socket.id, "=>", data);
        //const obj = { jsonObj: data };
        socket.broadcast.emit("rhf", data);
      } catch (error) {
        console.error("Error processing 'doc' event:", error);
      }
    });

    socket.on("message", (data) => {
      console.log(data);
      socket.broadcast.emit("offMe", data);
    });
  } catch (error) {
    console.error("Error handling 'connection' event:", error);
  }
});

server.listen(3001, () => {
  console.log("server listening on 3001");
});
