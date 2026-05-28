import api from '../axiosInstance'

export const authService = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  refresh: (refreshToken) => api.post('/refresh', { refreshToken }),
  getCurrentUser: () => api.get('/me'),
  updateProfile: (data) => api.put('/profile', data),
}
