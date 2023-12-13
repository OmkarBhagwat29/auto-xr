import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import PanelUI from './components/PanelUI.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { DocProvider } from './context/DocContext.jsx'
import { RhinoProvider } from './context/RhinoContext.jsx'
import { VRButton, XR, Controllers, Hands } from '@react-three/xr'
import StartUp from './UI/StartUp.jsx'
import { Perf } from 'r3f-perf'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
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
                            <Perf position='top-left' />
                            <Controllers />
                            <Hands />
                            <StartUp />
                            <Experience />
                        </XR>

                    </Canvas>
    </StrictMode>
)