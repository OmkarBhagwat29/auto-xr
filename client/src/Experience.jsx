import { OrbitControls } from "@react-three/drei";
import Model from "./components/Model";

export default function Experience() {

    return <>
        <OrbitControls/>
        <ambientLight intensity={1.5} />
        <Model/>
    </>
}