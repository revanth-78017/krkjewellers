import { Button } from "./ui/button";
import { Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-inter text-primary">AI-Powered Jewelry Design</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl font-bold leading-tight"
          >
            Design Your Dream
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Luxury Jewelry
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto"
          >
            Experience the future of jewelry design with AI-powered customization,
            3D visualization, and virtual try-on technology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/design">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter text-lg px-8 py-6 shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-elegant)] transition-all"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Start Designing
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="font-inter text-lg px-8 py-6 border-2 border-primary/20 hover:bg-primary/5"
              >
                View Gallery
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-12"
          >
            <div className="relative mx-auto w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-20 h-20 text-primary animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
