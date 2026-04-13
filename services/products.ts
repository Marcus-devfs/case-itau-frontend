import { Product, ProductsApiResponse } from '@/types/product'

const API_BASE = '/api/produtos'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_BASE, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error(`Erro ao buscar produtos: ${res.status}`)
  }

  const json: ProductsApiResponse = await res.json()
  return json.data
}

export async function toggleProductStatus(id: string): Promise<Product> {
  const res = await fetch(API_BASE, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  if (!res.ok) {
    throw new Error(`Erro ao atualizar produto: ${res.status}`)
  }

  const json: { data: Product } = await res.json()
  return json.data
}
