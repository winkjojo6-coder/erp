import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import DataTable from '../../components/tables/DataTable'
import { formatCurrency, formatDate } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function TaxPage() {
  const [taxPeriod, setTaxPeriod] = useState('quarterly')
  
  const gstData = [
    { period: 'Q1', taxable: 45000, tax: 9000, paid: 8500, due: 500 },
    { period: 'Q2', taxable: 52000, tax: 10400, paid: 10400, due: 0 },
    { period: 'Q3', taxable: 48000, tax: 9600, paid: 9000, due: 600 },
    { period: 'Q4', taxable: 61000, tax: 12200, paid: 11000, due: 1200 },
  ]

  const taxReturns = [
    { id: 1, period: '2024-Q1', dueDate: '2024-04-30', status: 'filed', amount: 9000 },
    { id: 2, period: '2024-Q2', dueDate: '2024-07-31', status: 'filed', amount: 10400 },
    { id: 3, period: '2024-Q3', dueDate: '2024-10-31', status: 'pending', amount: 9600 },
  ]

  const columns = [
    { key: 'period', label: 'Tax Period', width: '120px' },
    { key: 'dueDate', label: 'Due Date', render: (val) => formatDate(val), width: '120px' },
    { key: 'amount', label: 'Tax Amount', render: (val) => formatCurrency(val), width: '120px' },
    { key: 'status', label: 'Status', render: (val) => <span className={`px-2 py-1 rounded text-sm ${val === 'filed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{val}</span>, width: '100px' },
  ]

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold mb-4">Tax Management</h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Total Taxable</p>
            <p className="text-2xl font-bold">{formatCurrency(gstData.reduce((sum, d) => sum + d.taxable, 0))}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Total Tax</p>
            <p className="text-2xl font-bold">{formatCurrency(gstData.reduce((sum, d) => sum + d.tax, 0))}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Tax Paid</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(gstData.reduce((sum, d) => sum + d.paid, 0))}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Tax Due</p>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(gstData.reduce((sum, d) => sum + d.due, 0))}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b mb-4">
        <button onClick={() => setTaxPeriod('quarterly')} className={`px-4 py-2 ${taxPeriod === 'quarterly' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Quarterly</button>
        <button onClick={() => setTaxPeriod('annual')} className={`px-4 py-2 ${taxPeriod === 'annual' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Annual</button>
      </div>

      {taxPeriod === 'quarterly' && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">GST by Quarter</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gstData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="tax" fill="#3b82f6" />
              <Bar dataKey="paid" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Tax Returns</h3>
        <DataTable columns={columns} data={taxReturns} rowsPerPage={10} />
      </div>

      <div className="flex gap-2">
        <button onClick={() => toast.success('Tax return generated')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Tax Return</button>
        <button onClick={() => toast.success('Report exported')} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Export Report</button>
      </div>
    </div>
  )
}
