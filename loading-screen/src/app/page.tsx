'use client'

import { useEffect, useState, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const TAGS = [
  'Cybersecurity Learner',
  'Web Security',
  'Pentesting',
  '3D Web',
  'Frontend Developer',
  'React',
  'Three.js',
]

const FONT_URL = '/fonts/helvetiker_bold.typeface.json'

/* ─── 3D Text Component ─── */
function MalikText3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06
    }
    // Pulse emissive
    if (materialRef.current) {
      const t = state.clock.elapsedTime
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(t * 1.5) * 0.2
    }
  })

  return (
    <Center>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
        <group ref={groupRef}>
          <Text3D
            font={FONT_URL}
            size={1.4}
            height={0.4}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.04}
            bevelSize={0.025}
            bevelOffset={0}
            bevelSegments={6}
          >
            MALIK
            <meshStandardMaterial
              ref={materialRef}
              color="#8A2BE2"
              emissive="#8A2BE2"
              emissiveIntensity={0.5}
              roughness={0.15}
              metalness={0.85}
              envMapIntensity={2}
            />
          </Text3D>
        </group>
      </Float>
    </Center>
  )
}

/* ─── Floating particles ─── */
function Particles() {
  const count = 150
  const meshRef = useRef<THREE.InstancedMesh>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] + Math.sin(time * 0.3 + i * 0.5) * 0.2
      const y = positions[i * 3 + 1] + Math.cos(time * 0.2 + i * 0.3) * 0.2
      const z = positions[i * 3 + 2]
      dummy.position.set(x, y, z)
      const s = 0.012 + Math.sin(time * 0.8 + i) * 0.004
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#B366FF" transparent opacity={0.5} />
    </instancedMesh>
  )
}

/* ─── 3D Scene ─── */
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 8, 20]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#8A2BE2" />
      <pointLight position={[0, 2, 4]} intensity={3} color="#8A2BE2" distance={12} decay={2} />
      <pointLight position={[0, -2, 3]} intensity={1.5} color="#6B1FB2" distance={10} decay={2} />
      <spotLight
        position={[0, 5, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#B366FF"
      />

      <Suspense fallback={null}>
        <MalikText3D />
        <Particles />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}

/* ─── Loading fallback while 3D loads ─── */
function Loading3DFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#8A2BE2] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#8A2BE2]/40 text-xs tracking-widest uppercase">Initializing 3D</span>
      </div>
    </div>
  )
}

/* ─── Main Loading Screen ─── */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentTag, setCurrentTag] = useState(0)
  const [sceneReady, setSceneReady] = useState(false)

  // Mark scene ready after a short delay for canvas to mount
  useEffect(() => {
    const timer = setTimeout(() => setSceneReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Progress animation
  useEffect(() => {
    const duration = 3800
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const raw = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - raw, 3)
      setProgress(Math.round(eased * 100))

      if (raw < 1) {
        requestAnimationFrame(animate)
      } else {
        setProgress(100)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  // Tag rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTag((prev) => (prev + 1) % TAGS.length)
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <Suspense fallback={<Loading3DFallback />}>
        <Scene3D />
      </Suspense>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(138,43,226,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(138,43,226,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* UI Overlay - positioned at bottom */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-between py-12 md:py-16">
        {/* Top: "I'M" label */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: sceneReady ? 1 : 0, y: sceneReady ? 0 : -15 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-white/50 text-sm md:text-base tracking-[0.5em] uppercase font-light">
            I&apos;M
          </span>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          className="flex flex-col items-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sceneReady ? 1 : 0, y: sceneReady ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {/* Loading bar */}
          <div className="w-full max-w-xs px-8">
            <div className="relative h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #6B1FB2, #8A2BE2, #B366FF, #8A2BE2)',
                  backgroundSize: '300% 100%',
                }}
                animate={{
                  width: `${progress}%`,
                  backgroundPosition: ['0% 0%', '300% 0%'],
                }}
                transition={{
                  width: { duration: 0.1 },
                  backgroundPosition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              />
              {/* Glow on bar */}
              <div
                className="absolute top-0 left-0 h-full rounded-full blur-[4px] opacity-50"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8A2BE2, #B366FF)',
                }}
              />
            </div>

            {/* Percentage + rotating tag */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-white/20 text-[11px] font-mono tracking-wider">
                {progress}%
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTag}
                  className="text-[#8A2BE2]/40 text-[10px] tracking-[0.2em] uppercase"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.12 }}
                >
                  {TAGS[currentTag]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom marquee */}
          <div className="w-full overflow-hidden mt-8">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
                <span
                  key={i}
                  className="text-white/[0.06] text-[9px] uppercase tracking-[0.3em] mx-6"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
