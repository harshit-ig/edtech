import { Canvas } from "@react-three/fiber";
import Globe from "../globe";
import Typewriter from "typewriter-effect";
import TechBackground from "../TechBackground";
import RoleCarousel from "./RoleCarousel";
import { companyInfo } from "../data/about";

export default function Hero() {
  return (
    <header className="relative min-h-[600px] h-[90vh] max-h-[800px] lg:max-h-none lg:h-screen flex items-center overflow-hidden pt-20 scroll-mt-24">
      {/* Background Layer - Animated Tech Elements */}
      <div className="absolute inset-0 -z-20">
        <TechBackground className="mix-blend-screen" />
      </div>
      
      {/* Globe positioned CENTER on mobile, LEFT with padding on medium+ screens */}
      <div className="absolute inset-0 md:left-8 md:top-8 md:w-1/2 h-full flex items-center justify-center -z-10">
        <div className="w-[650px] h-[650px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Globe />
          </Canvas>
        </div>
      </div>
      
      {/* Role Carousel positioned on RIGHT side as background - hidden on small screens */}
      <div className="absolute right-8 md:right-12 lg:right-16 xl:right-50 top-0 w-1/2 h-full items-center justify-end hidden md:flex -z-10">
        <RoleCarousel rolesList={companyInfo.carouselRoles} interval={3000} />
      </div>
      
      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-edtech-blue/30 via-transparent to-edtech-blue/30 -z-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-deep/60 -z-5" />
      
      {/* Main Content Container - Text overlaid on LEFT side over the earth */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:pl-16 lg:pl-16 xl:pl-16 w-full h-full flex items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="h-[120px] sm:h-[140px] lg:h-[160px] flex items-start justify-center md:justify-start mb-6">
            <h1 className="type-glow text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide leading-tight">
              <Typewriter
                options={{
                  strings: companyInfo.heroRoles,
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 20,
                  cursor: '<span class="cursor-neon">|</span>'
                }}
              />
            </h1>
          </div>
          <p className="text-white/95 text-lg md:text-xl text-glow-white mb-8 max-w-2xl md:max-w-none">
            Choose tech courses that fit your goals and shape a successful digital future.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
            <a id="get-started" href="#featured-programs" className="cta cta-primary">Get Started</a>
            <a href="#contact" className="cta cta-secondary">Talk to us</a>
          </div>
        </div>
      </div>
    </header>
  );
}

