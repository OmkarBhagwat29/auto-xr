
import { OrbitControls, Box, useHelper, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, ContactShadows, PerspectiveCamera,RoundedBox, Sky } from '@react-three/drei'
import Model from './components/Model'

import { useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import DefaultUp from './components/DefaultUp'
import { useThree } from '@react-three/fiber'

export default function Experience() {
    const dirLight = useRef()

    // useHelper(dirLight, THREE.DirectionalLightHelper, 1)
    return <>

        <OrbitControls makeDefault />
        {/* <axesHelper scale={2} /> */}

        <ContactShadows position={[0, -0.01, 0]} near={0.001} far={50}  opacity={2} blur={0.5} scale = {270} resolution={1024} />

        <directionalLight ref={dirLight} position={[1, 2, 3]} intensity={4.5} />

        <ambientLight intensity={1.5} />

        <Sky/>

        <Model/>

    </>
}