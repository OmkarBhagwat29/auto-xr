/* eslint-disable react/prop-types */
import { useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react";

import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';
import { useDoc } from "../context/DocContext";

export default function Model() {

    const doc = useDoc()

    const [model, setModel] = useState(null);


    const LoadRhinoModel = async () => {

        // create a copy of the doc.toByteArray data to get an ArrayBuffer
        const buffer = new Uint8Array(doc.toByteArray()).buffer;

        const loader = new Rhino3dmLoader();
        loader.setLibraryPath('https://unpkg.com/rhino3dm@8.0.0-beta2/');
        //console.log(doc)

        loader.parse(buffer, (obj) => {
            obj.rotation.x = -Math.PI / 2; // Rotate around x-axis

            obj.traverse(o => {
                o.castShadow = true
                o.receiveShadow = true

                const att = o.userData.attributes

                // Check if userData.attributes is defined before accessing drawColor
                if (att && att.drawColor) {
                    const c = att.drawColor

                    o.material = o.material.clone()
                    o.material.color.setRGB(c.r/255,c.g/255,c.b/255)
                }

            })

            setModel(obj)

        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {

        if (!doc)
            return

        LoadRhinoModel()
    }, [doc])

    return <>
        {model && <primitive object={model} />}
    </>
}