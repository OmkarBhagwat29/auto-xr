import { useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react'


const deletedObjectSocketKey = "rhino geometry deleted";

const Delete = ({ socket, addedObjectsRef }) => {

    const { scene } = useThree();

    //const [objId, setObjId] = useState(null);

    const deleteTheObject = (objId) => {
        if (!scene || !objId)
            return;



        scene.children.forEach((child) => {
            if (child.rhId && child.rhId === objId) {

                // Optionally, dispose of the object's geometry and material to free up memory
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();

                scene.remove(child);
                addedObjectsRef.current.delete(objId);

            }
        })
    }


    //get data from socket
    useEffect(() => {
        if (!socket)
            return;

        socket.on(deletedObjectSocketKey, deleteTheObject);
    }, [socket])


    return (
        <>
        </>
    )
}

export default Delete
