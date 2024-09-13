import React from 'react'
import rhino3dm from 'rhino3dm';
import { io } from 'socket.io-client';

import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { Html } from '@react-three/drei';

import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';


const loader = new Rhino3dmLoader();
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1');

const App = () => {

    //const [rhObjsAdded, setRhObjAdded] = useState([]);
    const [jsonObj, setJsonObj] = useState(null);

    const getJsonObject = (objData) => {

        var jObj = JSON.parse(objData);
        setJsonObj(jObj);
    };

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


    //get rhino3dm and conver to Three Object3d

    const [threeObjs, setThreeObjs] = useState([]);
    useEffect(() => {
        if (!jsonObj)
            return;

        rhino3dm().then((rh) => {

            const commonObj = rh.CommonObject.decode(jsonObj);

            if (!commonObj)
                return;

            // setRhObjAdded((prevRhObjs) => [...prevRhObjs, commonObj]) //add the new objs
            const doc = new rh.File3dm();

            const id = doc.objects().addExtrusion(commonObj, null)

            console.log(id);

            loader.parse(doc, (obj) => {
                console.log(obj);
            })



        });
    }, [jsonObj])


    //get data from socket
    useEffect(() => {

        if (!socket)
            return

        socket.on("rhf", getJsonObject);

        return () => {
            console.log('rh is OFF');
            socket.off('rhf', getJsonObject);
        }

    }, [socket])




    return (
        <div>
            <Suspense fallback={<Html>Loading...</Html>}>
                {/* {rhObjsAdded.map((rhObj, i) => {
                    console.log(`Object Index: ${i}`);

                    return <div key={i}></div>
                })} */}
            </Suspense>
        </div>
    )
}

export default App
