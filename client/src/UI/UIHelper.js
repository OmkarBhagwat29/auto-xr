import { Center, Text3D } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';


export const Button3d = React.forwardRef(({ transparent = false, opacity = 0.5, position = { x: 0, y: 2, z: 0 }, text, width = 1, height = 1, color = 'white', onClick }, ref) => {

  const plane = new THREE.PlaneGeometry(width, height);


  const radius = height / 2.0

  const circle1 = new THREE.CircleGeometry(radius, 64)
  const circle2 = new THREE.CircleGeometry(radius, 64)

  circle1.translate(-width / 2, 0, 0)
  circle2.translate(width / 2, 0, 0)


  // Merge the geometries
  const mergedGeometry =
    BufferGeometryUtils.mergeGeometries([plane, circle1, circle2]);

  // Set the merged geometry to the mesh
  const mergeMesh = new THREE.Mesh(mergedGeometry, new THREE.MeshStandardMaterial({ 'color': color, 'side': THREE.DoubleSide, transparent: transparent, opacity: opacity }))

  return <group ref={ref} >
    <primitive  position={[position.x, position.y, position.z]} object={mergeMesh} onClick={onClick} />
    {text && <Center position={[position.x, position.y, position.z+0.055]}>
      <mesh >
      <Text3D font="./fonts/helvetiker_regular.typeface.json" size={height*0.55} height={0.1}
      material={new THREE.MeshStandardMaterial({'color':'pink'})}>
        {text}
      </Text3D>
    </mesh>
    </Center>}
  </group>

})