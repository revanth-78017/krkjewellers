import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  category: string | null;
  stock_quantity: number | null;
  metal_type: string | null;
  gemstone: string | null;
  weight: string | null;
}

export const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-12">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-64 rounded-lg mb-4" />
                <div className="bg-muted h-6 rounded mb-2" />
                <div className="bg-muted h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-accent/5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl font-bold text-center mb-4">
            Our Exquisite Collection
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover our handpicked selection of fine jewelry, each piece crafted with precision and passion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/50 bg-gradient-to-br from-background to-accent/5">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.category && (
                    <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
                      {product.category}
                    </Badge>
                  )}
                  {product.stock_quantity !== null && product.stock_quantity < 5 && (
                    <Badge variant="destructive" className="absolute top-4 left-4 backdrop-blur-sm">
                      Only {product.stock_quantity} left
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.metal_type && (
                      <Badge variant="outline" className="text-xs">
                        {product.metal_type}
                      </Badge>
                    )}
                    {product.gemstone && (
                      <Badge variant="outline" className="text-xs">
                        {product.gemstone}
                      </Badge>
                    )}
                    {product.weight && (
                      <Badge variant="outline" className="text-xs">
                        {product.weight}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-playfair text-2xl font-bold text-primary">
                      ₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
