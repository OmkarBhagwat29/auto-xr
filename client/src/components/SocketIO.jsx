import { useEffect } from 'react'
import io from 'socket.io-client'
import { Html } from "@react-three/drei";

export default function SocketIO({setRhinoData})
{
    const socket = io.connect("http://localhost:3001")

    useEffect(() => {
        //console.log(socket);
        console.log("connected to server");
    
        //sendMessage()

        const handleRhinoData = async (data) => {
          //console.log(data);
          await setRhinoData(data);
        };

        socket.on("rhf", handleRhinoData);
    
        return () => {
          // Clean up
          console.log('disconnected');
          socket.off("rhf", handleRhinoData);
          socket.disconnect();
        };
      }, [socket]);

      return <>
      </>
}