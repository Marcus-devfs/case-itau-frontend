'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ProductStatus, ProductsState } from '@/types/product'
import { fetchProducts, toggleProductStatus } from '@/services/products'

export function useProducts(searchQuery: string = '') {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
  })

  const [fetchTrigger, setFetchTrigger] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetchProducts()
      .then((data) => {
        if (!cancelled) setState({ products: data, loading: false, error: null })
      })
      .catch(() => {
        if (!cancelled)
          setState((prev) => ({
            ...prev,
            loading: false,
            error: 'Não foi possível carregar os produtos. Tente novamente.',
          }))
      })

    return () => {
      cancelled = true
    }
  }, [fetchTrigger])

  // loadProducts is called from click handlers (e.g. "Tentar novamente"),
  const loadProducts = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    setFetchTrigger((n) => n + 1)
  }, [])

  const toggleStatus = useCallback(async (productId: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId
          ? { ...p, status: (p.status === 'ativo' ? 'inativo' : 'ativo') as ProductStatus }
          : p
      ),
    }))

    try {
      await toggleProductStatus(productId)
    } catch {
      setState((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === productId
            ? { ...p, status: (p.status === 'ativo' ? 'inativo' : 'ativo') as ProductStatus }
            : p
        ),
      }))
    }
  }, [])

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return state.products
    const q = searchQuery.toLowerCase()
    return state.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
    )
  }, [state.products, searchQuery])

  return {
    products: filteredProducts,
    allProducts: state.products,
    loading: state.loading,
    error: state.error,
    loadProducts,
    toggleStatus,
  }
}
