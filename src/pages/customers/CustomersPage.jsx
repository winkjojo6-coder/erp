import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../store/slices/customerSlice'
import { customerValidationSchema } from '../../utils/validationSchemas'
import DataTable from '../../components/tables/DataTable'
import FormInput from '../../components/forms/FormInput'
import { formatCurrency } from '../../utils/utils'
import { Toaster, toast } from 'sonner'

export default function CustomersPage() {
  const dispatch = useDispatch()
  const { customers, loading } = useSelector(state => state.customer)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(customerValidationSchema),
  })

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await dispatch(updateCustomer({ id: editingId, ...data })).unwrap()
        toast.success('Customer updated')
      } else {
        await dispatch(createCustomer(data)).unwrap()
        toast.success('Customer created')
      }
      setIsModalOpen(false)
      setEditingId(null)
      reset()
      dispatch(fetchCustomers())
    } catch (err) {
      toast.error('Failed to save customer')
    }
  }

  const handleEdit = (customer) => {
    setEditingId(customer.id)
    reset(customer)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await dispatch(deleteCustomer(id)).unwrap()
        toast.success('Customer deleted')
        dispatch(fetchCustomers())
      } catch {
        toast.error('Failed to delete customer')
      }
    }
  }

  const filteredCustomers = customers.filter(c => 
    c.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { key: 'customerName', label: 'Customer Name', width: '200px' },
    { key: 'email', label: 'Email', width: '200px' },
    { key: 'phone', label: 'Phone', width: '150px' },
    { key: 'city', label: 'City', width: '150px' },
    { key: 'totalPurchases', label: 'Total Purchases', render: (val) => formatCurrency(val), width: '120px' },
    { key: 'status', label: 'Status', render: (val) => <span className={`px-2 py-1 rounded text-sm ${val === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{val}</span>, width: '100px' },
  ]

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <button onClick={() => { setEditingId(null); reset(); setIsModalOpen(true) }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Customer</button>
      </div>

      <input type="text" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border rounded" />

      {loading ? <div>Loading...</div> : <DataTable columns={columns} data={filteredCustomers} onEdit={handleEdit} onDelete={handleDelete} rowsPerPage={10} />}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Customer' : 'New Customer'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput label="Customer Name" {...register('customerName')} error={errors.customerName?.message} />
              <FormInput label="Email" type="email" {...register('email')} error={errors.email?.message} />
              <FormInput label="Phone" {...register('phone')} error={errors.phone?.message} />
              <FormInput label="City" {...register('city')} error={errors.city?.message} />
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
