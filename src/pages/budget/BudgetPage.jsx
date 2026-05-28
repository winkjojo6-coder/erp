import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import DataTable from '../../components/tables/DataTable'
import { formatCurrency } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function BudgetPage() {
  const [activeBudget, setActiveBudget] = useState('2024')
  
  const budgetData = [
    { department: 'Sales', budgeted: 50000, actual: 45000, variance: 5000 },
    { department: 'Marketing', budgeted: 30000, actual: 32000, variance: -2000 },
    { department: 'Operations', budgeted: 40000, actual: 38000, variance: 2000 },
    { department: 'IT', budgeted: 25000, actual: 24500, variance: 500 },
  ]

  const monthlyData = [
    { month: 'Jan', budget: 40000, actual: 38000 },
    { month: 'Feb', budget: 42000, actual: 41000 },
    { month: 'Mar', budget: 41000, actual: 43000 },
    { month: 'Apr', budget: 40000, actual: 39000 },
  ]

  const columns = [
    { key: 'department', label: 'Department', width: '150px' },
    { key: 'budgeted', label: 'Budgeted', render: (val) => formatCurrency(val), width: '120px' },
    { key: 'actual', label: 'Actual', render: (val) => formatCurrency(val), width: '120px' },
    { key: 'variance', label: 'Variance', render: (val) => <span className={val >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(val)}</span>, width: '120px' },
  ]

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold mb-4">Budget Management</h1>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveBudget('2024')} className={`px-4 py-2 rounded ${activeBudget === '2024' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2024</button>
          <button onClick={() => setActiveBudget('2025')} className={`px-4 py-2 rounded ${activeBudget === '2025' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2025</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Budget by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="budgeted" fill="#3b82f6" />
            <Bar dataKey="actual" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Budget Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="budget" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Budget Details</h3>
        <DataTable columns={columns} data={budgetData} rowsPerPage={10} />
      </div>
    </div>
  )
}
