import api from '../axiosInstance'

export const generalLedgerService = {
  // Chart of Accounts
  getChartOfAccounts: (params) => api.get('/chart-of-accounts', { params }),
  getAccount: (id) => api.get(`/chart-of-accounts/${id}`),
  createAccount: (data) => api.post('/chart-of-accounts', data),
  updateAccount: (id, data) => api.put(`/chart-of-accounts/${id}`, data),
  deleteAccount: (id) => api.delete(`/chart-of-accounts/${id}`),

  // GL Entries
  getGLEntries: (params) => api.get('/gl-entries', { params }),
  getGLEntry: (id) => api.get(`/gl-entries/${id}`),
  createGLEntry: (data) => api.post('/gl-entries', data),
  updateGLEntry: (id, data) => api.put(`/gl-entries/${id}`, data),
  deleteGLEntry: (id) => api.delete(`/gl-entries/${id}`),
  postGLEntry: (id) => api.post(`/gl-entries/${id}/post`),
  reverseGLEntry: (id) => api.post(`/gl-entries/${id}/reverse`),

  // Account Balances
  getAccountBalance: (id) => api.get(`/accounts/${id}/balance`),
  getAccountHistory: (id, params) => api.get(`/accounts/${id}/history`, { params }),

  // Reconciliation
  getReconciliations: (params) => api.get('/reconciliations', { params }),
  createReconciliation: (data) => api.post('/reconciliations', data),
  updateReconciliation: (id, data) => api.put(`/reconciliations/${id}`, data),
  completeReconciliation: (id) => api.post(`/reconciliations/${id}/complete`),
}
