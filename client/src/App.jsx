import React from 'react'
import rhino3dm from 'rhino3dm';
import { io } from 'socket.io-client';

import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { Html } from '@react-three/drei';

import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';


const loader = new Rhino3dmLoader();
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/');

const getRhinoInstance = async () => {
    return await rhino3dm();
}


const g1 = "get added rhino geometry";
const splitKey = '_AUTO_';

const App = () => {

    const [jsonGeometry, setJsonGeometry] = useState(null);
    // const [jsonAttributes, setJsonAttributes] = useState(null);

    const getJsonObject = (objDataString) => {

        const parts = objDataString.split(splitKey);
        const geomString = parts[0];
        //  const attString = parts[1];

        //  setJsonAttributes(JSON.parse(attString));
        setJsonGeometry(JSON.parse(geomString));

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
    const [rhino, setRhino] = useState(null);
    const [threeObjs, setThreeObjs] = useState([]);
    useEffect(() => {

        if (!jsonGeometry)
            return;

        console.log(jsonGeometry);

        const fetchRhinoInstance = async () => {
            try {
                const rhino = await getRhinoInstance();  // Use the getRhinoInstance function
                setRhino(rhino); // Store the Rhino3dm instance in the state
            } catch (error) {
                console.error('Error loading Rhino3dm:', error);
            }
        };

        fetchRhinoInstance();

        if (!rhino)
            return;


        //rhino3dm().then((rh) => {


        //console.log('rh entered');

        //const commonObj = rh.CommonObject.decode(jsonGeometry);

        // if (!commonObj)
        //     return;

        // console.log('Common Object->', commonObj);

        // const commonAtt = rh.CommonObject.decode(jsonAttributes);

        // if (!commonAtt)
        //     return;

        // console.log('Common Attributes->', commonAtt);

        // const doc = new rh.File3dm();

        // //add object to rh file
        // doc.objects().add(commonObj, null)

        // // create a copy of the doc.toByteArray data to get an ArrayBuffer
        // const buffer = new Uint8Array(doc.toByteArray()).buffer;

        // loader.parse(buffer, (obj) => {

        //     obj.rotation.x = -Math.PI / 2; //for oreintation

        //     console.log(obj);
        //     setThreeObjs((prevObjs) => [...prevObjs, obj]); //add new obj

        // },
        //  (error) => {
        //     console.error('Error loading Rhino object:', error); // onError callback
        // })

        // });
    }, [jsonGeometry])


    //get data from socket
    useEffect(() => {

        if (!socket)
            return

        socket.on(g1, getJsonObject);

        return () => {
            // console.log('rh is OFF');
            socket.off(g1, getJsonObject);
        }

    }, [socket])




    return (

        <Suspense fallback={<Html>Loading...</Html>}>
            {/* 
            {threeObjs.map((threeObj, i) => {


                return <primitive key={i} object={threeObj} />
            })} */}

        </Suspense>
    )
}

export default App
