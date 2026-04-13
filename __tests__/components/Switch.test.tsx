import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from '@/components/ui/Switch'

describe('Switch', () => {
  it('renders with checked=false', () => {
    render(<Switch checked={false} onChange={() => {}} label="Status" />)

    const switchEl = screen.getByRole('switch', { name: /status/i })
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  })

  it('renders with checked=true', () => {
    render(<Switch checked={true} onChange={() => {}} label="Status" />)

    const switchEl = screen.getByRole('switch', { name: /status/i })
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn()
    render(<Switch checked={false} onChange={handleChange} label="Status" />)

    fireEvent.click(screen.getByRole('switch'))

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn()
    render(<Switch checked={false} onChange={handleChange} label="Status" disabled />)

    fireEvent.click(screen.getByRole('switch'))

    expect(handleChange).not.toHaveBeenCalled()
  })
})
