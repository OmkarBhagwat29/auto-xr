import { OrbitControls } from "@react-three/drei";

export default function Experience() {

    return <>

        <OrbitControls/>

        <directionalLight position={[1, 2, 3]} intensity={4.5} />

        <ambientLight intensity={1.5} />
    </>
}