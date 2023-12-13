import { useEffect, useRef } from "react"
import { Button3d } from "./UIHelper"
import { Float } from "@react-three/drei"

const startUpButton = {
    width: 0.1,
    height: 0.1,
    color: 'black',
    position: { x: 0, y: 1.7, z: -0.5 },
    padding: 0.01,
    paddingColor: 'gray',
    padPosition: { x: 0, y: 1.7, z: -0.51 }
}
export default function StartUp({ ...meshProps }) {
    const buttonRef = useRef()

    return (<group>
        <Float>
            <Button3d width={startUpButton.width + startUpButton.padding} height={startUpButton.height + startUpButton.padding} color={startUpButton.paddingColor} position={startUpButton.padPosition} />

            <Button3d ref={buttonRef} width={startUpButton.width} height={startUpButton.height} color={startUpButton.color} position={startUpButton.position} text='Start' onClick={() => { console.log('clicked!!!') }} />
        </Float>
    </group>)
}