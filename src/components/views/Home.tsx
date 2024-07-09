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
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <div className={`${darkMode && "dark"}`}>
        <main className="flex min-h-screen text-center flex-col p-12 bg-neutral-100 dark:bg-neutral-900">
          <h1>Image here</h1>
          <h1 className="text-xl font-semibold dark:text-white">{name}</h1>
          <h1 className="text-xl font-semibold dark:text-white">{jobTitle}</h1>
        </main>
        <section>
          <h1>About Me</h1>
          <p>Details</p>
        </section>
        <section>
          <h1>Education</h1>
          <p>Education Info</p>
          <p>Date</p>
          <p>Cert</p>
        </section>
        <section>
          <h1>Contact</h1>
        </section>
        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </>
  )
}

export default HomeView