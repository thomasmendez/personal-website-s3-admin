import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('renders the Home component', () => {
    render(<Home name='name' jobTitle='title'/>)
    
    screen.debug(); // prints out the jsx in the Home component unto the command line
  })
})