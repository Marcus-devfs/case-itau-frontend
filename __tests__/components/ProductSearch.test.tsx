import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductSearch } from '@/components/products/ProductSearch'

describe('ProductSearch', () => {
  it('renders the search input with correct placeholder', () => {
    render(<ProductSearch value="" onChange={() => {}} />)

    const input = screen.getByRole('searchbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', expect.stringContaining('Buscar'))
  })

  it('calls onChange when user types', () => {
    const handleChange = jest.fn()
    render(<ProductSearch value="" onChange={handleChange} />)

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'cartão' } })

    expect(handleChange).toHaveBeenCalledWith('cartão')
  })

  it('shows result count when value is provided', () => {
    render(<ProductSearch value="cartão" onChange={() => {}} resultCount={3} />)

    expect(screen.getByRole('status')).toHaveTextContent('3 produtos encontrados')
  })

  it('shows "nenhum produto encontrado" when result count is 0', () => {
    render(<ProductSearch value="xyz" onChange={() => {}} resultCount={0} />)

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum produto encontrado')
  })

  it('does not show result count when no value is entered', () => {
    render(<ProductSearch value="" onChange={() => {}} resultCount={10} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows clear button when value is not empty', () => {
    render(<ProductSearch value="cartão" onChange={() => {}} />)

    expect(screen.getByRole('button', { name: /limpar/i })).toBeInTheDocument()
  })

  it('calls onChange with empty string when clear button is clicked', () => {
    const handleChange = jest.fn()
    render(<ProductSearch value="cartão" onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: /limpar/i }))

    expect(handleChange).toHaveBeenCalledWith('')
  })
})
