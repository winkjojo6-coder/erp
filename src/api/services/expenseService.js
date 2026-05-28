import api from '../axiosInstance'

export const expenseService = {
  // Expenses
  getExpenses: (params) => api.get('/expenses', { params }),
  getExpense: (id) => api.get(`/expenses/${id}`),
  createExpense: (data) => api.post('/expenses', data),
  updateExpense: (id, data) => api.put(`/expenses/${id}`, data),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  approveExpense: (id) => api.post(`/expenses/${id}/approve`),
  rejectExpense: (id, reason) => api.post(`/expenses/${id}/reject`, { reason }),

  // Expense Claims
  getExpenseClaims: (params) => api.get('/expense-claims', { params }),
  createExpenseClaim: (data) => api.post('/expense-claims', data),
  updateExpenseClaim: (id, data) => api.put(`/expense-claims/${id}`, data),
  submitExpenseClaim: (id) => api.post(`/expense-claims/${id}/submit`),
  approveExpenseClaim: (id) => api.post(`/expense-claims/${id}/approve`),
  rejectExpenseClaim: (id, reason) => api.post(`/expense-claims/${id}/reject`, { reason }),

  // Receipt Management
  uploadReceipt: (expenseId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/expenses/${expenseId}/receipts`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteReceipt: (expenseId, receiptId) =>
    api.delete(`/expenses/${expenseId}/receipts/${receiptId}`),

  // Expense Categories
  getCategories: () => api.get('/expense-categories'),
  createCategory: (data) => api.post('/expense-categories', data),

  // Expense Reporting
  getExpenseReport: (params) => api.get('/expense-report', { params }),
}
