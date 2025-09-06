import { Link, useLocation } from "react-router-dom";
import { Cloud, Home, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-card px-6 py-3 rounded-full">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full weather-gradient flex items-center justify-center">
              <Cloud className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gradient hidden sm:block">WeatherAI</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all",
                  location.pathname === item.href
                    ? "weather-gradient text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};