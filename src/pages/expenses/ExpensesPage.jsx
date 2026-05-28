import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { expenseValidationSchema } from '../../utils/validationSchemas'
import DataTable from '../../components/tables/DataTable'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { formatCurrency, formatDate } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filters, setFilters] = useState({ status: 'all', category: '' })

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(expenseValidationSchema),
  })

  useEffect(() => {
    // Simulate API call
    setExpenses([
      { id: 1, date: '2024-01-15', description: 'Office supplies', category: 'supplies', amount: 250, status: 'approved', vendor: 'Office Depot' },
      { id: 2, date: '2024-01-16', description: 'Travel expense', category: 'travel', amount: 500, status: 'pending', vendor: 'Airline' },
      { id: 3, date: '2024-01-17', description: 'Utilities', category: 'utilities', amount: 300, status: 'approved', vendor: 'Electric Co' },
    ])
  }, [])

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        setExpenses(expenses.map(e => e.id === editingId ? {...e, ...data} : e))
        toast.success('Expense updated')
      } else {
        setExpenses([...expenses, { id: expenses.length + 1, ...data, date: new Date().toISOString() }])
        toast.success('Expense created')
      }
      setIsModalOpen(false)
      setEditingId(null)
      reset()
    } catch {
      toast.error('Failed to save expense')
    }
  }

  const handleEdit = (expense) => {
    setEditingId(expense.id)
    reset(expense)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setExpenses(expenses.filter(e => e.id !== id))
      toast.success('Expense deleted')
    }
  }

  const filteredExpenses = expenses.filter(e => {
    if (filters.status !== 'all' && e.status !== filters.status) return false
    if (filters.category && e.category !== filters.category) return false
    return true
  })

  const columns = [
    { key: 'date', label: 'Date', render: (val) => formatDate(val), width: '100px' },
    { key: 'description', label: 'Description', width: '200px' },
    { key: 'category', label: 'Category', width: '100px' },
    { key: 'vendor', label: 'Vendor', width: '150px' },
    { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val), width: '100px' },
    { key: 'status', label: 'Status', render: (val) => <span className={`px-2 py-1 rounded text-sm ${val === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{val}</span>, width: '100px' },
  ]

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button onClick={() => { setEditingId(null); reset(); setIsModalOpen(true) }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">New Expense</button>
      </div>

      <div className="flex gap-4">
        <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} className="px-3 py-2 border rounded">
          <option value="">All Categories</option>
          <option value="supplies">Supplies</option>
          <option value="travel">Travel</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select>
        <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-3 py-2 border rounded">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <DataTable columns={columns} data={filteredExpenses} onEdit={handleEdit} onDelete={handleDelete} rowsPerPage={10} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Expense' : 'New Expense'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput label="Description" {...register('description')} error={errors.description?.message} />
              <FormSelect label="Category" {...register('category')} options={[{label: 'Supplies', value: 'supplies'}, {label: 'Travel', value: 'travel'}, {label: 'Utilities', value: 'utilities'}]} error={errors.category?.message} />
              <FormInput label="Amount" type="number" {...register('amount')} error={errors.amount?.message} />
              <FormInput label="Vendor" {...register('vendor')} error={errors.vendor?.message} />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
