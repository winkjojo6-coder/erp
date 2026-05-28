import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import invoiceReducer from './slices/invoiceSlice'
import vendorReducer from './slices/vendorSlice'
import customerReducer from './slices/customerSlice'
import accountsPayableReducer from './slices/accountsPayableSlice'
import budgetReducer from './slices/budgetSlice'
import expenseReducer from './slices/expenseSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    invoice: invoiceReducer,
    vendor: vendorReducer,
    customer: customerReducer,
    accountsPayable: accountsPayableReducer,
    budget: budgetReducer,
    expense: expenseReducer,
  },
})
