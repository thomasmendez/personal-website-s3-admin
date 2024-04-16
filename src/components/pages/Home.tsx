import { FC, useEffect } from 'react'
import axios from 'axios'

interface HomeProps {
  name: string
  jobTitle: string
}

const App: FC<HomeProps> = ({ name, jobTitle }) => {
  useEffect(() => {
    const getHome = async () => {
        try {
            const { data } = await axios.get(
                'http://127.0.0.1:3000/api/v1/work',
            )
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    getHome()
  }, [])
  return (
    <>
      <h1>{name}</h1>
      <h1>{jobTitle}</h1>
    </>
  )
}

export default App