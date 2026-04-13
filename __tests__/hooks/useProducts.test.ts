import { renderHook, act, waitFor } from '@testing-library/react'
import { useProducts } from '@/hooks/useProducts'
import * as productService from '@/services/products'
import { Product } from '@/types/product'

jest.mock('@/services/products')

const mockProductsData: Product[] = [
  {
    id: '1',
    name: 'Cartão Platinum',
    type: 'Cartão',
    status: 'ativo',
    description: 'Cartão de crédito.',
    createdAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'CDB Digital',
    type: 'Investimento',
    status: 'inativo',
    description: 'Certificado de depósito.',
    createdAt: '2021-06-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Seguro de Vida',
    type: 'Seguro',
    status: 'ativo',
    description: 'Seguro de vida.',
    createdAt: '2023-01-01T00:00:00Z',
  },
]

const mockedFetch = productService.fetchProducts as jest.MockedFunction<typeof productService.fetchProducts>
const mockedToggle = productService.toggleProductStatus as jest.MockedFunction<typeof productService.toggleProductStatus>

beforeEach(() => {
  jest.clearAllMocks()
  mockedFetch.mockResolvedValue(mockProductsData)
  mockedToggle.mockResolvedValue({ ...mockProductsData[0], status: 'inativo' })
})

describe('useProducts', () => {
  it('starts with loading=true and empty products', () => {
    const { result } = renderHook(() => useProducts())
    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])
  })

  it('loads products and sets loading=false', async () => {
    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toHaveLength(3)
    expect(result.current.error).toBeNull()
  })

  it('sets error when fetchProducts throws', async () => {
    mockedFetch.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBeTruthy()
    expect(result.current.products).toHaveLength(0)
  })

  it('filters products by name using useMemo', async () => {
    const { result } = renderHook(() => useProducts('cartão'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toHaveLength(1)
    expect(result.current.products[0].name).toBe('Cartão Platinum')
  })

  it('filters products by type', async () => {
    const { result } = renderHook(() => useProducts('investimento'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toHaveLength(1)
    expect(result.current.products[0].id).toBe('2')
  })

  it('returns all products when search query is empty', async () => {
    const { result } = renderHook(() => useProducts(''))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toHaveLength(3)
  })

  it('applies optimistic update when toggling status', async () => {
    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.toggleStatus('1')
    })

    // Optimistic: status flips immediately
    const updated = result.current.allProducts.find((p) => p.id === '1')
    expect(updated?.status).toBe('inativo')
  })
})
