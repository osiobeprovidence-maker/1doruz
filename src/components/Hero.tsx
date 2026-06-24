import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section 
      className="relative h-[80vh] min-h-[600px] w-full border-b overflow-hidden"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* Left Side: Content */}
        <div className="relative z-20 flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-8 font-serif text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.05] italic" style={{ color: 'var(--foreground)' }}>
              Creating Sounds <br />
              <span className="not-italic text-brand-red-500">That Move The World</span>
            </h1>
            <p className="mb-12 max-w-lg text-lg font-light leading-relaxed text-[var(--secondary)]">
              From underground innovation to global mainstages. We curate the sonic future through uncompromising artistry and cinematic prestige.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                to="/releases"
                className="luxury-button bg-brand-red-500 text-[var(--background)] px-12 py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[var(--foreground)] transition-all duration-500 shadow-[0_0_20px_rgba(229,25,34,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Listen Latest
              </Link>
              <Link
                to="/submit-demo"
                className="luxury-button border px-12 py-5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Submit Demo
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Content */}
        <div className="relative flex-1 h-full overflow-hidden hidden md:block">
          <div 
            className="absolute inset-y-0 -left-px z-10 w-48 bg-gradient-to-r" 
            style={{ 
              backgroundImage: 'var(--hero-gradient)' 
            }}
          />
          <div className="h-full w-full group" style={{ backgroundColor: 'var(--card)' }}>
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              src="/src/assets/images/hero.jpg"
              className="h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-110"
              alt="Music Label Atmosphere"
              id="hero-main-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
