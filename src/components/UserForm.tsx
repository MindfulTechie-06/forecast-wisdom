import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Activity, Heart, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
  location: string;
  commute: boolean;
  activities: string[];
  healthConditions: string[];
}

interface UserFormProps {
  onSubmit: (profile: UserProfile) => void;
  initialData?: Partial<UserProfile>;
  className?: string;
}

export const UserForm = ({ onSubmit, initialData, className }: UserFormProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    location: initialData?.location || "",
    commute: initialData?.commute || false,
    activities: initialData?.activities || [],
    healthConditions: initialData?.healthConditions || []
  });

  const activities = [
    { id: "jogging", label: "Jogging" },
    { id: "cycling", label: "Cycling" },
    { id: "solar-panels", label: "Solar Panels" },
    { id: "gardening", label: "Gardening" },
    { id: "outdoor-sports", label: "Outdoor Sports" }
  ];

  const healthConditions = [
    { id: "asthma", label: "Asthma" },
    { id: "allergies", label: "Allergies" },
    { id: "sensitive-skin", label: "Sensitive Skin" },
    { id: "migraines", label: "Weather-triggered Migraines" }
  ];

  const handleActivityChange = (activityId: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      activities: checked
        ? [...prev.activities, activityId]
        : prev.activities.filter(id => id !== activityId)
    }));
  };

  const handleHealthConditionChange = (conditionId: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      healthConditions: checked
        ? [...prev.healthConditions, conditionId]
        : prev.healthConditions.filter(id => id !== conditionId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <Card className={cn("glass-card border-white/10", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg weather-gradient">
            <MapPin className="weather-icon text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-gradient">User Profile</CardTitle>
            <CardDescription>
              Personalize your weather insights and daily tips
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter your city (e.g., New York, NY)"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              className="bg-secondary/50 border-white/10"
            />
          </div>

          {/* Commute */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Briefcase className="w-4 h-4" />
              Daily Commute
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commute"
                checked={profile.commute}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({ ...prev, commute: !!checked }))
                }
              />
              <Label htmlFor="commute" className="text-sm">
                I commute daily and need weather updates for travel
              </Label>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Activity className="w-4 h-4" />
              Outdoor Activities
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity.id}
                    checked={profile.activities.includes(activity.id)}
                    onCheckedChange={(checked) => 
                      handleActivityChange(activity.id, !!checked)
                    }
                  />
                  <Label htmlFor={activity.id} className="text-sm">
                    {activity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Health Conditions */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Heart className="w-4 h-4" />
              Health Considerations
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {healthConditions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition.id}
                    checked={profile.healthConditions.includes(condition.id)}
                    onCheckedChange={(checked) => 
                      handleHealthConditionChange(condition.id, !!checked)
                    }
                  />
                  <Label htmlFor={condition.id} className="text-sm">
                    {condition.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full weather-gradient hover:opacity-90">
            Save Profile & Get Personalized Tips
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};