const isDev = import.meta.env.DEV;
const API_BASE_URL = isDev 
  ? '/api'
  : `${import.meta.env.VITE_API_URL}/api`;

export default API_BASE_URL;