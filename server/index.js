import express from "express"
import http from 'http'

import { Server } from 'socket.io'
import cors from 'cors'

const app = express();
app.use(cors()); //middleware

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000", //frontend running on
        methods:["Get","Post"],
    }
})

io.on("connection",(socket)=>{
    console.log('user id =>',socket.id);

    socket.on("rhino_file",(buffer)=>
    {
        //get buffer
       console.log(socket.id,"=>",'buffer received');
       const obj = {  fileContent: buffer }
       socket.broadcast.emit("rhf", obj);
    })
})

server.listen(3001,()=>{
    console.log("server listening on 3001")
})