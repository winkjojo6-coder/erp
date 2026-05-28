import api from '../axiosInstance'

export const invoiceService = {
  // Sales Invoices - from api.json spec
  getInvoice: (invoiceId) => api.get(`/sales/invoices/${invoiceId}`),
  updateInvoice: (invoiceId, data) => api.put(`/sales/invoices/${invoiceId}`, data),
  deleteInvoice: (invoiceId) => api.delete(`/sales/invoices/${invoiceId}`),
  rejectInvoice: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/reject`),
  postInvoice: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/post`),
  recordPartialPayment: (invoiceId, paymentAmount) => 
    api.put(`/sales/invoices/${invoiceId}/partial-payment`, null, { params: { paymentAmount } }),

  // Invoice Taxes
  getInvoiceTax: (invoiceId, taxId) => api.get(`/sales/invoices/${invoiceId}/taxes/${taxId}`),
  updateInvoiceTax: (invoiceId, taxId, data) => 
    api.put(`/sales/invoices/${invoiceId}/taxes/${taxId}`, data),
  deleteInvoiceTax: (invoiceId, taxId) => 
    api.delete(`/sales/invoices/${invoiceId}/taxes/${taxId}`),
}
