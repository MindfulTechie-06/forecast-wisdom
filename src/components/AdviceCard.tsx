import { Lightbulb, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdviceItem {
  id: string;
  type: "tip" | "warning" | "info" | "success";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface AdviceCardProps {
  advice: AdviceItem[];
  className?: string;
}

export const AdviceCard = ({ advice, className }: AdviceCardProps) => {
  const getIconAndColor = (type: AdviceItem["type"]) => {
    switch (type) {
      case "tip":
        return { icon: Lightbulb, color: "text-accent" };
      case "warning":
        return { icon: AlertTriangle, color: "text-yellow-400" };
      case "info":
        return { icon: Info, color: "text-primary" };
      case "success":
        return { icon: CheckCircle, color: "text-green-400" };
      default:
        return { icon: Info, color: "text-primary" };
    }
  };

  const getPriorityBorder = (priority: AdviceItem["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-400";
      case "medium":
        return "border-l-accent";
      case "low":
        return "border-l-primary";
      default:
        return "border-l-primary";
    }
  };

  return (
    <div className={cn("glass-card rounded-xl p-6 hover-glow floating-3d glow-pulse", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg weather-gradient group relative overflow-hidden">
          <Lightbulb className="weather-icon text-white relative z-10" />
        </div>
        <h2 className="text-xl font-semibold text-gradient">Your Daily Tips</h2>
      </div>

      <div className="space-y-4">
        {advice.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Info className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Complete your profile to receive personalized advice
            </p>
          </div>
        ) : (
          advice.map((item) => {
            const { icon: Icon, color } = getIconAndColor(item.type);
            return (
              <div
                key={item.id}
                className={cn(
                  "p-4 rounded-lg border-l-4 bg-secondary/50 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/70 hover:transform hover:translateX-2 hover:shadow-lg cursor-pointer",
                  getPriorityBorder(item.priority)
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn("w-5 h-5 mt-0.5", color)} />
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};