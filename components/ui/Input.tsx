import { cn } from '@/lib/utils'
import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  error?: string
}

export function Input({
  label,
  leadingIcon,
  trailingIcon,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leadingIcon && (
          <span className="absolute left-3 text-zinc-400 pointer-events-none" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full h-11 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm outline-none transition-all',
            'placeholder:text-zinc-400',
            'focus:border-itau-orange focus:ring-2 focus:ring-itau-orange/20',
            'disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed',
            leadingIcon ? 'pl-10' : 'pl-4',
            trailingIcon ? 'pr-10' : 'pr-4',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-100',
            className
          )}
          {...props}
        />
        {trailingIcon && (
          <span className="absolute right-3 text-zinc-400 pointer-events-none">
            {trailingIcon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
