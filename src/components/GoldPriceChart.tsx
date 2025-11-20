import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, subMonths } from "date-fns";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface PricePoint {
  date: string;
  price: number;
  timestamp: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: PricePoint }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-inter text-muted-foreground mb-1">
          {format(new Date(data.timestamp * 1000), "MMM dd, yyyy HH:mm")}
        </p>
        <p className="text-lg font-semibold text-primary font-playfair">
          ₹{data.price.toFixed(2)} / 10g
        </p>
      </div>
    );
  }
  return null;
};

export const GoldPriceChart = () => {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });

  // Generate demo data as fallback
  const generateDemoData = (days: number): PricePoint[] => {
    const basePrice = 6850;
    const data: PricePoint[] = [];
    const now = Date.now();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const variation = Math.sin(i / 3) * 80 + Math.random() * 50;
      const price = basePrice + variation;
      
      data.push({
        date: format(date, "MMM dd"),
        price: Number(price.toFixed(2)),
        timestamp: Math.floor(date.getTime() / 1000),
      });
    }
    return data;
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const days = period === "week" ? 7 : 30;
        const promises: Promise<Response>[] = [];
        
        // Try to fetch historical data for each day
        for (let i = 0; i <= days; i++) {
          const date = format(
            period === "week" ? subDays(new Date(), i) : subDays(new Date(), i),
            "yyyyMMdd"
          );
          
          promises.push(
            fetch(`https://www.goldapi.io/api/XAU/INR/${date}`, {
              headers: {
                'x-access-token': 'a0feb8d8550d4a7a208744e2aeb2073e',
              },
            })
          );
        }

        const responses = await Promise.all(promises);
        const data: PricePoint[] = [];
        
        for (const response of responses) {
          if (response.ok) {
            const json = await response.json();
            data.push({
              date: format(new Date(json.timestamp * 1000), "MMM dd"),
              price: json.price,
              timestamp: json.timestamp,
            });
          }
        }

        if (data.length === 0) {
          throw new Error("No data available");
        }

        setPriceHistory(data.reverse());
        
        // Calculate price change
        if (data.length >= 2) {
          const firstPrice = data[0].price;
          const lastPrice = data[data.length - 1].price;
          const change = lastPrice - firstPrice;
          const changePercentage = (change / firstPrice) * 100;
          setPriceChange({ value: change, percentage: changePercentage });
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching historical data:", err);
        setError("API key invalid. Showing demo data.");
        
        // Use demo data as fallback
        const demoData = generateDemoData(period === "week" ? 7 : 30);
        setPriceHistory(demoData);
        
        // Calculate demo price change
        const firstPrice = demoData[0].price;
        const lastPrice = demoData[demoData.length - 1].price;
        const change = lastPrice - firstPrice;
        const changePercentage = (change / firstPrice) * 100;
        setPriceChange({ value: change, percentage: changePercentage });
        
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [period]);

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-accent/5 border-border/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-playfair text-2xl font-semibold mb-2">
            Gold Price History
          </h3>
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-muted-foreground font-inter">
                {period === "week" ? "Past 7 days" : "Past 30 days"}
              </span>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                priceChange.value >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {priceChange.value >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {priceChange.value >= 0 ? "+" : ""}
                  ₹{Math.abs(priceChange.value).toFixed(2)} (
                  {priceChange.percentage.toFixed(2)}%)
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <Tabs value={period} onValueChange={(v) => setPeriod(v as "week" | "month")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week">7 Days</TabsTrigger>
            <TabsTrigger value="month">30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-yellow-500 font-inter">{error}</span>
        </motion.div>
      )}

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-64 bg-muted rounded" />
            <div className="flex gap-4">
              <div className="h-8 bg-muted rounded flex-1" />
              <div className="h-8 bg-muted rounded flex-1" />
              <div className="h-8 bg-muted rounded flex-1" />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceHistory}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontFamily="Inter"
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                fontFamily="Inter"
                domain={['dataMin - 10', 'dataMax + 10']}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                fill="url(#goldGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </Card>
  );
};
