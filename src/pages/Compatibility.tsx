import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BloodGroupBadge from "@/components/BloodGroupBadge";
import { bloodCompatibility, type BloodGroup } from "@/lib/data";
import { cn } from "@/lib/utils";

const allGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Compatibility = () => {
  const [selected, setSelected] = useState<BloodGroup | "">("");
  const compatible = selected ? bloodCompatibility[selected] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Blood Compatibility Checker</h1>
        <p className="text-muted-foreground mt-1">Find compatible blood groups for transfusion</p>
      </div>

      <div className="glass-card rounded-xl p-8 max-w-2xl">
        <label className="text-sm font-medium text-foreground mb-3 block">Select patient's blood group</label>
        <Select value={selected} onValueChange={v => setSelected(v as BloodGroup)}>
          <SelectTrigger className="w-full text-lg h-14"><SelectValue placeholder="Choose blood group..." /></SelectTrigger>
          <SelectContent>{allGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <BloodGroupBadge group={selected} size="lg" />
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <p className="text-lg font-heading font-semibold text-foreground">
                Can receive from {compatible.length} blood group(s)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allGroups.map((group, i) => {
                const isCompatible = compatible.includes(group);
                return (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "glass-card rounded-xl p-6 flex flex-col items-center gap-3 transition-all",
                      isCompatible ? "border-success/40 bg-success/5" : "opacity-50"
                    )}
                  >
                    <BloodGroupBadge group={group} size="lg" />
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-semibold",
                      isCompatible ? "text-success" : "text-muted-foreground"
                    )}>
                      {isCompatible ? <><Check className="w-4 h-4" /> Compatible</> : <><X className="w-4 h-4" /> Incompatible</>}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="glass-card rounded-xl p-6 max-w-2xl">
              <h3 className="font-heading font-semibold text-foreground mb-3">Compatibility Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-2 text-left text-muted-foreground">Recipient →</th>
                      {allGroups.map(g => <th key={g} className="p-2 text-center font-bold text-foreground">{g}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {allGroups.map(donor => (
                      <tr key={donor} className="border-b border-border/50">
                        <td className="p-2 font-bold text-foreground">{donor}</td>
                        {allGroups.map(recipient => {
                          const ok = bloodCompatibility[recipient].includes(donor);
                          return (
                            <td key={recipient} className="p-2 text-center">
                              {ok ? <Check className="w-4 h-4 text-success mx-auto" /> : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Compatibility;
