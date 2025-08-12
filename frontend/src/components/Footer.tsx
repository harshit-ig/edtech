import FloatingDots from "../FloatingDots";
import WhiteLogo from "../assets/WHITE-LOGO--300x152.png";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 border-t border-white/10 bg-black/40 relative overflow-hidden">
      <FloatingDots numDots={80} maxRadius={2} className="opacity-70 -z-10" />
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-8">
        <div>
          <img src={WhiteLogo} alt="EdTech Informative" className="h-8 w-auto" />
          <p className="mt-2 text-white/70">Your gateway to future‑ready careers.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Product</h4>
          <ul className="space-y-1 text-white/70">
            <li><a href="#features" className="hover:text-edtech-orange">Features</a></li>
            <li><a href="#stats" className="hover:text-edtech-orange">Stats</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-white/70">
            <li><a href="#" className="hover:text-edtech-orange">About</a></li>
            <li><a href="#" className="hover:text-edtech-orange">Careers</a></li>
          </ul>
        </div>
        <div className="flex items-end md:items-start">
          <a className="cta cta-primary" href="#get-started">Get Started</a>
        </div>
      </div>
    </footer>
  );
}

