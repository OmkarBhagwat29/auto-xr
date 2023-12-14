import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import { VRButton, XR, Controllers, Hands } from '@react-three/xr'
import StartUp from './UI/StartUp.jsx'
import { Perf } from 'r3f-perf'
import { SocketProvider } from './context/SocketContext.jsx'
import { RhinoProvider } from './context/RhinoContext.jsx'
import { DocProvider } from './context/DocContext.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <SocketProvider>
            <RhinoProvider>
                <DocProvider>
                    <VRButton />
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
                            <StartUp />
                        </XR>
                    </Canvas>
                </DocProvider>
            </RhinoProvider>
        </SocketProvider>
    </StrictMode>
)