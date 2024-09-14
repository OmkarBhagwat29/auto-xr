import React from 'react'
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import Add from './components/Add';
import Delete from './components/Delete';

const App = () => {


    const addedObjectsRef = useRef(new Set());  // This will keep track of already added objects

    //get data from socket
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const newSocket = io.connect("http://localhost:3001");
        setSocket(newSocket);
        console.log("Socket Connected")

        return () => {
            newSocket.disconnect();
            console.log("Socket Dis-Connected")
        };
    }, [])


    return (

        <>
            <Add socket={socket} addedObjectsRef={addedObjectsRef} />

            <Delete socket={socket} addedObjectsRef={addedObjectsRef} />

        </>
    )
}

export default App
