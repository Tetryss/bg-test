import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
const colors = [
    "#FCFC62",
    "#4062BB",
    "#F7A072",
    "#D90368",
    "#34A853",
    "#EA4335",
    "#FBBC05",
    "#4285F4",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
];
const shapes = ["box", "sphere", "capsule", "cone", "torus"];

export default function App() {
    const bgRef = useRef<HTMLDivElement | null>(null);
    const { speed, spread, objectCount, intensity } = useControls({
        blurMode: {
            value: true,
            onChange: (newValue) => {
                if (bgRef.current) {
                    bgRef.current.setAttribute(
                        "data-blur",
                        JSON.stringify(newValue)
                    );
                }
            },
        },
        objectCount: {
            value: 1,
            min: 1,
            max: 10,
            step: 1,
        },
        speed: {
            value: 1,
            min: 1,
            max: 6,
            step: 0.05,
        },
        spread: {
            value: 1,
            min: 0,
            max: 2,
            step: 0.05,
        },
        intensity: {
            value: 5,
            min: 0,
            max: 15,
            step: 1,
        },
    });

    const [shapes, setShapes] = useState([
        { color: "blue", name: "box" },
        { color: "blue", name: "sphere" },
        { color: "blue", name: "capsule" },
        { color: "blue", name: "cone" },
        { color: "blue", name: "torus" },
    ]);
    useEffect(() => {
        const newShapes = fillRandomShapes(objectCount);
        setShapes([]);
        setShapes([...newShapes]);
    }, [objectCount]);

    return (
        <>
            {/* <div className="divvie">
                <p>Skibidi</p>
            </div> */}
            <div ref={bgRef} id="SceneDiv">
                <Canvas>
                    {shapes.map(({ color, name }, index) => {
                        const pos = (index - shapes.length / 2 + 0.5) * spread;
                        const randSquare = Math.random() + 1;
                        const randCircle = Math.random() / 2 + 1;
                        const randTorus = Math.random() / 2 + 0.5;

                        return (
                            <Float
                                speed={speed}
                                rotationIntensity={(Math.random() + 1) * 5}
                                floatIntensity={intensity}
                                key={index}
                            >
                                <mesh position={[pos, 0, 0]}>
                                    {name === "box" && (
                                        <boxGeometry
                                            args={[
                                                randSquare,
                                                randSquare,
                                                randSquare,
                                            ]}
                                        />
                                    )}
                                    {name === "sphere" && (
                                        <sphereGeometry
                                            args={[randCircle, 32, 32]}
                                        />
                                    )}
                                    {name === "capsule" && (
                                        <capsuleGeometry
                                            args={[0.5, 1.2, 2, 8]}
                                        />
                                    )}
                                    {name === "cone" && (
                                        <coneGeometry
                                            args={[
                                                randSquare * 0.8,
                                                randSquare * 2.7,
                                                16,
                                            ]}
                                        />
                                    )}
                                    {name === "torus" && (
                                        <torusGeometry
                                            args={[
                                                randTorus,
                                                randTorus - 0.3,
                                                16,
                                                100,
                                            ]}
                                        />
                                    )}
                                    <meshPhongMaterial color={color} />
                                </mesh>
                            </Float>
                        );
                    })}
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 0, 1]} />
                </Canvas>
            </div>
        </>
    );
}

const getRandomColor = (): string => {
    const randNum = Math.floor(Math.random() * colors.length);
    return colors[randNum];
};

const fillRandomShapes = (count: number) => {
    let retVal = [];
    for (let i = 0; i < count; i++) {
        // Fix increment
        const randNum = Math.floor(Math.random() * shapes.length);
        const col = getRandomColor();
        retVal.push({ color: col, name: shapes[randNum] });
    }
    return retVal;
};
