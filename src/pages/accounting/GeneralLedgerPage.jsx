import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import DataTable from '../../components/tables/DataTable'
import { formatCurrency, formatDate } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function GeneralLedgerPage() {
  const [entries, setEntries] = useState([])
  const [summary, setSummary] = useState({ totalDebit: 0, totalCredit: 0, balance: 0 })
  const [filters, setFilters] = useState({ account: '', startDate: '', endDate: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const mockEntries = [
      { id: 1, date: '2024-01-15', account: '1000 Cash', debit: 5000, credit: 0, description: 'Initial cash deposit', balance: 5000 },
      { id: 2, date: '2024-01-16', account: '4000 Revenue', debit: 0, credit: 2000, description: 'Invoice #001', balance: 7000 },
      { id: 3, date: '2024-01-17', account: '2000 Payables', debit: 500, credit: 0, description: 'Payment to vendor', balance: 6500 },
    ]
    setEntries(mockEntries)
    setSummary({ totalDebit: 5500, totalCredit: 2000, balance: 3500 })
    setLoading(false)
  }, [])

  const columns = [
    { key: 'date', label: 'Date', render: (val) => formatDate(val), width: '100px' },
    { key: 'account', label: 'Account', width: '200px' },
    { key: 'description', label: 'Description', width: '250px' },
    { key: 'debit', label: 'Debit', render: (val) => formatCurrency(val), width: '100px' },
    { key: 'credit', label: 'Credit', render: (val) => formatCurrency(val), width: '100px' },
    { key: 'balance', label: 'Balance', render: (val) => formatCurrency(val), width: '100px' },
  ]

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold mb-4">General Ledger</h1>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Total Debits</p>
            <p className="text-2xl font-bold">{formatCurrency(summary.totalDebit)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Total Credits</p>
            <p className="text-2xl font-bold">{formatCurrency(summary.totalCredit)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Balance</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.balance)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" placeholder="Account..." value={filters.account} onChange={(e) => setFilters({...filters, account: e.target.value})} className="px-3 py-2 border rounded" />
          <input type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} className="px-3 py-2 border rounded" />
          <input type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} className="px-3 py-2 border rounded" />
        </div>
      </div>

      {loading ? <div>Loading...</div> : <DataTable columns={columns} data={entries} rowsPerPage={15} />}
    </div>
  )
}
