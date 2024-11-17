import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, Dodecahedron } from "@react-three/drei";
import { useRef, useState } from "react";
import { Vector3 } from "three";

export default function App() {
    const [mousePosition, setMousePosition] = useState(new Vector3());
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1; // Normalize X
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1; // Normalize Y

            // Map normalized coordinates to 3D space
            setMousePosition(new Vector3(x * 5, y * 5, 1.5)); // Adjust scaling as needed
        }
    };

    return (
        <>
            <div className="divvie">
                <p>Skibidi</p>
            </div>
            <div onMouseMove={handleMouseMove} id="SceneDiv" ref={divRef}>
                <Canvas>
                    <Float speed={1.2} rotationIntensity={9} floatIntensity={4}>
                        <mesh position={[1.3, 0.1, -1]}>
                            <boxGeometry args={[1.8, 1.8, 1.8]} />
                            <meshPhongMaterial color="#fd19cc" />
                        </mesh>
                    </Float>

                    <Float speed={1.5} floatIntensity={10}>
                        <mesh>
                            <sphereGeometry args={[1.3, 32, 32]} />
                            <meshStandardMaterial color="#456990" />
                        </mesh>
                    </Float>
                    <Float
                        speed={1.2}
                        rotationIntensity={5}
                        floatIntensity={10}
                    >
                        <mesh position={[-1, 0, 1]}>
                            <capsuleGeometry args={[0.5, 1.2, 2, 8]} />
                            <meshStandardMaterial color="yellow" />
                        </mesh>
                    </Float>

                    {/* Sphere following mouse position */}
                    <mesh position={mousePosition.toArray()}>
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshStandardMaterial color="black" />
                    </mesh>

                    <Float speed={2} rotationIntensity={5} floatIntensity={1}>
                        <mesh position={[-0.5, 0, 0]}>
                            <coneGeometry args={[1.8, 3, 16]} />
                            <meshStandardMaterial color="#F45B69" />
                        </mesh>
                    </Float>
                    <Float speed={3} rotationIntensity={5} floatIntensity={1}>
                        <mesh position={[-1, 0, 0]}>
                            <torusGeometry args={[1.2, 0.6, 16, 100]} />
                            <meshStandardMaterial color="#363358" />
                        </mesh>
                    </Float>

                    <Environment preset="apartment" />
                    <directionalLight position={[0, 0, 1]} />
                </Canvas>
            </div>
        </>
    );
}
