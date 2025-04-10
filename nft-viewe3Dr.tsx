import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const CID_METADATA = 'bafybeihabcde123456789...'; // Replace with your metadata CID
const CID_MODELS = 'bafybeihxyzmodels456789...'; // Replace with your models CID

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

export default function NFTViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [metadata, setMetadata] = useState<any>(null);
  const paddedId = (id || '001').toString().padStart(3, '0');

  useEffect(() => {
    if (!id) return;
    fetch(`https://ipfs.io/ipfs/${CID_METADATA}/${paddedId}.json`)
      .then(res => res.json())
      .then(data => setMetadata(data))
      .catch(console.error);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      <div className="w-full md:w-1/3 p-6 space-y-4 bg-[#111]">
        <h1 className="text-purple-400 text-2xl font-bold">
          {metadata?.name || 'Loading...'}
        </h1>
        <div>
          <h2 className="text-lg font-semibold">DNA Traits</h2>
          <ul className="text-sm space-y-1">
            {metadata?.dna && Object.entries(metadata.dna).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value.toString()}</li>
            ))}
          </ul>
        </div>
        {metadata?.personality_profile && (
          <div>
            <h2 className="text-lg font-semibold mt-4">🧠 Personality</h2>
            <ul className="text-sm space-y-1">
              {Object.entries(metadata.personality_profile).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full md:w-2/3 h-[500px] md:h-auto relative">
        {metadata?.animation_url ? (
          <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[0, 5, 5]} />
            <Model url={metadata.animation_url.replace('ipfs://', 'https://ipfs.io/ipfs/')} />
            <OrbitControls enableZoom enableRotate />
          </Canvas>
        ) : (
          <div className="text-center pt-20 text-gray-400">Loading 3D Model...</div>
        )}
      </div>
    </div>
  );
}

// ✅ تم تعديل هذا السطر لتفادي الخطأ في المسار
useGLTF.preload(`https://ipfs.io/ipfs/${CID_MODELS}/001.glb`);
