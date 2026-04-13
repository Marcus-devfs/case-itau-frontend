import { Product, ProductType } from '@/types/product'
import { Badge } from '@/components/ui/Badge'
import { Switch } from '@/components/ui/Switch'
import { ProductTypeIcon } from './ProductTypeIcon'
import { formatDate, formatInterestRate } from '@/lib/utils'

interface ProductDetailProps {
  product: Product
  onToggleStatus: (id: string) => void
}

function typeVariant(type: ProductType) {
  return type.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') as
    | 'cartao'
    | 'conta'
    | 'credito'
    | 'investimento'
    | 'seguro'
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-4 border-b border-zinc-100 last:border-0">
      <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm font-medium text-zinc-800">{children}</dd>
    </div>
  )
}

export function ProductDetail({ product, onToggleStatus }: ProductDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-2xl">
        <ProductTypeIcon type={product.type} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-zinc-900 leading-tight">{product.name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={typeVariant(product.type)}>{product.type}</Badge>
            <Badge variant={product.status}>
              {product.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
        </div>
      </div>

      <dl className="divide-y divide-zinc-100">
        <DetailRow label="Descrição">
          <span className="text-zinc-600 font-normal leading-relaxed">{product.description}</span>
        </DetailRow>

        {product.interestRate !== undefined && (
          <DetailRow label="Taxa de juros">
            <span className="text-itau-orange font-semibold">
              {formatInterestRate(product.interestRate)}
            </span>
          </DetailRow>
        )}

        <DetailRow label="Data de criação">{formatDate(product.createdAt)}</DetailRow>

        <DetailRow label="Status do produto">
          <Switch
            checked={product.status === 'ativo'}
            onChange={() => onToggleStatus(product.id)}
            label={product.status === 'ativo' ? 'Produto ativo' : 'Produto inativo'}
            id={`toggle-${product.id}`}
          />
        </DetailRow>
      </dl>

      <p className="text-xs text-zinc-400 text-center">
        {product.status === 'ativo'
          ? 'Desative o produto para suspender temporariamente.'
          : 'Ative o produto para habilitá-lo novamente.'}
      </p>
    </div>
  )
}
