import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import AppLayout from './layouts/AppLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import InvoicesPage from './pages/sales/InvoicesPage'
import VendorsPage from './pages/vendors/VendorsPage'
import CustomersPage from './pages/customers/CustomersPage'
import GeneralLedgerPage from './pages/accounting/GeneralLedgerPage'
import AccountsPayablePage from './pages/accounting/AccountsPayablePage'
import AccountsReceivablePage from './pages/accounting/AccountsReceivablePage'
import ExpensesPage from './pages/expenses/ExpensesPage'
import BudgetPage from './pages/budget/BudgetPage'
import BankReconciliationPage from './pages/banking/BankReconciliationPage'
import TaxPage from './pages/tax/TaxPage'
import ReportsPage from './pages/reports/ReportsPage'
import SettingsPage from './pages/settings/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      {/* All App Routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sales/invoices" element={<InvoicesPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/accounting/general-ledger" element={<GeneralLedgerPage />} />
        <Route path="/accounting/accounts-payable" element={<AccountsPayablePage />} />
        <Route path="/accounting/accounts-receivable" element={<AccountsReceivablePage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/banking/reconciliation" element={<BankReconciliationPage />} />
        <Route path="/tax" element={<TaxPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
