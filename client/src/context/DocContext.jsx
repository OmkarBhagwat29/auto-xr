import { createContext, useContext, useState, useEffect } from "react";

import { useSocket } from "./SocketContext";
import { useRhino } from "./RhinoContext";

const DocContext = createContext()

const DocProvider = (props)=>{

    const rhino = useRhino()
    const socket = useSocket()
    const [doc,setDoc]=useState(null)

    useEffect(() => {

        if(!rhino)
            return

        const assignDoc = (rhinoData)=>{

            const doc = rhino.File3dm.fromByteArray(rhinoData.fileContent)
            
            setDoc(doc)
        }
        socket.on("rhf", assignDoc);

        return ()=>{
            socket.off("rhf", setDoc);
        }
      }, [rhino,socket]);


    return(<DocContext.Provider value={doc}>
        {props.children}
    </DocContext.Provider>)
}

const useDoc = ()=>useContext(DocContext)

export {DocProvider,useDoc}