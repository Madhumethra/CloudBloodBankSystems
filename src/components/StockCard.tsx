import { motion } from "framer-motion";
import type { BloodStock } from "@/lib/data";
import BloodGroupBadge from "./BloodGroupBadge";
import { cn } from "@/lib/utils";

interface StockCardProps {
  stock: BloodStock;
  index: number;
}

const StockCard = ({ stock, index }: StockCardProps) => {
  const level = stock.units < 10 ? "critical" : stock.units < 20 ? "low" : "good";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <BloodGroupBadge group={stock.bloodGroup} />
      <div className="flex-1">
        <p className="text-2xl font-heading font-bold text-foreground">{stock.units}</p>
        <p className="text-xs text-muted-foreground">units available</p>
      </div>
      <div
        className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold",
          level === "good" && "bg-success/10 text-success",
          level === "low" && "bg-warning/10 text-warning",
          level === "critical" && "bg-urgent/10 text-urgent animate-pulse-urgent"
        )}
      >
        {level === "good" ? "Sufficient" : level === "low" ? "Low" : "Critical"}
      </div>
    </motion.div>
  );
};

export default StockCard;
