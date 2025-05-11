import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Home from './Home'
import mockProps from './Home.mock.ts'

describe('Home component', () => {
  beforeEach(() => {
    render(<Home {...mockProps} />)
  })
  
  it('renders name', () => {
    const name = screen.getByText(mockProps.name)
    expect(name).toBeInTheDocument()
  })

  it('renders job title', () => {
    const jobTitle = screen.getByText(mockProps.jobTitle)
    expect(jobTitle).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<Home {...mockProps} />)
    expect(container).toMatchSnapshot()
  })
})