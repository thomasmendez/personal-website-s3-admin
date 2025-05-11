import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('renders the Home component', () => {
    // arrange
    const name = 'John Doe'
    const jobTitle = 'Software Engineer'

    // act
    // render(<Home name={name} jobTitle={jobTitle}/>)
    
    // // assert
    // expect(screen.getByText(name)).toBeTruthy()
    // expect(screen.getByText(jobTitle)).toBeTruthy()
  })
})