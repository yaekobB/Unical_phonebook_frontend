// src/services/axios.js
import axios from 'axios';
import  {authHeader}  from './authHeader';

const apiClient = axios.create({
  baseURL: 'http://localhost:8084', 
  headers: authHeader(),
  // You can also set a timeout or other global config options here
  // timeout: 40000,
});

export default apiClient;
