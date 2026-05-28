import api from '../axiosInstance'

export const reportService = {
  // Financial Statements
  getIncomeStatement: (params) => api.get('/reports/income-statement', { params }),
  getBalanceSheet: (params) => api.get('/reports/balance-sheet', { params }),
  getCashFlowStatement: (params) => api.get('/reports/cash-flow', { params }),
  getTrialBalance: (params) => api.get('/reports/trial-balance', { params }),

  // Analysis Reports
  getAging: (type, params) => api.get(`/reports/aging/${type}`, { params }),
  getAccountsPayableAging: (params) => api.get('/reports/aging/accounts-payable', { params }),
  getAccountsReceivableAging: (params) => api.get('/reports/aging/accounts-receivable', { params }),

  // Tax Reports
  getTaxReport: (params) => api.get('/reports/tax', { params }),
  getGSTReport: (params) => api.get('/reports/gst', { params }),

  // Variance Analysis
  getVarianceAnalysis: (params) => api.get('/reports/variance-analysis', { params }),

  // Audit Reports
  getAuditTrail: (params) => api.get('/reports/audit-trail', { params }),

  // Export Reports
  exportReport: (reportType, format = 'pdf', params = {}) =>
    api.get(`/reports/${reportType}/export`, { params: { format, ...params } }),
}
