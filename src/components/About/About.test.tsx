import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import About from './About'
import mockProps from './About.mock.ts'

describe('About Component', () => {
  beforeEach(() => {
    render(<About {...mockProps} />)
  })

  it('renders the About section with correct heading', () => {
    const aboutHeading = screen.getByText('About Me')
    expect(aboutHeading).toBeInTheDocument()
  })

  it('renders the Education section with correct heading', () => {
    const educationHeading = screen.getByText('Education')
    expect(educationHeading).toBeInTheDocument()
  })

  it('renders the Contact section with correct heading', () => {
    const contactHeading = screen.getByText('Contact')
    expect(contactHeading).toBeInTheDocument()
  })

  it('renders LinkedIn icon with correct href', () => {
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/thomas-a-mendez')
  })

  it('renders GitHub icon with correct href', () => {
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/thomasmendez')
  })

  it('renders email link with correct href', () => {
    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:thomasmendez01@gmail.com')
  })

  it('matches snapshot', () => {
    const { container } = render(<About {...mockProps} />)
    expect(container).toMatchSnapshot()
  })
})
