import React, { useEffect, useState } from 'react'
import rhino3dm from 'rhino3dm';

import loader from '../constants/RhinoLoader';
import { useThree } from '@react-three/fiber';

const addSocketKey = "get added rhino geometry";
const splitKey = '_AUTO_'

const Add = ({ socket, addedObjectsRef }) => {

    const { scene } = useThree();

    const [jsonGeometry, setJsonGeometry] = useState(null);
    const [objId, setObjId] = useState(null);

    const getJsonObject = (objDataString) => {

        const parts = objDataString.split(splitKey);

        const jStringObj = parts[0];
        const objId = parts[1];

        setObjId(objId);
        setJsonGeometry(JSON.parse(jStringObj));
    };

    //get rhino3dm and convert to Three Object3d
    useEffect(() => {
        if (!jsonGeometry || !objId)
            return;

        if (addedObjectsRef.current.has(objId)) {
            console.log('object already added');
            return;
        }

        rhino3dm().then((rh) => {

            const commonObj = rh.CommonObject.decode(jsonGeometry);

            if (!commonObj)
                return;

            const doc = new rh.File3dm();

            //add object to rh file
            doc.objects().add(commonObj, null)

            // create a copy of the doc.toByteArray data to get an ArrayBuffer
            const buffer = doc.toByteArray().buffer

            loader.parse(buffer, (obj) => {

                //add Rhino objectId to Object3d userData
                obj.userData.rhId = objId;

                obj.rotation.x = -Math.PI / 2; //for oreintation

                // add the new object to the scene directly
                scene.add(obj);
                addedObjectsRef.current.add(objId);

            },
                (error) => {
                    console.error('Error loading Rhino object:', error); // onError callback
                })
        })

    }, [jsonGeometry])


    //list added geometry socket and get the data
    useEffect(() => {
        if (!socket)
            return;

        socket.on(addSocketKey, getJsonObject);

    }, [socket])

    return (
        <>
        </>
    )
}

export default Add
