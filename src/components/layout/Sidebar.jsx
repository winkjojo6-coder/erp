import { Link, useLocation } from 'react-router-dom'
import { Menu, BarChart3, FileText, Users, Settings, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { section: 'Sales & AR', items: [
    { path: '/sales/invoices', label: 'Invoices', icon: ShoppingCart },
    { path: '/customers', label: 'Customers', icon: Users },
  ]},
  { section: 'Vendors & AP', items: [
    { path: '/vendors', label: 'Vendors', icon: Users },
    { path: '/accounting/accounts-payable', label: 'Accounts Payable', icon: FileText },
  ]},
  { section: 'Accounting', items: [
    { path: '/accounting/general-ledger', label: 'General Ledger', icon: DollarSign },
    { path: '/accounting/accounts-receivable', label: 'Accounts Receivable', icon: TrendingUp },
    { path: '/budget', label: 'Budget', icon: TrendingUp },
    { path: '/expenses', label: 'Expenses', icon: FileText },
  ]},
  { section: 'Finance', items: [
    { path: '/banking/reconciliation', label: 'Bank Reconciliation', icon: DollarSign },
    { path: '/tax', label: 'Tax Management', icon: FileText },
  ]},
  { section: 'Reports', items: [
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ]},
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open }) {
  const location = useLocation()

  return (
    <aside
      className={`
        ${open ? 'w-64' : 'w-20'}
        bg-primary text-primary-foreground
        border-r border-border
        transition-all duration-300 ease-in-out
        flex flex-col
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        {open ? (
          <div className="text-lg font-bold">ERP System</div>
        ) : (
          <Menu size={20} />
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item, idx) => {
          // Render section header with items
          if (item.section) {
            return (
              <div key={item.section}>
                {open && <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">{item.section}</div>}
                {item.items.map((subItem) => {
                  const Icon = subItem.icon
                  const isActive = location.pathname === subItem.path
                  return (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
                        transition-colors duration-200
                        ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-opacity-10 hover:bg-white'}
                      `}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {open && <span className="text-sm font-medium">{subItem.label}</span>}
                    </Link>
                  )
                })}
              </div>
            )
          }

          // Render single menu item
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
                transition-colors duration-200
                ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-opacity-10 hover:bg-white'}
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              {open && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors"
        >
          <Settings size={20} />
          {open && <span className="text-sm">Settings</span>}
        </Link>
      </div>
    </aside>
  )
}
