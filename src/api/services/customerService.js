import api from '../axiosInstance'

export const customerService = {
  getCustomers: (params) => api.get('/customers', { params }),
  getCustomer: (id) => api.get(`/customers/${id}`),
  createCustomer: (data) => api.post('/customers', data),
  updateCustomer: (id, data) => api.put(`/customers/${id}`, data),
  deleteCustomer: (id) => api.delete(`/customers/${id}`),
  getCustomerDetails: (id) => api.get(`/customers/${id}/details`),
  getCustomerTransactions: (id, params) => api.get(`/customers/${id}/transactions`, { params }),
  getCustomerBalance: (id) => api.get(`/customers/${id}/balance`),
}
