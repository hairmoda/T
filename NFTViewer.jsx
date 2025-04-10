import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

export default function NFTViewer({ glbUrl }) {
  const gltf = useLoader(GLTFLoader, glbUrl.replace("ipfs://", "https://ipfs.io/ipfs/"));
  return (
    <Canvas style={{ height: 300 }}>
      <ambientLight intensity={0.5} />
      <primitive object={gltf.scene} />
      <OrbitControls />
    </Canvas>
  );
}