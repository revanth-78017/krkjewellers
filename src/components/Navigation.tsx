import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Gem, Menu, X, User, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldRates } from "./GoldRates";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Gem className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              KRK Jewellers
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <GoldRates />
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-inter">
              Home
            </Link>
            <Link to="/design" className="text-foreground hover:text-primary transition-colors font-inter">
              AI Design
            </Link>
            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors font-inter">
              Gallery
            </Link>
            <Link to="/customize" className="text-foreground hover:text-primary transition-colors font-inter">
              Customize
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                {isAdmin && (
                  <Button
                    onClick={() => navigate("/admin")}
                    variant="outline"
                    className="gap-2 font-inter"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Button>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="gap-2 font-inter"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter"
              >
                Sign In
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4"
            >
              <Link
                to="/"
                className="block text-foreground hover:text-primary transition-colors font-inter"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/design"
                className="block text-foreground hover:text-primary transition-colors font-inter"
                onClick={() => setIsOpen(false)}
              >
                AI Design
              </Link>
              <Link
                to="/gallery"
                className="block text-foreground hover:text-primary transition-colors font-inter"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/customize"
                className="block text-foreground hover:text-primary transition-colors font-inter"
                onClick={() => setIsOpen(false)}
              >
                Customize
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                    <User className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  {isAdmin && (
                    <Button
                      onClick={() => {
                        navigate("/admin");
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full gap-2 font-inter"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full gap-2 font-inter"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter"
                >
                  Sign In
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
