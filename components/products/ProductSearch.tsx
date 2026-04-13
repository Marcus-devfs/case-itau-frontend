'use client'

import { Input } from '@/components/ui/Input'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
  resultCount?: number
}

const SearchIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
  </svg>
)

const ClearIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export function ProductSearch({ value, onChange, resultCount }: ProductSearchProps) {
  return (
    <div>
      <Input
        type="search"
        role="searchbox"
        aria-label="Buscar produtos por nome, tipo ou status"
        placeholder="Buscar por nome, tipo ou status..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leadingIcon={SearchIcon}
        trailingIcon={
          value ? (
            <button
              onClick={() => onChange('')}
              aria-label="Limpar busca"
              className="pointer-events-auto hover:text-zinc-600 transition-colors"
            >
              {ClearIcon}
            </button>
          ) : null
        }
      />
      {value && resultCount !== undefined && (
        <p className="text-xs text-zinc-500 mt-2" role="status" aria-live="polite">
          {resultCount === 0
            ? 'Nenhum produto encontrado'
            : `${resultCount} produto${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  )
}
