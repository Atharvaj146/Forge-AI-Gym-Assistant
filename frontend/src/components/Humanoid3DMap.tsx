"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

interface Humanoid3DMapProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

/* ─────────────────────────────────────────────────────────
   SINGLE 3D MUSCLE MESH COMPONENT
───────────────────────────────────────────────────────── */
function MuscleMesh({
  category,
  activeCategory,
  onSelect,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  geometryType = "box",
  args = [1, 1, 1],
}: {
  category: string;
  activeCategory: string;
  onSelect: (cat: string) => void;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  geometryType?: "box" | "sphere" | "capsule" | "cylinder";
  args?: any[];
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = activeCategory === category || hovered;

  const purpleActive = "#8B5CF6";
  const purpleGlow = "#A78BFA";
  const baseColor = "#1F2230";

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(category);
      }}
    >
      {geometryType === "box" && <boxGeometry args={args} />}
      {geometryType === "sphere" && <sphereGeometry args={args} />}
      {geometryType === "capsule" && <capsuleGeometry args={args} />}
      {geometryType === "cylinder" && <cylinderGeometry args={args} />}

      <meshStandardMaterial
        color={isActive ? purpleActive : baseColor}
        emissive={isActive ? purpleGlow : "#000000"}
        emissiveIntensity={isActive ? 0.6 : 0}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────
   3D ANATOMICAL HUMANOID FIGURE ASSEMBLY
───────────────────────────────────────────────────────── */
function HumanoidBody({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25; // Smooth slow 360-degree rotation
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head & Neck */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#2D3142" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.3]} />
        <meshStandardMaterial color="#1F2230" />
      </mesh>

      {/* SHOULDERS (Deltoids) */}
      <MuscleMesh
        category="Shoulders"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[-0.8, 1.5, 0]}
        geometryType="sphere"
        args={[0.26, 32, 32]}
      />
      <MuscleMesh
        category="Shoulders"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0.8, 1.5, 0]}
        geometryType="sphere"
        args={[0.26, 32, 32]}
      />

      {/* CHEST (Pectoralis Major) */}
      <MuscleMesh
        category="Chest"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[-0.32, 1.35, 0.2]}
        geometryType="box"
        args={[0.55, 0.42, 0.2]}
      />
      <MuscleMesh
        category="Chest"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0.32, 1.35, 0.2]}
        geometryType="box"
        args={[0.55, 0.42, 0.2]}
      />

      {/* BACK (Latissimus Dorsi & Traps) */}
      <MuscleMesh
        category="Back"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0, 1.25, -0.2]}
        geometryType="box"
        args={[1.1, 0.7, 0.2]}
      />

      {/* BICEPS */}
      <MuscleMesh
        category="Biceps"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[-0.85, 1.05, 0.1]}
        geometryType="capsule"
        args={[0.13, 0.35, 8, 16]}
      />
      <MuscleMesh
        category="Biceps"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0.85, 1.05, 0.1]}
        geometryType="capsule"
        args={[0.13, 0.35, 8, 16]}
      />

      {/* TRICEPS */}
      <MuscleMesh
        category="Triceps"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[-0.85, 1.05, -0.1]}
        geometryType="capsule"
        args={[0.13, 0.35, 8, 16]}
      />
      <MuscleMesh
        category="Triceps"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0.85, 1.05, -0.1]}
        geometryType="capsule"
        args={[0.13, 0.35, 8, 16]}
      />

      {/* FOREARMS */}
      <mesh position={[-0.92, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.5]} />
        <meshStandardMaterial color="#1F2230" />
      </mesh>
      <mesh position={[0.92, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.5]} />
        <meshStandardMaterial color="#1F2230" />
      </mesh>

      {/* ABS & CORE */}
      <mesh position={[0, 0.75, 0.12]}>
        <boxGeometry args={[0.6, 0.5, 0.15]} />
        <meshStandardMaterial color="#25293A" roughness={0.3} />
      </mesh>

      {/* LEGS (Quads & Hamstrings) */}
      <MuscleMesh
        category="Legs"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[-0.35, -0.2, 0]}
        geometryType="capsule"
        args={[0.22, 0.75, 8, 16]}
      />
      <MuscleMesh
        category="Legs"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0.35, -0.2, 0]}
        geometryType="capsule"
        args={[0.22, 0.75, 8, 16]}
      />

      {/* CALVES */}
      <MuscleMesh
        category="Legs"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[-0.35, -1.1, 0]}
        geometryType="capsule"
        args={[0.16, 0.6, 8, 16]}
      />
      <MuscleMesh
        category="Legs"
        activeCategory={activeCategory}
        onSelect={onSelectCategory}
        position={[0.35, -1.1, 0]}
        geometryType="capsule"
        args={[0.16, 0.6, 8, 16]}
      />
    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN 3D CANVAS WRAPPER COMPONENT
───────────────────────────────────────────────────────── */
export default function Humanoid3DMap({ activeCategory, onSelectCategory }: Humanoid3DMapProps) {
  const muscleLabels: Record<string, string> = {
    Chest: "Pectoralis Major (Upper & Mid Chest)",
    Back: "Latissimus Dorsi & Rhomboids",
    Biceps: "Biceps Brachii (Long & Short Head)",
    Triceps: "Triceps Brachii (Lateral & Long Head)",
    Shoulders: "Anterior & Lateral Deltoids",
    Legs: "Quadriceps, Hamstrings & Calves",
  };

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        padding: "2rem 1.5rem",
        marginBottom: "3.5rem",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div style={{
          display: "inline-block",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "#8B5CF6",
          background: "rgba(139, 92, 246, 0.12)",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          marginBottom: "0.5rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          3D INTERACTIVE ANATOMICAL ENGINE
        </div>
        <h3 style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          360° Humanoid Muscle Highlight Map
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
          Drag to spin the 3D body 360°. Hover or click any 3D muscle mesh to isolate exercise targets.
        </p>
      </div>

      {/* 3D CANVAS CONTAINER */}
      <div
        style={{
          width: "100%",
          height: "380px",
          borderRadius: "18px",
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, rgba(9, 10, 14, 0.95) 75%)",
          position: "relative",
          cursor: "grab",
        }}
      >
        <Canvas camera={{ position: [0, 0.5, 4.5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#8B5CF6" />
          <pointLight position={[0, -2, 2]} intensity={0.5} color="#A78BFA" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <HumanoidBody activeCategory={activeCategory} onSelectCategory={onSelectCategory} />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.75}
          />
        </Canvas>

        <div style={{
          position: "absolute",
          bottom: 12,
          right: 16,
          fontSize: "0.7rem",
          fontFamily: "var(--font-mono)",
          color: "rgba(255,255,255,0.4)",
          background: "rgba(0,0,0,0.4)",
          padding: "0.2rem 0.6rem",
          borderRadius: "6px",
          pointerEvents: "none",
        }}>
          DRAG TO ROTATE 360° • CLICK MUSCLE TO FILTER
        </div>
      </div>

      {/* ACTIVE TARGET BADGE */}
      <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(139, 92, 246, 0.15)",
          border: "1px solid var(--border-purple)",
          padding: "0.45rem 1.35rem",
          borderRadius: "9999px",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#A78BFA" }} />
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#FFFFFF" }}>
            3D Highlight Target: {activeCategory}
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            ({muscleLabels[activeCategory] || activeCategory})
          </span>
        </div>
      </div>
    </div>
  );
}
