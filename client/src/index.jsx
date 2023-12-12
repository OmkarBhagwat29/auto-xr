import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import PanelUI from './components/PanelUI.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { DocProvider } from './context/DocContext.jsx'
import { RhinoProvider } from './context/RhinoContext.jsx'
import {VRButton,XR,Controllers,Hands} from '@react-three/xr'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <VRButton/>
        <SocketProvider>
            <RhinoProvider>
                <DocProvider>
                    <PanelUI />
                    <Canvas
                        shadows={true}
                        shadowMap
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 5000,
                            position: [2.5, 40, 60],

                        }}
                    >
                        <XR>
                            <Controllers/>
                            <Hands/>
                            <Experience />
                        </XR>

                    </Canvas>
                </DocProvider>
            </RhinoProvider>

        </SocketProvider>

    </StrictMode>
)