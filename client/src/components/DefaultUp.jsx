import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function DefaultUp()
{
    const {camera} = useThree();

    useEffect(()=>{
        THREE.Object3D.DEFAULT_UP.set(0,0,1)
        camera.up.set(0,0,1);
    },[])
}