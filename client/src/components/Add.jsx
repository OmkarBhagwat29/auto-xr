import React, { useEffect, useRef } from 'react'
import rhino3dm from 'rhino3dm';

import loader from '../constants/RhinoLoader';
import { useThree } from '@react-three/fiber';
import { handleDoubleClickOnObject } from '../helpers/EventListners';

const addSocketKey = "get added rhino geometry";
const splitKey = '_AUTO_'

const Add = ({ socket, addedObjectsRef }) => {

    const { scene, camera } = useThree();

    // A Map to store the added THREE.Object3D instances with their object IDs
    const addedObjectsMap = useRef(new Map());

    //console.log(addedObjectsMap.current);

    useEffect(() => {

        const handleDoubleClick = (event) => {

            console.log('double clicked!!!');

            var objsAdded = Array.from(addedObjectsMap.current.values());

            handleDoubleClickOnObject(event, camera, objsAdded);

        }

        window.addEventListener('dblclick', handleDoubleClick);

        console.log('dbl event added');

        return () => {
            window.removeEventListener('dblclick', handleDoubleClick);
            console.log('dblclick event removed');
        };

    }, [])



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

                    addedObjectsMap.current.delete(objId);
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

                    obj.on

                    scene.add(obj);
                    addedObjectsRef.current.add(objId);

                    addedObjectsMap.current.set(objId, obj);

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
