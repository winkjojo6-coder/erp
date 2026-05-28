import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const theme = useSelector((state) => state.ui.theme)

  return (
    <div className={theme}>
      <div className="flex h-screen bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
