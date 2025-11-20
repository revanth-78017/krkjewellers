import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { GoldPriceChart } from "@/components/GoldPriceChart";
import { ProductsSection } from "@/components/ProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <GoldPriceChart />
      </div>
      <ProductsSection />
      <Features />
    </div>
  );
};

export default Index;
