import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}
