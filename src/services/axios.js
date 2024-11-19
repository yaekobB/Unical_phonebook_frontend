// src/services/axios.js
import axios from 'axios';
import  {authHeader}  from './authHeader';

const apiClient = axios.create({
  baseURL: 'http://160.97.244.16:8082', 
  headers: authHeader(),
  // You can also set a timeout or other global config options here
  // timeout: 40000,
});

export default apiClient;
