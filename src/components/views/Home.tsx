import { FC, useState } from "react"
import Header from "../Header/Header"

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
          <section className="p-12 bg-neutral-100 dark:bg-neutral-800">
            <h1>Image here</h1>
            <h1 className="text-xl font-semibold dark:text-white">{name}</h1>
            <h1 className="text-xl font-semibold text-zinc-500 dark:text-white">{jobTitle}</h1>
          </section>
          <section className="flex justify-center">
            <section className="p-4">
              <section>
                <h1 className="text-xl font-semibold dark:text-white">About Me</h1>
                <p>Details</p>
              </section>
              <section className="pt-4">
                <h1 className="text-xl font-semibold dark:text-white">Education</h1>
                <p>Education Info</p>
                <p>Date</p>
                <p>Cert</p>
              </section>
            </section>
            <section className="p-4">
              <h1 className="text-xl font-semibold dark:text-white">Contact</h1>
            </section>
          </section>
        </main>
        <footer className="flex justify-center">
          <section className="flex justify-start">
            <p>© 2024 Copyright</p>
          </section>
          <section className="flex justify-center">
            <p>Links to different versions</p>
          </section>
          <section className="justify-end">
            <p>contact info</p>
          </section>
        </footer>
      </div>
    </>
  )
}

export default HomeView