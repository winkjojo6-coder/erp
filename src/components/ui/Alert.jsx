import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useState } from 'react'

export default function Alert({ type = 'info', title, message, dismissible = true, className = '' }) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  const types = {
    success: { icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon_color: 'text-green-600' },
    error: { icon: AlertCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon_color: 'text-red-600' },
    warning: { icon: AlertTriangle, bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon_color: 'text-yellow-600' },
    info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon_color: 'text-blue-600' },
  }

  const config = types[type]
  const IconComponent = config.icon

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 flex gap-3 ${className}`}>
      <IconComponent className={`${config.icon_color} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        {title && <h3 className={`${config.text} font-semibold`}>{title}</h3>}
        {message && <p className={`${config.text} text-sm`}>{message}</p>}
      </div>
      {dismissible && (
        <button onClick={() => setIsOpen(false)} className={`${config.text} hover:opacity-70`}>
          <X size={18} />
        </button>
      )}
    </div>
  )
}
