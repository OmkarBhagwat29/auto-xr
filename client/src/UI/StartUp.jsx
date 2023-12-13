import { useEffect, useRef } from "react"
import { Button3d } from "./UIHelper"
import { Float } from "@react-three/drei"
import { Interactive } from "@react-three/xr"
import { useState } from "react"

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

    const [clr,setColor] = useState('black')

    const buttonSelectHandler = ()=>{
       // setColor((Math.random() * 0xffffff) | 'black')
        console.log('hi')
    } 

    return (

<Interactive onSelect={buttonSelectHandler} >
<group>
<Button3d width={startUpButton.width + startUpButton.padding} height={startUpButton.height + startUpButton.padding} color={startUpButton.paddingColor} position={startUpButton.padPosition} />


            <Button3d ref={buttonRef} width={startUpButton.width} height={startUpButton.height} color={startUpButton.color} position={startUpButton.position} text='Start' />
            </group>
 </Interactive>

)
}