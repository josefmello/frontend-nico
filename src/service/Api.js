import axios from 'axios';

const api = axios.create({
  baseURL:
    "https://api-nico.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Garante que o objeto de cabeçalhos existe antes de modificar
  config.headers = config.headers || {};
  
  if (token) {
    const cleanToken = token.trim();
    // Forma 100% segura e compatível com qualquer versão do Axios
    config.headers['Authorization'] = `Bearer ${cleanToken}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;