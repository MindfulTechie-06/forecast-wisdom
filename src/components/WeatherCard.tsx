import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "stable";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const WeatherCard = ({
  title,
  value,
  unit,
  icon: Icon,
  description,
  trend,
  className,
  size = "md"
}: WeatherCardProps) => {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const valueSizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  };

  return (
    <div className={cn(
      "glass-card rounded-xl hover-glow perspective-container tilt-effect floating-3d glow-pulse",
      sizeClasses[size],
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg weather-gradient group relative overflow-hidden">
            <Icon className="weather-icon text-white relative z-10" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide transition-colors duration-300 hover:text-primary">
            {title}
          </h3>
        </div>
        {trend && (
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            trend === "up" && "bg-green-500/20 text-green-400",
            trend === "down" && "bg-red-500/20 text-red-400",
            trend === "stable" && "bg-blue-500/20 text-blue-400"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "stable" && "→"}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "font-bold text-gradient",
            valueSizeClasses[size]
          )}>
            {value}
          </span>
          {unit && (
            <span className="text-lg text-muted-foreground font-medium">
              {unit}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};