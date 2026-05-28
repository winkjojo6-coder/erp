import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('pl')

  const plData = [
    { month: 'Jan', revenue: 45000, expenses: 28000, profit: 17000 },
    { month: 'Feb', revenue: 52000, expenses: 31000, profit: 21000 },
    { month: 'Mar', revenue: 48000, expenses: 29000, profit: 19000 },
    { month: 'Apr', revenue: 61000, expenses: 35000, profit: 26000 },
  ]

  const balanceSheetData = [
    { name: 'Assets', value: 150000 },
    { name: 'Liabilities', value: 60000 },
    { name: 'Equity', value: 90000 },
  ]

  const colors = ['#3b82f6', '#ef4444', '#10b981']

  const exportReport = (format) => {
    toast.success(`Report exported as ${format.toUpperCase()}`)
  }

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <div className="flex gap-2">
          <button onClick={() => exportReport('pdf')} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Export PDF</button>
          <button onClick={() => exportReport('excel')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Export Excel</button>
        </div>
      </div>

      <div className="flex gap-4 border-b">
        <button onClick={() => setReportType('pl')} className={`px-4 py-2 ${reportType === 'pl' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>P&L Statement</button>
        <button onClick={() => setReportType('bs')} className={`px-4 py-2 ${reportType === 'bs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Balance Sheet</button>
        <button onClick={() => setReportType('cf')} className={`px-4 py-2 ${reportType === 'cf' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Cash Flow</button>
      </div>

      {reportType === 'pl' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Profit & Loss Statement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" />
                <Bar dataKey="expenses" fill="#ef4444" />
                <Bar dataKey="profit" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {reportType === 'bs' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Balance Sheet</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={balanceSheetData} cx="50%" cy="50%" labelLine={false} label={({name, value}) => `${name}: ${formatCurrency(value)}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {balanceSheetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {reportType === 'cf' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Cash Flow Statement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={plData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
