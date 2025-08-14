import { Canvas } from "@react-three/fiber";
import Globe from "../globe";
import Typewriter from "typewriter-effect";
import FloatingDots from "../FloatingDots";
import RoleCarousel from "./RoleCarousel";

export default function Hero() {
  const rolesList = [
    "Data Analyst",
    "Data Scientist",
    "Business Analyst",
    "Machine Learning Engineer",
    "AI Researcher",
    "Product Manager",
    "Data Engineer"
  ];
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden pt-20 scroll-mt-24">
      <div className="absolute inset-0 -z-10 pt-20">
        <FloatingDots numDots={120} className="mix-blend-screen" />
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Globe />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-bg-deep/80" />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center select-none">
        <h1 className="type-glow text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
          <Typewriter
            options={{
              strings: [
                'Data • AI • Analytics',
                'Cloud • Cybersecurity',
                'Web Development',
                'Mobile Apps',
              ],
              autoStart: true,
              loop: true,
              delay: 40,
              deleteSpeed: 20,
              cursor: '<span class="cursor-neon">|</span>'
            }}
          />
        </h1>
        <p className="mt-6 text-white/80 max-w-2xl mx-auto text-glow-blue">
          Choose tech courses that fit your goals and shape a successful digital future.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a id="get-started" href="#features" className="cta cta-primary">Get Started</a>
          <a href="#contact" className="cta cta-secondary">Talk to us</a>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <RoleCarousel rolesList={rolesList} interval={3000} />
        </div>
      </div>
    </header>
  );
}

