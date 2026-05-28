import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, FileText, Users } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
]

const KpiCard = ({ icon: Icon, label, value, change }) => (
  <div className="bg-background border border-border rounded-lg p-6 space-y-2">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <Icon className="text-accent" size={24} />
    </div>
    <p className="text-2xl font-bold text-primary">{value}</p>
    {change && (
      <p className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '+' : ''}{change}% from last month
      </p>
    )}
  </div>
)

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to your ERP Finance & Accounting System</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={DollarSign} label="Total Revenue" value="$48,250" change={12.5} />
        <KpiCard icon={FileText} label="Pending Invoices" value="23" change={-5.2} />
        <KpiCard icon={Users} label="Active Vendors" value="156" change={8.1} />
        <KpiCard icon={TrendingUp} label="YTD Growth" value="24.8%" change={3.4} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-primary">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#0066cc" />
              <Bar dataKey="expenses" fill="#ff6b6b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Chart */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-primary">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0066cc" />
              <Line type="monotone" dataKey="expenses" stroke="#ff6b6b" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-mono text-xs">TXN{String(10001 + i).padStart(5, '0')}</td>
                  <td className="py-3 px-4">Invoice</td>
                  <td className="py-3 px-4 font-semibold">$2,500.00</td>
                  <td className="py-3 px-4">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
