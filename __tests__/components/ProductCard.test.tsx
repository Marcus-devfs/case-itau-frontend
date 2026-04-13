import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/products/ProductCard'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: '1',
  name: 'Cartão Personnalité Visa Infinite',
  type: 'Cartão',
  status: 'ativo',
  description: 'Cartão de crédito premium.',
  interestRate: 12.9,
  createdAt: '2022-03-15T10:00:00Z',
}

describe('ProductCard', () => {
  it('renders product name, type and status correctly', () => {
    render(<ProductCard product={mockProduct} onClick={() => {}} />)

    expect(screen.getByText('Cartão Personnalité Visa Infinite')).toBeInTheDocument()
    expect(screen.getByText('Cartão')).toBeInTheDocument()
    expect(screen.getByText('Ativo')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<ProductCard product={mockProduct} onClick={handleClick} />)

    fireEvent.click(screen.getByRole('button', { name: /ver detalhes/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders inactive badge for inactive products', () => {
    const inactiveProduct: Product = { ...mockProduct, status: 'inativo' }
    render(<ProductCard product={inactiveProduct} onClick={() => {}} />)

    expect(screen.getByText('Inativo')).toBeInTheDocument()
  })

  it('is keyboard accessible with correct aria-label', () => {
    render(<ProductCard product={mockProduct} onClick={() => {}} />)

    const button = screen.getByRole('button', { name: /ver detalhes de Cartão Personnalité Visa Infinite/i })
    expect(button).toBeInTheDocument()
  })
})
