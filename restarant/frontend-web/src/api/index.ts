import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (formData: any) => API.post('/auth/login', formData);
export const register = (formData: any) => API.post('/auth/register', formData);
export const fetchMenu = (query: string = '') => API.get(`/menu${query}`);
export const createOrder = (orderData: any) => API.post('/orders', orderData);
export const fetchAdminStats = () => API.get('/admin/stats');
export const fetchOrders = () => API.get('/orders/myorders');

export default API;
