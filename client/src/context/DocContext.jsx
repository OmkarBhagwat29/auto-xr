import { createContext, useContext, useState, useEffect } from "react";

import { useSocket } from "./SocketContext";
import { useRhino } from "./RhinoContext";

const DocContext = createContext()

const DocProvider = (props)=>{

    const rhino = useRhino()
    const socket = useSocket()
    const [doc,setDoc]=useState(null)

    const assignDoc = (rhinoData)=>{
        const doc = rhino.File3dm.fromByteArray(rhinoData.fileContent)
        setDoc(doc)
        socket.emit("message",{content:"Disconnect Me!!!!"})
    }

    useEffect(() => {

        if(!rhino)
        {
            return
        }
        socket.on("rhf", assignDoc);

        return ()=>{
            console.log('rhf is OFF');
            socket.off("rhf", assignDoc);
        }
      }, [rhino]);


    return(<DocContext.Provider value={doc}>
        {props.children}
    </DocContext.Provider>)
}

const useDoc = ()=>useContext(DocContext)

export {DocProvider,useDoc}