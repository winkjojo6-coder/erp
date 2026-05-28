import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

export const invoiceSchema = yup.object().shape({
  invoiceNumber: yup.string().required('Invoice number is required'),
  customerId: yup.string().required('Customer is required'),
  invoiceDate: yup.date().required('Invoice date is required'),
  dueDate: yup.date().required('Due date is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  description: yup.string(),
})

export const vendorSchema = yup.object().shape({
  name: yup.string().required('Vendor name is required'),
  email: yup.string().email('Invalid email'),
  phone: yup.string(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  postalCode: yup.string(),
  country: yup.string(),
})

export const customerSchema = yup.object().shape({
  name: yup.string().required('Customer name is required'),
  email: yup.string().email('Invalid email'),
  phone: yup.string(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  postalCode: yup.string(),
  country: yup.string(),
})

export const budgetSchema = yup.object().shape({
  name: yup.string().required('Budget name is required'),
  period: yup.string().required('Period is required'),
  totalAmount: yup.number().positive('Amount must be positive').required('Total amount is required'),
})

export const expenseSchema = yup.object().shape({
  categoryId: yup.string().required('Category is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  description: yup.string().required('Description is required'),
  expenseDate: yup.date().required('Expense date is required'),
})

export const bankAccountSchema = yup.object().shape({
  accountName: yup.string().required('Account name is required'),
  bankName: yup.string().required('Bank name is required'),
  accountNumber: yup.string().required('Account number is required'),
  accountType: yup.string().required('Account type is required'),
})

// Aliases for pages
export const invoiceValidationSchema = invoiceSchema
export const vendorValidationSchema = yup.object({
  vendorName: yup.string().required('Vendor name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone is required'),
  city: yup.string().required('City is required'),
})
export const customerValidationSchema = yup.object({
  customerName: yup.string().required('Customer name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone is required'),
  city: yup.string().required('City is required'),
})
export const expenseValidationSchema = yup.object({
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  vendor: yup.string().required('Vendor is required'),
})
