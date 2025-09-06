/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_KEY: string;
  readonly VITE_ML_API_URL: string;
  readonly VITE_ML_API_KEY?: string; // optional if your friend's API needs it
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
