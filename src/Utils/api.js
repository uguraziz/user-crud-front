const isDev = import.meta.env.DEV;
const VITE_API_URL = import.meta.env.VITE_API_URL;

let API_BASE_URL;

if (isDev) {
  API_BASE_URL = '/api';
} else {
  API_BASE_URL = VITE_API_URL ? `${VITE_API_URL}/api` : 'https://crud-api.altuntech.com/api';
}

export default API_BASE_URL;