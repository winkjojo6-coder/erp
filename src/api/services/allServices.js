import api from '../axiosInstance'

// Sales Invoice Services
export const salesInvoiceService = {
  getInvoice: (invoiceId) => api.get(`/sales/invoices/${invoiceId}`),
  updateInvoice: (invoiceId, data) => api.put(`/sales/invoices/${invoiceId}`, data),
  deleteInvoice: (invoiceId) => api.delete(`/sales/invoices/${invoiceId}`),
  rejectInvoice: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/reject`),
  postInvoice: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/post`),
  recordPartialPayment: (invoiceId, paymentAmount) => 
    api.put(`/sales/invoices/${invoiceId}/partial-payment`, null, { params: { paymentAmount } }),
  markAsPaid: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/mark-as-paid`),
  cancelInvoice: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/cancel`),
  approveInvoice: (invoiceId) => api.put(`/sales/invoices/${invoiceId}/approve`),
  listInvoices: (params) => api.get('/sales/invoices', { params }),
  createInvoice: (data) => api.post('/sales/invoices', data),
}

// Invoice Tax Services
export const invoiceTaxService = {
  getInvoiceTax: (invoiceId, taxId) => api.get(`/sales/invoices/${invoiceId}/taxes/${taxId}`),
  updateInvoiceTax: (invoiceId, taxId, data) => 
    api.put(`/sales/invoices/${invoiceId}/taxes/${taxId}`, data),
  deleteInvoiceTax: (invoiceId, taxId) => 
    api.delete(`/sales/invoices/${invoiceId}/taxes/${taxId}`),
  listInvoiceTaxes: (invoiceId, params) => api.get(`/sales/invoices/${invoiceId}/taxes`, { params }),
  createInvoiceTax: (invoiceId, data) => api.post(`/sales/invoices/${invoiceId}/taxes`, data),
}

// Vendor Services
export const vendorService = {
  getVendor: (id) => api.get(`/api/v1/vendors/${id}`),
  updateVendor: (id, data) => api.put(`/api/v1/vendors/${id}`, data),
  deleteVendor: (id) => api.delete(`/api/v1/vendors/${id}`),
  deactivateVendor: (id) => api.put(`/api/v1/vendors/${id}/deactivate`),
  activateVendor: (id) => api.put(`/api/v1/vendors/${id}/activate`),
  getAllVendors: (params) => api.get('/api/v1/vendors', { params }),
  createVendor: (data) => api.post('/api/v1/vendors', data),
}

// Customer Services
export const customerService = {
  getCustomer: (id) => api.get(`/api/v1/customers/${id}`),
  updateCustomer: (id, data) => api.put(`/api/v1/customers/${id}`, data),
  deleteCustomer: (id) => api.delete(`/api/v1/customers/${id}`),
  deactivateCustomer: (id) => api.put(`/api/v1/customers/${id}/deactivate`),
  activateCustomer: (id) => api.put(`/api/v1/customers/${id}/activate`),
}

// AP Invoice Services
export const apInvoiceService = {
  getInvoice: (invoiceId) => api.get(`/ap/invoices/${invoiceId}`),
  updateInvoice: (invoiceId, data) => api.put(`/ap/invoices/${invoiceId}`, data),
  deleteInvoice: (invoiceId) => api.delete(`/ap/invoices/${invoiceId}`),
  rejectInvoice: (invoiceId) => api.put(`/ap/invoices/${invoiceId}/reject`),
  postInvoice: (invoiceId) => api.put(`/ap/invoices/${invoiceId}/post`),
  markAsPaid: (invoiceId) => api.put(`/ap/invoices/${invoiceId}/mark-as-paid`),
  cancelInvoice: (invoiceId) => api.put(`/ap/invoices/${invoiceId}/cancel`),
  approveInvoice: (invoiceId) => api.put(`/ap/invoices/${invoiceId}/approve`),
  listInvoices: (params) => api.get('/ap/invoices', { params }),
  createInvoice: (data) => api.post('/ap/invoices', data),
}

// Payment Voucher Services
export const paymentVoucherService = {
  getPaymentVoucher: (id) => api.get(`/api/v1/payment-vouchers/${id}`),
  updatePaymentVoucher: (id, data) => api.put(`/api/v1/payment-vouchers/${id}`, data),
  deletePaymentVoucher: (id) => api.delete(`/api/v1/payment-vouchers/${id}`),
  reversePaymentVoucher: (id) => api.put(`/api/v1/payment-vouchers/${id}/reverse`),
  postPaymentVoucher: (id) => api.put(`/api/v1/payment-vouchers/${id}/post`),
  cancelPaymentVoucher: (id) => api.put(`/api/v1/payment-vouchers/${id}/cancel`),
  approvePaymentVoucher: (id) => api.put(`/api/v1/payment-vouchers/${id}/approve`),
  getPaymentVouchers: (params) => api.get('/api/v1/payment-vouchers', { params }),
  createPaymentVoucher: (data) => api.post('/api/v1/payment-vouchers', data),
}

// HSN/SAC Master Services
export const hsnSacService = {
  getHsnSac: (id) => api.get(`/api/v1/hsn-sac-masters/${id}`),
  updateHsnSac: (id, data) => api.put(`/api/v1/hsn-sac-masters/${id}`, data),
  deleteHsnSac: (id) => api.delete(`/api/v1/hsn-sac-masters/${id}`),
  getAllHsnSac: (params) => api.get('/api/v1/hsn-sac-masters', { params }),
  createHsnSac: (data) => api.post('/api/v1/hsn-sac-masters', data),
}

