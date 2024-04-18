import { FC } from "react"

interface HomeProps {
  name: string
  jobTitle: string
}

const App: FC<HomeProps> = ({ name, jobTitle }) => {
  return (
    <>
      <h1>{name}</h1>
      <h1>{jobTitle}</h1>
    </>
  )
}

export default App