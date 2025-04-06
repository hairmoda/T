// pages/nft-viewer.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import Head from 'next/head'

function Model() {
  const glb = useGLTF('https://blue-tiny-peacock-226.mypinata.cloud/ipfs/bafkreicl3ginqxo5t66r5k5ioqyeguj3oijszxs5f2v6vxnaxvq4nw6kkq')
  return <primitive object={glb.scene} scale={1.5} />
}

export default function NFTViewer() {
  return (
    <>
      <Head>
        <title>3D NFT Viewer | Metaverse</title>
      </Head>
      <div style={{ height: '100vh', backgroundColor: '#0a0a0a' }}>
        <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[0, 5, 5]} />
          <Model />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>
    </>
  )
}
