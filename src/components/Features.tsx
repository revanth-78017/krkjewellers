import { motion } from "framer-motion";
import { Wand2, Eye, Sparkles, Palette, ShoppingBag, Users } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Wand2,
    title: "AI Design Generator",
    description: "Create custom jewelry designs using advanced AI technology",
  },
  {
    icon: Eye,
    title: "3D Visualization",
    description: "View your designs in stunning 3D with real-time rendering",
  },
  {
    icon: Sparkles,
    title: "Virtual Try-On",
    description: "See how jewelry looks on you with AR technology",
  },
  {
    icon: Palette,
    title: "Customization Studio",
    description: "Choose materials, gemstones, and personalize every detail",
  },
  {
    icon: ShoppingBag,
    title: "Seamless Shopping",
    description: "Easy ordering and secure checkout experience",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Get guidance from jewelry experts throughout your journey",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-6"
          >
            Why Choose KRK Jewellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-inter"
          >
            Experience the perfect blend of traditional craftsmanship and cutting-edge technology
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full border-border hover:border-primary/50 transition-all hover:shadow-[var(--shadow-gold)] bg-card/50 backdrop-blur-sm">
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-playfair text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-inter">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
