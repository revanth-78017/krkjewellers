import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface MetalRate {
  metal: string;
  price: number;
  currency: string;
  timestamp: number;
  ch: number;
  chp: number;
}

export const GoldRates = () => {
  const [goldRate, setGoldRate] = useState<MetalRate | null>(null);
  const [silverRate, setSilverRate] = useState<MetalRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetalRates = async () => {
      try {
        // Fetch both gold and silver rates in INR
        const [goldResponse, silverResponse] = await Promise.all([
          fetch('https://www.goldapi.io/api/XAU/INR', {
            headers: {
              'x-access-token': 'a0feb8d8550d4a7a208744e2aeb2073e',
            },
          }),
          fetch('https://www.goldapi.io/api/XAG/INR', {
            headers: {
              'x-access-token': 'a0feb8d8550d4a7a208744e2aeb2073e',
            },
          }),
        ]);

        if (!goldResponse.ok || !silverResponse.ok) throw new Error('Failed to fetch');

        const goldData = await goldResponse.json();
        const silverData = await silverResponse.json();

        setGoldRate({
          metal: goldData.metal,
          price: goldData.price,
          currency: goldData.currency,
          timestamp: goldData.timestamp,
          ch: goldData.ch || 0,
          chp: goldData.chp || 0,
        });

        setSilverRate({
          metal: silverData.metal,
          price: silverData.price,
          currency: silverData.currency,
          timestamp: silverData.timestamp,
          ch: silverData.ch || 0,
          chp: silverData.chp || 0,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching metal rates:', err);
        // Set demo data as fallback (Indian prices)
        setGoldRate({
          metal: 'XAU',
          price: 6850.00,
          currency: 'INR',
          timestamp: Date.now() / 1000,
          ch: 85.50,
          chp: 1.26,
        });
        setSilverRate({
          metal: 'XAG',
          price: 82.50,
          currency: 'INR',
          timestamp: Date.now() / 1000,
          ch: -0.85,
          chp: -1.02,
        });
        setError(true);
        setLoading(false);
      }
    };

    fetchMetalRates();
    const interval = setInterval(fetchMetalRates, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 text-sm font-inter">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!goldRate || !silverRate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 text-sm font-inter"
    >
      {/* Gold Rate */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Gold:</span>
        <span className="font-semibold text-primary">
          ₹{goldRate.price.toFixed(2)}/10g
        </span>
        {goldRate.chp >= 0 ? (
          <TrendingUp className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
        )}
        <span className={`text-xs ${goldRate.chp >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {goldRate.chp >= 0 ? '+' : ''}{goldRate.chp.toFixed(2)}%
        </span>
      </div>

      {/* Silver Rate */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Silver:</span>
        <span className="font-semibold text-secondary">
          ₹{silverRate.price.toFixed(2)}/kg
        </span>
        {silverRate.chp >= 0 ? (
          <TrendingUp className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
        )}
        <span className={`text-xs ${silverRate.chp >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {silverRate.chp >= 0 ? '+' : ''}{silverRate.chp.toFixed(2)}%
        </span>
      </div>
    </motion.div>
  );
};
