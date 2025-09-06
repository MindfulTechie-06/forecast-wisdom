// src/lib/api.ts

// Fetch current weather from OpenWeather API
export async function fetchWeather(city: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_OPENWEATHER_KEY
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Send weather data to ML model API
export async function fetchWeatherAdvice(weatherData: any) {
  try {
    const response = await fetch("https://ml-api.example.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If secured:
        // "Authorization": `Bearer ${import.meta.env.VITE_ML_API_KEY}`,
      },
      body: JSON.stringify(weatherData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI advice");
    }

    return await response.json(); // { advice: "Carry an umbrella!" }
  } catch (error) {
    console.error(error);
    return { advice: "Unable to fetch AI advice." };
  }
}
