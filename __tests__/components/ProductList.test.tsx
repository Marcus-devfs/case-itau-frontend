import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ProductList } from '@/components/products/ProductList'
import { Product } from '@/types/product'

const mockProducts: Product[] = [
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
]

describe('ProductList', () => {
  it('renders all products', () => {
    render(
      <ProductList products={mockProducts} onProductClick={() => {}} searchQuery="" />
    )

    expect(screen.getByText('Cartão Platinum')).toBeInTheDocument()
    expect(screen.getByText('CDB Digital')).toBeInTheDocument()
  })

  it('shows empty state when product list is empty with no search', () => {
    render(<ProductList products={[]} onProductClick={() => {}} searchQuery="" />)

    expect(screen.getByText(/nenhum produto encontrado/i)).toBeInTheDocument()
  })

  it('shows search-specific empty state when query yields no results', () => {
    render(<ProductList products={[]} onProductClick={() => {}} searchQuery="xyz" />)

    expect(screen.getByText(/xyz/)).toBeInTheDocument()
  })

  it('renders a list with correct role', () => {
    render(
      <ProductList products={mockProducts} onProductClick={() => {}} searchQuery="" />
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
