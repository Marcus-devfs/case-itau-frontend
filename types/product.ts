export type ProductStatus = 'ativo' | 'inativo'

export type ProductType =
  | 'Cartão'
  | 'Conta'
  | 'Crédito'
  | 'Investimento'
  | 'Seguro'

export interface Product {
  id: string
  name: string
  type: ProductType
  status: ProductStatus
  description: string
  interestRate?: number
  createdAt: string
}

export interface ProductsApiResponse {
  data: Product[]
  total: number
}

export interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}
