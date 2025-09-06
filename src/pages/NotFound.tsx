import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
          <span className="text-4xl font-bold text-gradient">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gradient">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg weather-gradient text-white font-medium hover:opacity-90 transition-opacity">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
