import express from "express"
import http from 'http'
import fs  from 'fs'
import path from "path"

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

    socket.on("rhino_file",(filePath)=>
    {
        //get my local file path here
       console.log(socket.id,"=>",filePath);

       // Read the binary content of the Rhino3dm file
       fs.readFile(filePath,(err,data)=>{
        if (err) {
            console.error("Error reading file:", err);
            // Handle the error, send an error message to the client, etc.
        } else {
            // Send the binary data to the client
            
            const fileName = path.basename(filePath);
            
            const obj = { fileName: fileName, fileContent: data }
            //console.log(obj);
            socket.broadcast.emit("rhf", obj);
        }
       })
    })

    // socket.on('myText',(data)=>{
    //     console.log(data);
    // })
})

server.listen(3001,()=>{
    console.log("server listening on 3001")
})