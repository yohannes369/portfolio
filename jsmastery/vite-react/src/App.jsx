import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshLambertMaterial color={0x468585} emissive={0x468585} />
     <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color={"orange"} />
    </mesh>
  );
};

const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Canvas>
        <OrbitControls enableZoom enablePan enableRotate={true} />
        <directionalLight position={[1, 1, 1]} intensity={10} color={0x9cdba6} />
        <color attach="background" args={["#f0f0f0"]} />
        <RotatingCube />
      </Canvas>
    </div>
  );
};

export default App;
