import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import DataTable from '../../components/tables/DataTable'
import { formatCurrency, formatDate } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function AccountsReceivablePage() {
  const [invoices] = useState([
    { id: 1, invoiceNumber: 'INV-001', customer: 'Customer A', amount: 1500, dueDate: '2024-02-15', status: 'paid', invoiceDate: '2024-01-15' },
    { id: 2, invoiceNumber: 'INV-002', customer: 'Customer B', amount: 2500, dueDate: '2024-02-20', status: 'pending', invoiceDate: '2024-01-20' },
    { id: 3, invoiceNumber: 'INV-003', customer: 'Customer C', amount: 800, dueDate: '2024-02-25', status: 'overdue', invoiceDate: '2024-01-25' },
  ])

  const agingData = [
    { days: 'Current', amount: 3000 },
    { days: '30 Days', amount: 1500 },
    { days: '60+ Days', amount: 800 },
  ]

  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0)

  const columns = [
    { key: 'invoiceNumber', label: 'Invoice #', width: '100px' },
    { key: 'customer', label: 'Customer', width: '150px' },
    { key: 'invoiceDate', label: 'Invoice Date', render: (val) => formatDate(val), width: '100px' },
    { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val), width: '100px' },
    { key: 'dueDate', label: 'Due Date', render: (val) => formatDate(val), width: '100px' },
    { key: 'status', label: 'Status', render: (val) => <span className={`px-2 py-1 rounded text-sm ${val === 'paid' ? 'bg-green-100 text-green-800' : val === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{val}</span>, width: '100px' },
  ]

  const handleCollectPayment = (id) => {
    toast.success('Payment received')
  }

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold mb-4">Accounts Receivable</h1>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Total Invoices</p>
            <p className="text-2xl font-bold">{formatCurrency(invoices.reduce((sum, i) => sum + i.amount, 0))}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Outstanding</p>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalOutstanding)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Overdue Invoices</p>
            <p className="text-2xl font-bold text-red-600">{invoices.filter(i => i.status === 'overdue').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Aging Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={agingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="days" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Outstanding Invoices</h3>
        <DataTable 
          columns={columns} 
          data={invoices.filter(i => i.status !== 'paid')} 
          rowsPerPage={10}
          actions={[
            { label: 'Collect', onClick: handleCollectPayment, color: 'green' }
          ]}
        />
      </div>
    </div>
  )
}
