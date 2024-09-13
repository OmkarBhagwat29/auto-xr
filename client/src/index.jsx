import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import { XR, Controllers, Hands } from '@react-three/xr'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <App />

        <Canvas
            shadows={true}
            camera={{
                fov: 45,
                near: 0.1,
                far: 5000,
                position: [2.5, 5, 5],

            }}
        >

            <XR>
                <Controllers />
                <Hands />
                <Experience />
                {/* <StartUp /> */}
            </XR>
        </Canvas>

    </StrictMode>
)