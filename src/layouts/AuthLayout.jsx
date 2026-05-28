import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
