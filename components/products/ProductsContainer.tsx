'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'
import { ProductSearch } from './ProductSearch'
import { ProductList } from './ProductList'
import { ProductDetail } from './ProductDetail'
import { ProductListSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { Drawer } from '@/components/ui/Drawer'

export function ProductsContainer() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { products, loading, error, loadProducts, toggleStatus } = useProducts(searchQuery)

  const handleToggleStatus = async (id: string) => {
    await toggleStatus(id)
    // Keep drawer in sync after toggle
    if (selectedProduct?.id === id) {
      setSelectedProduct((prev) =>
        prev ? { ...prev, status: prev.status === 'ativo' ? 'inativo' : 'ativo' } : null
      )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductSearch
        value={searchQuery}
        onChange={setSearchQuery}
        resultCount={loading ? undefined : products.length}
      />

      {loading && <ProductListSkeleton />}

      {!loading && error && (
        <ErrorState message={error} onRetry={loadProducts} />
      )}

      {!loading && !error && (
        <ProductList
          products={products}
          onProductClick={setSelectedProduct}
          searchQuery={searchQuery}
        />
      )}

      <Drawer
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="Detalhes do produto"
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </Drawer>
    </div>
  )
}
