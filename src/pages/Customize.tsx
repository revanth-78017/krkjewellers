import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const Customize = () => {
  const [material, setMaterial] = useState("gold");
  const [gemstone, setGemstone] = useState("diamond");
  const [size, setSize] = useState([7]);
  const [basePrice] = useState(5000);

  const materialPrices: Record<string, number> = {
    gold: 1,
    "white-gold": 1.1,
    "rose-gold": 1.15,
    platinum: 1.5,
    silver: 0.6,
  };

  const gemstonePrices: Record<string, number> = {
    diamond: 1,
    ruby: 0.9,
    sapphire: 0.85,
    emerald: 0.95,
    pearl: 0.5,
  };

  const calculatePrice = () => {
    return Math.round(basePrice * materialPrices[material] * gemstonePrices[gemstone]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Customize Your Jewelry
            </h1>
            <p className="text-lg text-muted-foreground font-inter">
              Create a unique piece tailored to your preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <h2 className="font-playfair text-2xl font-semibold mb-6">
                Customization Options
              </h2>

              <div className="space-y-2">
                <Label htmlFor="material" className="font-inter">Material</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="material">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold">24K Gold (+0%)</SelectItem>
                    <SelectItem value="white-gold">18K White Gold (+10%)</SelectItem>
                    <SelectItem value="rose-gold">18K Rose Gold (+15%)</SelectItem>
                    <SelectItem value="platinum">Platinum (+50%)</SelectItem>
                    <SelectItem value="silver">Sterling Silver (-40%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gemstone" className="font-inter">Primary Gemstone</Label>
                <Select value={gemstone} onValueChange={setGemstone}>
                  <SelectTrigger id="gemstone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diamond">Diamond (+0%)</SelectItem>
                    <SelectItem value="ruby">Ruby (-10%)</SelectItem>
                    <SelectItem value="sapphire">Sapphire (-15%)</SelectItem>
                    <SelectItem value="emerald">Emerald (-5%)</SelectItem>
                    <SelectItem value="pearl">Pearl (-50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="font-inter">Ring Size: {size[0]}</Label>
                <Slider
                  id="size"
                  value={size}
                  onValueChange={setSize}
                  min={4}
                  max={12}
                  step={0.5}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4</span>
                  <span>8</span>
                  <span>12</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-inter text-lg">Estimated Price:</span>
                  <span className="font-playfair text-3xl font-bold text-primary">
                    ${calculatePrice().toLocaleString()}
                  </span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter text-lg py-6">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-accent/5 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-primary/50 flex items-center justify-center">
                    <span className="font-playfair text-4xl">💍</span>
                  </div>
                </div>
                <p className="text-muted-foreground font-inter">
                  3D preview will appear here
                </p>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Customize;
