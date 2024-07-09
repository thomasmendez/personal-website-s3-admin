import { FC, useState } from "react"
import Header from "../header/Header"

interface HomeProps {
  name: string
  jobTitle: string
}

const HomeView: FC<HomeProps> = ({ name, jobTitle }) => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <Header/>
      <div className={`${darkMode && "dark"}`}>
        <main className="flex min-h-screen flex-col p-12 bg-neutral-100 dark:bg-neutral-900">
          <h1 className="text-xl font-semibold dark:text-white">{name}</h1>
          <h1>{jobTitle}</h1>
        </main>
        <button
          className="absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold"
          onClick={toggleDarkMode}
        >
          {darkMode ? "LHT" : "Dark"}
        </button>
      </div>
    </>
  )
}

export default HomeView