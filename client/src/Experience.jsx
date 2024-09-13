import { OrbitControls, ContactShadows, Sky } from "@react-three/drei";


export default function Experience() {

    return <>
        <Sky />
        <OrbitControls />

        {/* <ContactShadows position={[0, -0.01, 0]} near={0.001} far={500} opacity={2} blur={0.5} scale={100} resolution={1024} /> */}

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        {/* <Model /> */}
    </>
}