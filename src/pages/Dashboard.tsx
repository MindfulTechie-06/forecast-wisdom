import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { AdviceCard } from "@/components/AdviceCard";
import { UserForm } from "@/components/UserForm";
import { Thermometer, Droplets, Wind, Eye, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WeatherChart } from "@/components/WeatherChart";

// Mock weather data structure
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  rainChance: number;
  aqi: number;
  condition: string;
  location: string;
}

// Mock advice data structure
interface AdviceItem {
  id: string;
  type: "tip" | "warning" | "info" | "success";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface UserProfile {
  location: string;
  commute: boolean;
  activities: string[];
  healthConditions: string[];
}

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [advice, setAdvice] = useState<AdviceItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock OpenWeatherMap API call
  const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          temperature: 22,
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          rainChance: 30,
          aqi: 85,
          condition: "Partly Cloudy",
          location: location || "New York, NY"
        });
      }, 1000);
    });
  };

  // Mock ML model API call for personalized advice
  const fetchPersonalizedAdvice = async (profile: UserProfile): Promise<AdviceItem[]> => {
    const mockAdvice: AdviceItem[] = [];

    if (profile.commute) {
      mockAdvice.push({
        id: "commute-1",
        type: "tip",
        title: "Perfect Commute Weather",
        description: "Clear skies expected. Great day for walking or cycling to work!",
        priority: "medium"
      });
    }

    if (profile.activities.includes("jogging")) {
      mockAdvice.push({
        id: "jogging-1",
        type: "info",
        title: "Ideal Jogging Conditions",
        description: "Temperature is perfect for outdoor exercise. Consider jogging between 7-9 AM.",
        priority: "medium"
      });
    }

    if (profile.healthConditions.includes("asthma")) {
      mockAdvice.push({
        id: "health-1",
        type: "warning",
        title: "Air Quality Alert",
        description: "AQI is moderate. Consider limiting outdoor activities if you experience symptoms.",
        priority: "high"
      });
    }

    if (profile.activities.includes("solar-panels")) {
      mockAdvice.push({
        id: "solar-1",
        type: "success",
        title: "Great Solar Potential",
        description: "Partly cloudy conditions will still provide good solar energy generation today.",
        priority: "low"
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAdvice), 500);
    });
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setLoading(true);
    try {
      setUserProfile(profile);
      localStorage.setItem("userProfile", JSON.stringify(profile));

      const weather = await fetchWeatherData(profile.location);
      setWeatherData(weather);

      const personalizedAdvice = await fetchPersonalizedAdvice(profile);
      setAdvice(personalizedAdvice);

      toast({
        title: "Profile Updated",
        description: "Your personalized weather insights are ready!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      handleProfileSubmit(profile);
    }
  }, []);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-400";
    if (aqi <= 100) return "text-yellow-400";
    if (aqi <= 150) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-gradient">Weather Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            {weatherData
              ? `Current conditions in ${weatherData.location}`
              : "Complete your profile to get started"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {weatherData ? (
              <>
                {/* Main Weather Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WeatherCard
                    title="Temperature"
                    value={weatherData.temperature}
                    unit="°C"
                    icon={Thermometer}
                    description={weatherData.condition}
                    trend="stable"
                    size="lg"
                  />
                  <WeatherCard
                    title="Rain Chance"
                    value={weatherData.rainChance}
                    unit="%"
                    icon={Droplets}
                    description="Probability of precipitation"
                    trend="down"
                  />
                </div>

                {/* Secondary Weather Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WeatherCard
                    title="Air Quality"
                    value={weatherData.aqi}
                    unit="AQI"
                    icon={Eye}
                    description="Air Quality Index"
                    className={getAQIColor(weatherData.aqi)}
                    size="sm"
                  />
                  <WeatherCard
                    title="Wind Speed"
                    value={weatherData.windSpeed}
                    unit="km/h"
                    icon={Wind}
                    description="Current wind conditions"
                    size="sm"
                  />
                  <WeatherCard
                    title="Humidity"
                    value={weatherData.humidity}
                    unit="%"
                    icon={Droplets}
                    description="Relative humidity"
                    size="sm"
                  />
                </div>

                {/* 📊 Weather Chart */}
                <WeatherChart />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Weather Data</h3>
                <p className="text-muted-foreground">
                  Complete your profile to see current weather conditions
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AdviceCard advice={advice} />
            <UserForm
              onSubmit={handleProfileSubmit}
              initialData={userProfile || undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
