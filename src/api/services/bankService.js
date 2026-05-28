import api from '../axiosInstance'

export const bankService = {
  // Bank Accounts
  getBankAccounts: (params) => api.get('/bank-accounts', { params }),
  getBankAccount: (id) => api.get(`/bank-accounts/${id}`),
  createBankAccount: (data) => api.post('/bank-accounts', data),
  updateBankAccount: (id, data) => api.put(`/bank-accounts/${id}`, data),
  deleteBankAccount: (id) => api.delete(`/bank-accounts/${id}`),

  // Bank Transactions
  getBankTransactions: (accountId, params) =>
    api.get(`/bank-accounts/${accountId}/transactions`, { params }),
  createBankTransaction: (accountId, data) =>
    api.post(`/bank-accounts/${accountId}/transactions`, data),

  // Bank Reconciliation
  getBankReconciliations: (accountId, params) =>
    api.get(`/bank-accounts/${accountId}/reconciliations`, { params }),
  createReconciliation: (accountId, data) =>
    api.post(`/bank-accounts/${accountId}/reconciliations`, data),
  updateReconciliation: (accountId, reconciliationId, data) =>
    api.put(`/bank-accounts/${accountId}/reconciliations/${reconciliationId}`, data),
  completeReconciliation: (accountId, reconciliationId) =>
    api.post(`/bank-accounts/${accountId}/reconciliations/${reconciliationId}/complete`),

  // Bank Statement Upload
  uploadBankStatement: (accountId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/bank-accounts/${accountId}/statements`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // Bank Matching
  getMatchingTransactions: (accountId, statementId) =>
    api.get(`/bank-accounts/${accountId}/statements/${statementId}/matching`),
  matchTransaction: (accountId, statementId, data) =>
    api.post(`/bank-accounts/${accountId}/statements/${statementId}/match`, data),

  // Bank Cash Flow
  getBankCashFlow: (params) => api.get('/bank-cash-flow', { params }),
}
