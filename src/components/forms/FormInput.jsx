import { forwardRef } from 'react'

const FormInput = forwardRef(
  ({ label, type = 'text', placeholder, error, required, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-foreground block">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-lg
            bg-background text-foreground
            placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-accent
            transition-colors
            ${error ? 'border-destructive' : 'border-input'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
export default FormInput
