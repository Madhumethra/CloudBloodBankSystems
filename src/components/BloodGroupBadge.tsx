import { cn } from "@/lib/utils";
import type { BloodGroup } from "@/lib/data";

interface BloodGroupBadgeProps {
  group: BloodGroup;
  size?: "sm" | "md" | "lg";
}

const BloodGroupBadge = ({ group, size = "md" }: BloodGroupBadgeProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-accent text-accent-foreground font-heading font-bold flex items-center justify-center border-2 border-primary/20",
        sizeClasses[size]
      )}
    >
      {group}
    </div>
  );
};

export default BloodGroupBadge;
