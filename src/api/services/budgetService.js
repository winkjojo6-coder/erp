import api from '../axiosInstance'

export const budgetService = {
  // Budgets
  getBudgets: (params) => api.get('/budgets', { params }),
  getBudget: (id) => api.get(`/budgets/${id}`),
  createBudget: (data) => api.post('/budgets', data),
  updateBudget: (id, data) => api.put(`/budgets/${id}`, data),
  deleteBudget: (id) => api.delete(`/budgets/${id}`),
  approveBudget: (id) => api.post(`/budgets/${id}/approve`),
  rejectBudget: (id, reason) => api.post(`/budgets/${id}/reject`, { reason }),

  // Budget Lines
  getBudgetLines: (budgetId, params) => api.get(`/budgets/${budgetId}/lines`, { params }),
  addBudgetLine: (budgetId, data) => api.post(`/budgets/${budgetId}/lines`, data),
  updateBudgetLine: (budgetId, lineId, data) =>
    api.put(`/budgets/${budgetId}/lines/${lineId}`, data),
  deleteBudgetLine: (budgetId, lineId) =>
    api.delete(`/budgets/${budgetId}/lines/${lineId}`),

  // Budget vs Actuals
  getBudgetVariance: (params) => api.get('/budget-variance', { params }),
  getBudgetPerformance: (budgetId) => api.get(`/budgets/${budgetId}/performance`),

  // Budget Forecasting
  createForecast: (data) => api.post('/forecasts', data),
  getForecast: (id) => api.get(`/forecasts/${id}`),
  updateForecast: (id, data) => api.put(`/forecasts/${id}`, data),
}
