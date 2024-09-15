
import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            shadows={true}
            camera={{
                fov: 45,
                near: 0.1,
                far: 5000,
                position: [2.5, 5, 5],

            }}
        >
            <Experience />
            <App />

        </Canvas>

    </StrictMode>
)