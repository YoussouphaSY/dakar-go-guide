import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { TextureLoader } from 'three';
import { useTexture } from '@react-three/drei';
import placeholderImage from '@/assets/ai-assistant.png';
import aiAssistantJpg from '@/assets/ayo-mascot-official.jpg';

extend({ OrbitControls: ThreeOrbitControls });

function OrbitControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<ThreeOrbitControls | null>(null);

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controlsRef.current = controls;

    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => controlsRef.current?.update());

  return null;
}

function MuseumRoom() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2C1810" roughness={0.8} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 3, -15]}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#4A3428" roughness={0.9} />
      </mesh>
      <mesh position={[-15, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#4A3428" roughness={0.9} />
      </mesh>
      <mesh position={[15, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#4A3428" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>

      {/* Columns */}
      {[-10, 0, 10].map((x, index) => (
        <group key={index}>
          <mesh position={[x, 2, -12]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.7} />
          </mesh>
          <mesh position={[x, 2, 12]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Exhibition platforms */}
      <mesh position={[-8, -0.5, -5]} castShadow>
        <boxGeometry args={[4, 0.5, 4]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.6} />
      </mesh>
      <mesh position={[8, -0.5, -5]} castShadow>
        <boxGeometry args={[4, 0.5, 4]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Artwork({ position, onClick, imageUrl }: {
  position: [number, number, number],
  onClick: () => void,
  imageUrl: string
}) {
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);

  // Essayer de charger la texture réelle, sinon utiliser le fallback
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {
        console.error("Erreur de chargement pour :", imageUrl);
        setError(true);
        // Fallback immédiat vers une image connue
        loader.load('/assets/ayo-mascot-official.jpg', (fallbackTex) => {
          fallbackTex.colorSpace = THREE.SRGBColorSpace;
          setTexture(fallbackTex);
        });
      }
    );
  }, [imageUrl]);

  return (
    <group position={position}>
      {/* Background frame */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[3.4, 4.4]} />
        <meshStandardMaterial color={hovered ? "#D4AF37" : "#8B4513"} />
      </mesh>

      {/* Artwork plane */}
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial
          map={texture}
          transparent={!texture}
          opacity={texture ? 1 : 0.5}
          color={texture ? "white" : "#3A2A1A"}
          emissive={hovered ? "#D4AF37" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spotlight for each artwork */}
      <spotLight
        position={[0, 2, 2]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.8}
        color="#FFFFFF"
        target-position={position}
      />
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} castShadow />
      <spotLight position={[-8, 6, -5]} angle={0.6} intensity={1} color="#D4AF37" castShadow />
      <spotLight position={[8, 6, -5]} angle={0.6} intensity={1} color="#D4AF37" castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#F5F5DC" />
    </>
  );
}

export default function MuseumScene({
  artworks,
  onArtworkClick,
}: {
  artworks: Array<{ id: string, title: string, imageUrl: string, position: [number, number, number] }>,
  onArtworkClick: (id: string) => void,
}) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    console.log("Chargement des images commencé...");
    console.log("Liste des œuvres :", artworks);
  }, []);

  useEffect(() => {
    console.log(`Progression du chargement : ${loadingProgress}%`);
    if (imagesLoaded) {
      console.log("Toutes les images sont chargées !");
    }
  }, [loadingProgress, imagesLoaded]);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 10], fov: 75 }} shadows>
        <Suspense fallback={null}>
          <MuseumRoom />
          <Lighting />
          {artworks.map((artwork) => (
            <Artwork
              key={artwork.id}
              position={artwork.position}
              imageUrl={artwork.imageUrl}
              onClick={() => onArtworkClick(artwork.id)}
            />
          ))}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
