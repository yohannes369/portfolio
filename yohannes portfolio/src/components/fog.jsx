import React, { useEffect, useState } from "react";

const CursorSmokeTrail = ({ particleSize = 20, trailLength = 30, fadeSpeed = 0.02 }) => {
  const [trail, setTrail] = useState([]);

  // Track cursor movement and update the trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        size: particleSize * (0.5 + Math.random() * 0.5), // Randomize size for organic feel
        opacity: 1, // Start fully visible
        rotation: Math.random() * 360, // Random rotation for each particle
      };

      // Add the new particle to the trail
      setTrail((prevTrail) => {
        const newTrail = [newParticle, ...prevTrail.slice(0, trailLength - 1)];
        return newTrail;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [trailLength, particleSize]);

  // Gradually fade out and move particles in the trail
  useEffect(() => {
    const updateTrail = () => {
      setTrail((prevTrail) =>
        prevTrail
          .map((particle) => ({
            ...particle,
            x: particle.x + (Math.random() - 0.5) * 2, // Random horizontal drift
            y: particle.y - 1, // Move upward (like smoke)
            opacity: Math.max(particle.opacity - fadeSpeed, 0), // Reduce opacity
            size: particle.size * 0.98, // Gradually shrink
          }))
          .filter((particle) => particle.opacity > 0) // Remove fully faded particles
      );
    };

    const animationFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrame);
  }, [fadeSpeed]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 9999, // Ensure it stays on top
        pointerEvents: "none", // Prevent interference with other elements
      }}
    >
      {/* Render the trail of smoke particles */}
      {trail.map((particle, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${particle.opacity}), transparent)`,
            borderRadius: "50%",
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`,
            transition: "all 0.1s linear",
          }}
        />
      ))}
    </div>
  );
};

export default CursorSmokeTrail;