// GST Slab Services
export const gstSlabService = {
  getGstSlab: (id) => api.get(`/api/v1/gst-slabs/${id}`),
  updateGstSlab: (id, data) => api.put(`/api/v1/gst-slabs/${id}`, data),
  deleteGstSlab: (id) => api.delete(`/api/v1/gst-slabs/${id}`),
  getAllGstSlabs: (params) => api.get('/api/v1/gst-slabs', { params }),
  createGstSlab: (data) => api.post('/api/v1/gst-slabs', data),
}

// Journal Entry Services
export const journalEntryService = {
  getJournalEntry: (id) => api.get(`/api/v1/journal-entries/${id}`),
  updateJournalEntry: (id, data) => api.put(`/api/v1/journal-entries/${id}`, data),
  deleteJournalEntry: (id) => api.delete(`/api/v1/journal-entries/${id}`),
  reverseJournalEntry: (id) => api.put(`/api/v1/journal-entries/${id}/reverse`),
  postJournalEntry: (id) => api.put(`/api/v1/journal-entries/${id}/post`),
  cancelJournalEntry: (id) => api.put(`/api/v1/journal-entries/${id}/cancel`),
  searchJournalEntries: (params) => api.get('/api/v1/journal-entries', { params }),
  createJournalEntry: (data) => api.post('/api/v1/journal-entries', data),
}

// Chart of Accounts Services
export const chartOfAccountsService = {
  getChartOfAccounts: (id) => api.get(`/api/v1/chart-of-accounts/${id}`),
  updateChartOfAccounts: (id, data) => api.put(`/api/v1/chart-of-accounts/${id}`, data),
  deleteChartOfAccounts: (id) => api.delete(`/api/v1/chart-of-accounts/${id}`),
  listChartOfAccounts: (params) => api.get('/api/v1/chart-of-accounts', { params }),
  createChartOfAccounts: (data) => api.post('/api/v1/chart-of-accounts', data),
}

// Fiscal Year Services
export const fiscalYearService = {
  getFiscalYear: (id) => api.get(`/api/v1/fiscal-years/${id}`),
  updateFiscalYear: (id, data) => api.put(`/api/v1/fiscal-years/${id}`, data),
  deleteFiscalYear: (id) => api.delete(`/api/v1/fiscal-years/${id}`),
  listFiscalYears: (params) => api.get('/api/v1/fiscal-years', { params }),
  createFiscalYear: (data) => api.post('/api/v1/fiscal-years', data),
}

// Budget Services
export const budgetService = {
  getBudgetLine: (id) => api.get(`/api/v1/budget-lines/${id}`),
  updateBudgetLine: (id, data) => api.put(`/api/v1/budget-lines/${id}`, data),
  deleteBudgetLine: (id) => api.delete(`/api/v1/budget-lines/${id}`),
  refreshBudgetLineUtilization: (id) => api.put(`/api/v1/budget-lines/${id}/refresh-utilization`),
  getBudgetHeader: (id) => api.get(`/api/v1/budget-headers/${id}`),
  updateBudgetHeader: (id, data) => api.put(`/api/v1/budget-headers/${id}`, data),
  deleteBudgetHeader: (id) => api.delete(`/api/v1/budget-headers/${id}`),
  listBudgets: (params) => api.get('/api/v1/budgets', { params }),
  createBudget: (data) => api.post('/api/v1/budgets', data),
}

// Bank Reconciliation Services
export const bankReconciliationService = {
  getTransaction: (id) => api.get(`/api/v1/transactions/${id}`),
  updateTransaction: (id, data) => api.put(`/api/v1/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/api/v1/transactions/${id}`),
  unreconcileTransaction: (id) => api.put(`/api/v1/transactions/${id}/unreconcile`),
  reverseTransaction: (id) => api.put(`/api/v1/transactions/${id}/reverse`),
  reconcileTransaction: (id) => api.put(`/api/v1/transactions/${id}/reconcile`),
  getBankAccount: (id) => api.get(`/api/v1/bank-accounts/${id}`),
  updateBankAccount: (id, data) => api.put(`/api/v1/bank-accounts/${id}`, data),
  deleteBankAccount: (id) => api.delete(`/api/v1/bank-accounts/${id}`),
  deactivateBankAccount: (id) => api.put(`/api/v1/bank-accounts/${id}/deactivate`),
  activateBankAccount: (id) => api.put(`/api/v1/bank-accounts/${id}/activate`),
  listBankAccounts: (params) => api.get('/api/v1/bank-accounts', { params }),
  createBankAccount: (data) => api.post('/api/v1/bank-accounts', data),
}

// Accounting Period Services
export const accountingPeriodService = {
  getAccountingPeriod: (id) => api.get(`/api/v1/accounting-periods/${id}`),
  updateAccountingPeriod: (id, data) => api.put(`/api/v1/accounting-periods/${id}`, data),
  deleteAccountingPeriod: (id) => api.delete(`/api/v1/accounting-periods/${id}`),
  listAccountingPeriods: (params) => api.get('/api/v1/accounting-periods', { params }),
  createAccountingPeriod: (data) => api.post('/api/v1/accounting-periods', data),
}

// Company Services
export const companyService = {
  getCompany: () => api.get('/api/v1/company'),
  updateCompany: (data) => api.put('/api/v1/company', data),
  deleteCompany: () => api.delete('/api/v1/company'),
}
