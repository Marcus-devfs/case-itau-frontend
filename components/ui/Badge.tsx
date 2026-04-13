import { cn } from '@/lib/utils'

type BadgeVariant = 'ativo' | 'inativo' | 'cartao' | 'conta' | 'credito' | 'investimento' | 'seguro'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  ativo: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  inativo: 'bg-zinc-100 text-zinc-500 border-zinc-200',
  cartao: 'bg-orange-50 text-orange-700 border-orange-200',
  conta: 'bg-blue-50 text-blue-700 border-blue-200',
  credito: 'bg-purple-50 text-purple-700 border-purple-200',
  investimento: 'bg-teal-50 text-teal-700 border-teal-200',
  seguro: 'bg-amber-50 text-amber-700 border-amber-200',
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
