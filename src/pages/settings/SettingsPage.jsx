import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { Toaster, toast } from 'sonner'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      companyName: 'ABC Corporation',
      taxId: '12-3456789',
      email: 'info@abc.com',
      phone: '(555) 123-4567',
      currency: 'USD',
      fiscalYearEnd: '12',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light',
    }
  })

  const onSubmit = (data) => {
    toast.success('Settings saved successfully')
  }

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="flex gap-2 border-b">
        <button onClick={() => setActiveTab('company')} className={`px-4 py-2 ${activeTab === 'company' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Company</button>
        <button onClick={() => setActiveTab('accounting')} className={`px-4 py-2 ${activeTab === 'accounting' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Accounting</button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Users</button>
        <button onClick={() => setActiveTab('preferences')} className={`px-4 py-2 ${activeTab === 'preferences' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Preferences</button>
      </div>

      {activeTab === 'company' && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Company Information</h2>
          <FormInput label="Company Name" {...register('companyName')} error={errors.companyName?.message} />
          <FormInput label="Tax ID / EIN" {...register('taxId')} error={errors.taxId?.message} />
          <FormInput label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <FormInput label="Phone" {...register('phone')} error={errors.phone?.message} />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
        </form>
      )}

      {activeTab === 'accounting' && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Accounting Settings</h2>
          <FormSelect label="Currency" {...register('currency')} options={[{label: 'USD', value: 'USD'}, {label: 'EUR', value: 'EUR'}, {label: 'GBP', value: 'GBP'}]} error={errors.currency?.message} />
          <FormSelect label="Fiscal Year Ends (Month)" {...register('fiscalYearEnd')} options={Array.from({length: 12}, (_, i) => ({label: String(i+1).padStart(2, '0'), value: String(i+1)}))} error={errors.fiscalYearEnd?.message} />
          <FormSelect label="Date Format" {...register('dateFormat')} options={[{label: 'MM/DD/YYYY', value: 'MM/DD/YYYY'}, {label: 'DD/MM/YYYY', value: 'DD/MM/YYYY'}, {label: 'YYYY-MM-DD', value: 'YYYY-MM-DD'}]} error={errors.dateFormat?.message} />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
        </form>
      )}

      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded shadow max-w-2xl">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded">
              <div>
                <p className="font-semibold">Admin User</p>
                <p className="text-sm text-gray-600">admin@abc.com</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Admin</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add User</button>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">User Preferences</h2>
          <FormSelect label="Theme" {...register('theme')} options={[{label: 'Light', value: 'light'}, {label: 'Dark', value: 'dark'}, {label: 'Auto', value: 'auto'}]} error={errors.theme?.message} />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="notifications" defaultChecked className="rounded" />
            <label htmlFor="notifications">Enable Email Notifications</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="twoFactor" className="rounded" />
            <label htmlFor="twoFactor">Enable Two-Factor Authentication</label>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
        </form>
      )}
    </div>
  )
}
