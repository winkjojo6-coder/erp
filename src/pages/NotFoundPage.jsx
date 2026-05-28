import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold text-foreground">Page Not Found</p>
        <p className="text-muted-foreground max-w-md">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
