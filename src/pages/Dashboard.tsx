import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { AdviceCard } from "@/components/AdviceCard";
import { UserForm } from "@/components/UserForm";
import { Thermometer, Droplets, Wind, Eye, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  // ✅ OpenWeather API integration
  const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: data.visibility / 1000, // meters → km
      rainChance: data.clouds ? data.clouds.all : 0,
      aqi: 80, // placeholder unless you have AQI API
      condition: data.weather[0].description,
      location: data.name,
    };
  };

  // ✅ Call ML model API with profile + weather
  const fetchPersonalizedAdvice = async (
    profile: UserProfile,
    weather: WeatherData
  ): Promise<AdviceItem[]> => {
    try {
      const response = await fetch(import.meta.env.VITE_ML_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${import.meta.env.VITE_ML_API_KEY}`,
        },
        body: JSON.stringify({ profile, weather }),
      });

      if (!response.ok) throw new Error("ML API failed");

      const data = await response.json();
      return data.advice || []; // must match your friend’s API response shape
    } catch (err) {
      console.error(err);
      return [
        {
          id: "fallback",
          type: "warning",
          title: "Advice unavailable",
          description: "AI model could not generate advice right now.",
          priority: "low",
        },
      ];
    }
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setLoading(true);
    try {
      setUserProfile(profile);
      localStorage.setItem("userProfile", JSON.stringify(profile));

      // Step 1: fetch weather
      const weather = await fetchWeatherData(profile.location);
      setWeatherData(weather);

      // Step 2: fetch ML-based advice
      const personalizedAdvice = await fetchPersonalizedAdvice(profile, weather);
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
            <h1 className="text-3xl font-bold text-gradient">
              Weather Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            {weatherData
              ? `Current conditions in ${weatherData.location}`
              : "Complete your profile to get started"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weather Cards */}
          <div className="lg:col-span-2 space-y-6">
            {weatherData ? (
              <>
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

          {/* Right Column - Tips and Profile */}
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
