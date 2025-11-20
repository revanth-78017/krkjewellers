import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";

const sampleJewelry = [
  {
    id: 1,
    name: "Elegant Diamond Ring",
    type: "Ring",
    material: "Platinum",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Sapphire Pendant",
    type: "Pendant",
    material: "White Gold",
    price: "$8,900",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Ruby Earrings",
    type: "Earrings",
    material: "Rose Gold",
    price: "$6,750",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Emerald Necklace",
    type: "Necklace",
    material: "Gold",
    price: "$15,200",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Pearl Bracelet",
    type: "Bracelet",
    material: "Silver",
    price: "$3,400",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Diamond Bracelet",
    type: "Bracelet",
    material: "Platinum",
    price: "$18,900",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop",
  },
];

const Gallery = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Jewelry Gallery
          </h1>
          <p className="text-lg text-muted-foreground font-inter">
            Explore our curated collection of exquisite jewelry pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleJewelry.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-[var(--shadow-gold)] transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFavorite(item.id)}
                        className={favorites.includes(item.id) ? "bg-primary/20" : ""}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(item.id) ? "fill-primary text-primary" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-playfair text-xl font-semibold">{item.name}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground font-inter">
                    <span>{item.type}</span>
                    <span>{item.material}</span>
                  </div>
                  <p className="text-2xl font-bold text-primary font-inter">{item.price}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
