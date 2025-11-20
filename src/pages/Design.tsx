import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Design = () => {
  const [prompt, setPrompt] = useState("");
  const [jewelryType, setJewelryType] = useState("ring");
  const [material, setMaterial] = useState("gold");
  const [gemstone, setGemstone] = useState("diamond");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please describe your dream jewelry design",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const enhancedPrompt = `Create a high-end luxury ${jewelryType} made of ${material} with ${gemstone} gemstones. Design details: ${prompt}. Style: photorealistic, jewelry photography, studio lighting, white background, 8K resolution, ultra detailed`;

      const { data, error } = await supabase.functions.invoke("generate-jewelry-design", {
        body: { prompt: enhancedPrompt },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Success!",
          description: "Your jewelry design has been generated",
        });
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
              AI Jewelry Designer
            </h1>
            <p className="text-lg text-muted-foreground font-inter">
              Describe your dream jewelry and watch AI bring it to life
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jewelryType" className="font-inter">Jewelry Type</Label>
                <Select value={jewelryType} onValueChange={setJewelryType}>
                  <SelectTrigger id="jewelryType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ring">Ring</SelectItem>
                    <SelectItem value="necklace">Necklace</SelectItem>
                    <SelectItem value="earrings">Earrings</SelectItem>
                    <SelectItem value="bracelet">Bracelet</SelectItem>
                    <SelectItem value="pendant">Pendant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="material" className="font-inter">Material</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="material">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="white-gold">White Gold</SelectItem>
                    <SelectItem value="rose-gold">Rose Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gemstone" className="font-inter">Gemstone</Label>
                <Select value={gemstone} onValueChange={setGemstone}>
                  <SelectTrigger id="gemstone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="sapphire">Sapphire</SelectItem>
                    <SelectItem value="emerald">Emerald</SelectItem>
                    <SelectItem value="pearl">Pearl</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="font-inter">Design Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe your dream jewelry... (e.g., 'elegant vintage style with intricate floral patterns')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none font-inter"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter text-lg py-6"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Design
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-8 flex items-center justify-center bg-accent/5">
              {generatedImage ? (
                <div className="space-y-4 w-full">
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
                    <img
                      src={generatedImage}
                      alt="Generated jewelry design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = generatedImage;
                      link.download = "jewelry-design.png";
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Design
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Wand2 className="w-20 h-20 text-muted-foreground mx-auto opacity-50" />
                  <p className="text-muted-foreground font-inter">
                    Your generated design will appear here
                  </p>
                </div>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Design;
