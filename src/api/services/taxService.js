import api from '../axiosInstance'

export const taxService = {
  // Tax Configurations
  getTaxConfigs: () => api.get('/tax-configs'),
  createTaxConfig: (data) => api.post('/tax-configs', data),
  updateTaxConfig: (id, data) => api.put(`/tax-configs/${id}`, data),

  // GST Calculations
  calculateGST: (data) => api.post('/tax/calculate-gst', data),
  getGSTReturn: (params) => api.get('/tax/gst-return', { params }),
  submitGSTReturn: (data) => api.post('/tax/gst-return/submit', data),

  // Tax Compliance
  getTaxLiability: (params) => api.get('/tax-liability', { params }),
  recordTaxPayment: (data) => api.post('/tax-payments', data),

  // Tax Reconciliation
  getTaxReconciliation: (period) => api.get(`/tax-reconciliation/${period}`),
  createTaxAdjustment: (data) => api.post('/tax-adjustments', data),

  // Tax Reports
  getTaxReportByPeriod: (period) => api.get(`/tax-reports/${period}`),
  generateTaxReturn: (data) => api.post('/tax-returns/generate', data),
  fileTax: (returnId) => api.post(`/tax-returns/${returnId}/file`),

  // Tax Audit Trail
  getTaxAuditTrail: (params) => api.get('/tax-audit-trail', { params }),
}
