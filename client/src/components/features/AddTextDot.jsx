import '../../index.css';
import React from 'react'
import { Html } from '@react-three/drei'

const AddTextDot = ({ textContent, position }) => {
  return (
    <Html position={position} >
      <div className='bg-blue-400 px-2 py-2 bg-opacity-50 rounded-md whitespace-pre'>
        {textContent}
      </div>
    </Html>
  )
}

export default AddTextDot
