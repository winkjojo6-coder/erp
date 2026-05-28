import { forwardRef } from 'react'

const FormSelect = forwardRef(
  ({ label, options, error, required, placeholder = 'Select an option', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-foreground block">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-lg
            bg-background text-foreground
            focus:outline-none focus:ring-2 focus:ring-accent
            transition-colors
            ${error ? 'border-destructive' : 'border-input'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
export default FormSelect
