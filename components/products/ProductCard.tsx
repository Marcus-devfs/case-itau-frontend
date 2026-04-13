import { Product, ProductType } from '@/types/product'
import { Badge } from '@/components/ui/Badge'
import { ProductTypeIcon } from './ProductTypeIcon'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

function typeVariant(type: ProductType) {
  return type.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') as
    | 'cartao'
    | 'conta'
    | 'credito'
    | 'investimento'
    | 'seguro'
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Ver detalhes de ${product.name}`}
      className="w-full text-left bg-white rounded-2xl p-4 border border-zinc-100 flex items-center gap-4
                 hover:border-itau-orange/40 hover:shadow-sm active:bg-zinc-50
                 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-itau-orange/50"
    >
      <ProductTypeIcon type={product.type} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-900 truncate">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={typeVariant(product.type)}>{product.type}</Badge>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <Badge variant={product.status}>{product.status === 'ativo' ? 'Ativo' : 'Inativo'}</Badge>
        <svg
          className="h-4 w-4 text-zinc-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </button>
  )
}
