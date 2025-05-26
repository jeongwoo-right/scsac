// src/api/axios.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',   // 공통 prefix
})

// jwt token 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    // token => `Bearer ${token}`
    config.headers.Authorization = `Bearer ${token}`
    // config.headers.Authorization = token
  }
  return config
})

export default api
