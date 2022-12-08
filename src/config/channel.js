const { VITE_ENV } = import.meta.env;

const API = {
  dev: "https://localhost:7273",
  stg: "https://stg-wsapi.coverspick.com",
  prd: "https://stg-wsapi.coverspick.com",
};

export const PLATFORM_API_BASE_URL = API[VITE_ENV] ?? API.prd;
