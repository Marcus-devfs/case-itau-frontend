'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Product, ProductStatus, ProductsState } from '@/types/product'
import { fetchProducts, toggleProductStatus } from '@/services/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const PRODUCTS_KEY = 'products' as const

export function useProducts(searchQuery: string = '') {

  const queryClient = useQueryClient()

  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: [PRODUCTS_KEY],
    queryFn: fetchProducts,
    staleTime: 60 * 1000, // 1 minuto
    retry: 2
  })


  const { mutate: toggleStatus } = useMutation({
    mutationFn: ((productId: string) => toggleProductStatus(productId)),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: [PRODUCTS_KEY] })

      const previousProducts = queryClient.getQueryData<Product[]>([PRODUCTS_KEY])

      queryClient.setQueryData<Product[]>([PRODUCTS_KEY], (old) =>
        old?.map((p) =>
          p.id === productId
            ? { ...p, status: (p.status === 'ativo' ? 'inativo' : 'ativo') as ProductStatus }
            : p
        ) || []
      )

      return { previousProducts }
    },

    onError: (_err, _productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData<Product[]>([PRODUCTS_KEY], context.previousProducts)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    }
  })

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const removeAccents = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const q = removeAccents(searchQuery)
    return products.filter(
      (p) =>
        removeAccents(p.name).includes(q) ||
        removeAccents(p.type).includes(q) ||
        removeAccents(p.status).includes(q)
    )
  }, [products, searchQuery])

  return {
    products: filteredProducts,
    allProducts: products,
    loading: isLoading,
    error: error ? 'Não foi possível carregar os produtos. Tente novamente.' : null,
    loadProducts: refetch,
    toggleStatus,
  }
}
