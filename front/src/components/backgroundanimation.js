import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const AnimatedSphere = ({ position, color }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      // Rotate the sphere
      sphereRef.current.rotation.x += 0.01;
      sphereRef.current.rotation.y += 0.01;

      // Move the sphere horizontally (left to right)
      sphereRef.current.position.x = Math.sin(Date.now() * 0.001) * 10; // Adjust speed and range
    }
  });

  return (
    <Sphere ref={sphereRef} args={[2, 32, 32]} position={position}>
      <meshBasicMaterial color={color} wireframe />
    </Sphere>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0, 15] }}
        style={{ background: '#ffffff' }} // Set canvas background to white
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* First Sphere (Black) */}
        <AnimatedSphere position={[-10, 0, 0]} color={0x000000} />

        {/* Second Sphere (Red) */}
        <AnimatedSphere position={[10, 0, 0]} color={0xff0000} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;