import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Brain, Users, Zap, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Cloud,
      title: "Real-time Weather Data",
      description: "Integration with OpenWeatherMap API for accurate, up-to-date weather information and forecasts."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms provide personalized advice based on your profile and current conditions."
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Customize your dashboard with location, activities, and health considerations for tailored recommendations."
    },
    {
      icon: Zap,
      title: "Modern Interface",
      description: "Beautiful, responsive design with glass morphism effects and smooth animations."
    }
  ];

  const techStack = [
    "React 18 with TypeScript",
    "Tailwind CSS for styling",
    "OpenWeatherMap API",
    "Machine Learning Integration",
    "React Router for navigation",
    "Modern glass morphism design"
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full weather-gradient flex items-center justify-center">
            <Cloud className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Smart Weather Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, AI-powered weather application that provides personalized insights 
            and recommendations based on your lifestyle and preferences.
          </p>
        </div>

        {/* Project Overview */}
        <Card className="glass-card border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gradient">Project Overview</CardTitle>
            <CardDescription>
              Building the future of personalized weather experiences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-card-foreground">
              This weather dashboard represents a new approach to weather applications, combining 
              real-time meteorological data with artificial intelligence to deliver personalized 
              insights that matter to your daily life.
            </p>
            <p className="text-card-foreground">
              Whether you're planning your commute, scheduling outdoor activities, or managing 
              health conditions affected by weather, our smart dashboard provides actionable 
              recommendations tailored specifically to your needs and preferences.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-white/10 hover-glow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg weather-gradient">
                    <feature.icon className="weather-icon text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <Card className="glass-card border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gradient">Technology Stack</CardTitle>
            <CardDescription>
              Built with modern web technologies for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {techStack.map((tech, index) => (
                <li key={index} className="flex items-center gap-2 text-card-foreground">
                  <div className="w-2 h-2 rounded-full weather-gradient"></div>
                  {tech}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* API Integration */}
        <Card className="glass-card border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gradient">API Integration</CardTitle>
            <CardDescription>
              Connecting to external services for comprehensive weather data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">OpenWeatherMap API</h4>
              <p className="text-muted-foreground">
                Provides real-time weather data, forecasts, and air quality information 
                for locations worldwide with high accuracy and reliability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">ML Model Endpoint</h4>
              <p className="text-muted-foreground">
                Custom machine learning service at <code className="bg-secondary px-2 py-1 rounded">/predict</code> 
                that analyzes user profiles and weather conditions to generate personalized recommendations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-semibold text-gradient">
            Ready to experience personalized weather insights?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="weather-gradient hover:opacity-90">
              <Link to="/">
                <Cloud className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              <Github className="w-4 h-4 mr-2" />
              View Source Code
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;