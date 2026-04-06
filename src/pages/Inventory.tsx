import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BloodGroupBadge from "@/components/BloodGroupBadge";
import { initialStock, type BloodStock } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Inventory = () => {
  const [stock, setStock] = useState<BloodStock[]>(initialStock);
  const { toast } = useToast();
  const totalUnits = stock.reduce((acc, s) => acc + s.units, 0);

  const updateUnits = (group: string, delta: number) => {
    setStock(prev => prev.map(s =>
      s.bloodGroup === group ? { ...s, units: Math.max(0, s.units + delta), lastUpdated: new Date().toISOString().split("T")[0] } : s
    ));
    toast({ title: `Stock updated`, description: `${group}: ${delta > 0 ? "+" : ""}${delta} unit(s)` });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Blood Inventory</h1>
        <p className="text-muted-foreground mt-1">Total: <span className="font-semibold text-foreground">{totalUnits}</span> units across all blood groups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stock.map((s, i) => {
          const level = s.units < 10 ? "critical" : s.units < 20 ? "low" : "good";
          const pct = Math.min((s.units / 60) * 100, 100);
          return (
            <motion.div
              key={s.bloodGroup}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <BloodGroupBadge group={s.bloodGroup} size="lg" />
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  level === "good" && "bg-success/10 text-success",
                  level === "low" && "bg-warning/10 text-warning",
                  level === "critical" && "bg-urgent/10 text-urgent animate-pulse-urgent"
                )}>
                  {level === "good" ? "Sufficient" : level === "low" ? "Low Stock" : "Critical!"}
                </span>
              </div>

              <div>
                <p className="text-4xl font-heading font-bold text-foreground">{s.units}</p>
                <p className="text-sm text-muted-foreground">units available</p>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    level === "good" && "bg-success",
                    level === "low" && "bg-warning",
                    level === "critical" && "bg-urgent"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => updateUnits(s.bloodGroup, -1)}>
                  <Minus className="w-3 h-3" /> Remove
                </Button>
                <Button size="sm" className="flex-1 gap-1" onClick={() => updateUnits(s.bloodGroup, 1)}>
                  <Plus className="w-3 h-3" /> Add
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">Updated: {s.lastUpdated}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
