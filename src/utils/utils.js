// Currency Formatting
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Date Formatting
export const formatDate = (date, format = 'MM/DD/YYYY') => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()

  const formats = {
    'MM/DD/YYYY': `${month}/${day}/${year}`,
    'DD/MM/YYYY': `${day}/${month}/${year}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
  }

  return formats[format] || formats['MM/DD/YYYY']
}

// Percentage Formatting
export const formatPercentage = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`
}

// Number Formatting
export const formatNumber = (num, decimals = 2) => {
  return Number(num).toFixed(decimals)
}

// Calculate GST
export const calculateGST = (amount, gstRate = 0.18) => {
  const gstAmount = amount * gstRate
  const total = amount + gstAmount
  return {
    baseAmount: amount,
    gstAmount: gstAmount.toFixed(2),
    totalAmount: total.toFixed(2),
    gstRate: (gstRate * 100).toFixed(0),
  }
}

// Calculate Discount
export const calculateDiscount = (amount, discountPercent) => {
  const discountAmount = amount * (discountPercent / 100)
  const finalAmount = amount - discountAmount
  return {
    originalAmount: amount,
    discountAmount: discountAmount.toFixed(2),
    finalAmount: finalAmount.toFixed(2),
  }
}

// Get Status Color
export const getStatusColor = (status) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
    completed: 'bg-blue-100 text-blue-800',
    overdue: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

// Calculate Age (for aging reports)
export const calculateAge = (date) => {
  const today = new Date()
  const invoiceDate = new Date(date)
  const diffTime = Math.abs(today - invoiceDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Group By Property
export const groupBy = (array, property) => {
  return array.reduce((groups, item) => {
    const key = item[property]
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {})
}

// Sum Array Values
export const sumByProperty = (array, property) => {
  return array.reduce((sum, item) => sum + (parseFloat(item[property]) || 0), 0)
}

// Debounce Function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Export to CSV
export const exportToCSV = (data, filename = 'export.csv') => {
  const csv = [
    Object.keys(data[0]),
    ...data.map((row) => Object.values(row)),
  ]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}
