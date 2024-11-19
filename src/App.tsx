import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
const colors = ["#FCFC62", "#4062BB", "#F7A072", "#D90368"];
const shapes = ["box", "sphere", "capsule", "capsule", "cone", "torus"];

export default function App() {
    const bgRef = useRef<HTMLDivElement | null>(null);
    const { speed, spread, objectCount } = useControls({
        blurMode: {
            value: false,
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
            min: 1.1,
            max: 6,
            step: 0.05,
        },
        spread: {
            value: 1,
            min: 0,
            max: 1.5,
            step: 0.05,
        },
    });

    const [shapes, setShapes] = useState([
        "box",
        "sphere",
        "capsule",
        "capsule",
        "cone",
        "torus",
    ]);
    useEffect(() => {
        const newShapes = fillRandomShapes(objectCount);
        setShapes([]);
        setShapes([...newShapes]);
        setShapes;
    }, [objectCount]);

    return (
        <>
            <div className="divvie">
                <p>Skibidi</p>
            </div>
            <div ref={bgRef} id="SceneDiv">
                <Canvas>
                    {shapes.map((key, index) => {
                        const pos = (index - shapes.length / 2 + 0.1) * spread;
                        const randomColor = getRandomColor();
                        return (
                            <Float
                                speed={speed}
                                rotationIntensity={Math.random() * 5}
                                floatIntensity={5}
                                key={index}
                            >
                                <mesh position={[pos, 0, 0]}>
                                    {key === "box" && (
                                        <boxGeometry args={[1.5, 1.5, 1.5]} />
                                    )}
                                    {key === "sphere" && (
                                        <sphereGeometry args={[1.3, 32, 32]} />
                                    )}
                                    {key === "capsule" && (
                                        <capsuleGeometry
                                            args={[0.5, 1.2, 2, 8]}
                                        />
                                    )}
                                    {key === "cone" && (
                                        <coneGeometry args={[1.8, 3, 16]} />
                                    )}
                                    {key === "torus" && (
                                        <torusGeometry
                                            args={[1.2, 0.6, 16, 100]}
                                        />
                                    )}
                                    <meshPhongMaterial color={randomColor} />
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
    const randNum = Math.floor(Math.random() * colors.length); // Fix random calculation
    return colors[randNum];
};

const fillRandomShapes = (count: number): Array<string> => {
    let retVal: Array<string> = [];
    for (let i = 0; i < count; i++) {
        // Fix increment
        const randNum = Math.floor(Math.random() * shapes.length); // Fix random calculation
        retVal.push(shapes[randNum]);
    }
    return retVal;
};
