import api from '../axiosInstance'

export const accountsReceivableService = {
  // Invoices (AR specific)
  getARInvoices: (params) => api.get('/ar/invoices', { params }),
  getARInvoice: (id) => api.get(`/ar/invoices/${id}`),
  createARInvoice: (data) => api.post('/ar/invoices', data),
  updateARInvoice: (id, data) => api.put(`/ar/invoices/${id}`, data),
  deleteARInvoice: (id) => api.delete(`/ar/invoices/${id}`),
  sendInvoice: (id) => api.post(`/ar/invoices/${id}/send`),

  // Invoice Payments
  recordInvoicePayment: (invoiceId, data) => api.post(`/ar/invoices/${invoiceId}/payments`, data),
  getInvoicePayments: (invoiceId) => api.get(`/ar/invoices/${invoiceId}/payments`),
  reverseInvoicePayment: (invoiceId, paymentId) =>
    api.post(`/ar/invoices/${invoiceId}/payments/${paymentId}/reverse`),

  // Credit Notes
  createCreditNote: (invoiceId, data) =>
    api.post(`/ar/invoices/${invoiceId}/credit-notes`, data),
  applyCreditNote: (invoiceId, creditNoteId, data) =>
    api.post(`/ar/invoices/${invoiceId}/credit-notes/${creditNoteId}/apply`, data),

  // AR Summary
  getARSummary: () => api.get('/ar-summary'),
  getARCollections: (params) => api.get('/ar-collections', { params }),

  // Dunning
  sendDunningNotice: (invoiceId) => api.post(`/ar/invoices/${invoiceId}/dunning`),
  getDunningSchedule: (params) => api.get('/dunning-schedule', { params }),

  // Customer Statements
  generateCustomerStatement: (customerId, params) =>
    api.get(`/customers/${customerId}/statement`, { params }),
}
