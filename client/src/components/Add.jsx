import React, { useEffect, useState } from 'react'
import rhino3dm from 'rhino3dm';

import loader from '../constants/RhinoLoader';
import { useThree } from '@react-three/fiber';

const addSocketKey = "get added rhino geometry";
const splitKey = '_AUTO_'

const Add = ({ socket, addedObjectsRef }) => {

    const { scene } = useThree();

    // const [jsonGeometries, setJsonGeometries] = useState([]);
    // const [objIds, setObjIds] = useState([]);

    const getJsonObject = (objDataString) => {

        //console.log(objDataString);
        const jsonData = JSON.parse(objDataString);

        jsonData.forEach((jsonString, index) => {

            const parts = jsonString.split(splitKey);

            const rhObjectString = parts[0];
            const objId = parts[1];

            // Parse the Rhino object string
            const rhJsonObject = JSON.parse(rhObjectString)


            if (!rhJsonObject || !objId)
                return;

            //check objId exist in the scene
            if (addedObjectsRef.current.has(objId)) {
                const sceneObj = scene.getObjectByProperty('rhId', objId);

                if (sceneObj) {

                    //console.log('transformed');
                    // Optionally, dispose of the object's geometry and material to free up memory
                    if (sceneObj.geometry) sceneObj.geometry.dispose();
                    if (sceneObj.material) sceneObj.material.dispose();


                    scene.remove(sceneObj);
                    addedObjectsRef.current.delete(objId);
                }
            }

            rhino3dm().then((rh) => {

                const doc = new rh.File3dm();

                const commonObj = rh.CommonObject.decode(rhJsonObject);
                if (!commonObj)
                    return;

                doc.objects().add(commonObj, null);
                const buffer = doc.toByteArray().buffer;

                loader.parse(buffer, (obj) => {
                    //add Rhino objectId to Object3d
                    obj.rhId = objId;

                    obj.rotation.x = -Math.PI / 2; //for oreintation

                    scene.add(obj);
                    addedObjectsRef.current.add(objId);

                    //console.log('object added');
                }, (error) => {
                    console.error('Error loading Rhino object:', error); // onError callback
                })
            });
        });
    };

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
