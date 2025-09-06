🌦️ AI Weather Advisor

An AI-powered weather forecasting web app built with React + Vite, TailwindCSS, and OpenWeather API.
The app displays current weather, weekly forecast, and provides AI-generated advice for safe travel and outdoor planning.

🚀 Features

🔍 Search weather by city name

🌡️ Display current temperature, conditions, highs & lows

📊 Interactive weekly forecast graph

🤖 AI-generated travel & safety advice

⚡ Fast & modern stack (React + Vite)

🎨 Styled with TailwindCSS

📂 Project Structure
ai-weather-advisor/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── App.jsx           # Main app logic
│   ├── index.css         # TailwindCSS styles
│   └── main.jsx          # React entry point
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Dependencies & scripts
└── README.md             # Documentation

⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/ai-weather-advisor.git
cd ai-weather-advisor

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the root directory:

VITE_WEATHER_API_KEY=your_openweather_api_key


(You can get your free API key from OpenWeather
)

4. Run Development Server
npm run dev


Visit 👉 http://localhost:5173

🛠️ Tech Stack

Frontend: React (Vite)

Styling: TailwindCSS

Charts: Recharts (for forecast graph)

API: OpenWeather API

📸 Screenshots
🌍 City Weather Example

📌 Future Improvements

⏳ Add hourly forecasts

🌍 Add map-based weather view

🎤 Voice input for city search

🌐 Multi-language support

🤝 Contributing

Fork the project

Create a new branch (feature-new-ui)

Commit changes (git commit -m "Added dark mode")

Push branch (git push origin feature-new-ui)

Open a Pull Request
