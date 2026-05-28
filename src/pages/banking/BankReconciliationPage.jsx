import { useState } from 'react'
import DataTable from '../../components/tables/DataTable'
import { formatCurrency, formatDate } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function BankReconciliationPage() {
  const [reconciliation, setReconciliation] = useState({
    bankBalance: 45000,
    bookBalance: 42500,
    uncleared: [
      { id: 1, date: '2024-01-25', description: 'Check #1001', amount: 2500, cleared: false },
      { id: 2, date: '2024-01-26', description: 'Check #1002', amount: 500, cleared: false },
    ],
    deposits: [
      { id: 1, date: '2024-01-20', description: 'Deposit', amount: 5000, cleared: true },
      { id: 2, date: '2024-01-21', description: 'Deposit', amount: 3000, cleared: true },
    ],
  })

  const handleClearItem = (id) => {
    setReconciliation({
      ...reconciliation,
      uncleared: reconciliation.uncleared.map(item =>
        item.id === id ? { ...item, cleared: !item.cleared } : item
      ),
    })
    toast.success('Item cleared')
  }

  const checkColumns = [
    { key: 'date', label: 'Date', render: (val) => formatDate(val), width: '100px' },
    { key: 'description', label: 'Description', width: '200px' },
    { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val), width: '120px' },
    {
      key: 'cleared',
      label: 'Cleared',
      render: (val) => (
        <input type="checkbox" checked={val} readOnly className="cursor-pointer" />
      ),
      width: '80px',
    },
  ]

  const depositColumns = [
    { key: 'date', label: 'Date', render: (val) => formatDate(val), width: '100px' },
    { key: 'description', label: 'Description', width: '200px' },
    { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val), width: '120px' },
    { key: 'cleared', label: 'Status', render: (val) => <span className="text-green-600">{val ? 'Cleared' : 'Pending'}</span>, width: '80px' },
  ]

  const unclearedChecks = reconciliation.uncleared.filter(c => !c.cleared)
  const totalUncleared = unclearedChecks.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold mb-4">Bank Reconciliation</h1>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Bank Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(reconciliation.bankBalance)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Book Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(reconciliation.bookBalance)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Difference</p>
            <p className={`text-2xl font-bold ${reconciliation.bankBalance === reconciliation.bookBalance ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(reconciliation.bankBalance - reconciliation.bookBalance)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Outstanding Checks ({unclearedChecks.length})</h3>
        <DataTable columns={checkColumns} data={unclearedChecks} rowsPerPage={10} />
        <div className="mt-4 text-right text-lg font-semibold">
          Total Uncleared: {formatCurrency(totalUncleared)}
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Deposits</h3>
        <DataTable columns={depositColumns} data={reconciliation.deposits} rowsPerPage={10} />
      </div>

      <div className="flex gap-2">
        <button onClick={() => toast.success('Reconciliation saved')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Reconciliation</button>
        <button onClick={() => toast.success('Report generated')} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Generate Report</button>
      </div>
    </div>
  )
}
