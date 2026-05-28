import api from '../axiosInstance'

export const accountsPayableService = {
  // Bills
  getBills: (params) => api.get('/bills', { params }),
  getBill: (id) => api.get(`/bills/${id}`),
  createBill: (data) => api.post('/bills', data),
  updateBill: (id, data) => api.put(`/bills/${id}`, data),
  deleteBill: (id) => api.delete(`/bills/${id}`),
  approveBill: (id) => api.post(`/bills/${id}/approve`),
  rejectBill: (id, reason) => api.post(`/bills/${id}/reject`, { reason }),

  // Bill Payments
  recordBillPayment: (billId, data) => api.post(`/bills/${billId}/payments`, data),
  getBillPayments: (billId) => api.get(`/bills/${billId}/payments`),
  reverseBillPayment: (billId, paymentId) => api.post(`/bills/${billId}/payments/${paymentId}/reverse`),

  // Bill Line Items
  getBillLineItems: (billId) => api.get(`/bills/${billId}/line-items`),
  addBillLineItem: (billId, data) => api.post(`/bills/${billId}/line-items`, data),
  updateBillLineItem: (billId, itemId, data) =>
    api.put(`/bills/${billId}/line-items/${itemId}`, data),
  deleteBillLineItem: (billId, itemId) =>
    api.delete(`/bills/${billId}/line-items/${itemId}`),

  // AP Summary
  getAPSummary: () => api.get('/ap-summary'),
  getAPAging: (params) => api.get('/ap-aging', { params }),

  // Vendor Payments
  getScheduledPayments: (params) => api.get('/scheduled-payments', { params }),
  schedulePayment: (data) => api.post('/scheduled-payments', data),
  processPayment: (paymentId) => api.post(`/scheduled-payments/${paymentId}/process`),
}
