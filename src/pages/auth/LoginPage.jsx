import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [formData, setFormData] = useState({
    email: 'demo@example.com',
    password: 'password123',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData.email, formData.password)
    if (result.payload?.user) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">ERP Finance & Accounting</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-background rounded-lg border border-border p-8 space-y-4"
      >
        {error && (
          <div className="bg-destructive text-destructive-foreground p-3 rounded-lg text-sm">
            {typeof error === 'string' ? error : error?.message || 'Login failed'}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="pt-4 text-center text-xs text-muted-foreground">
          <p>Demo Credentials</p>
          <p>Email: demo@example.com</p>
          <p>Password: password123</p>
        </div>
      </form>
    </div>
  )
}
