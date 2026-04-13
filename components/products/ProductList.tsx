import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface ProductListProps {
  products: Product[]
  onProductClick: (product: Product) => void
  searchQuery: string
}

export function ProductList({ products, onProductClick, searchQuery }: ProductListProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="Nenhum produto encontrado"
        description={
          searchQuery
            ? `Não encontramos produtos com "${searchQuery}". Tente outro termo.`
            : 'Você ainda não possui produtos financeiros.'
        }
      />
    )
  }

  return (
    <ul className="flex flex-col gap-3" role="list" aria-label="Lista de produtos financeiros">
      {products.map((product) => (
        <li key={product.id} role="listitem">
          <ProductCard product={product} onClick={() => onProductClick(product)} />
        </li>
      ))}
    </ul>
  )
}
