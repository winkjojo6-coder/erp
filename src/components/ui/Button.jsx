import { forwardRef } from 'react'

const Button = forwardRef(({ variant = 'primary', size = 'md', disabled = false, className = '', children, ...props }, ref) => {
  const baseStyles = 'font-medium rounded transition-colors duration-200 font-sans inline-flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-gray-400 disabled:border-gray-400',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
