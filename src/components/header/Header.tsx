import { FC } from "react"
import LightDarkToggle from "./LightDarkToggle"

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header: FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return(
    <div className={`${darkMode && "dark"}`}>
      <div className="text-neutral-content p-4 flex justify-between items-center bg-zinc-500 dark:bg-zinc-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl normal-case text-gray-300 dark:text-gray-400">Thomas A. Mendez</div>
          <div className="space-x-4 flex items-center">
            <a href="/about" className="btn btn-ghost text-gray-300 dark:text-gray-400">About</a>
            <a href="/work" className="btn btn-ghost text-gray-300 dark:text-gray-400">Work</a>
            <a href="/skills-tools" className="btn btn-ghost text-gray-300 dark:text-gray-400">Skills & Tools</a>
            <details className="relative group">
              <summary className="btn btn-ghost text-gray-300 dark:text-gray-400">Projects</summary>
              <ul className="text-zinc-500 dark:text-zinc-300 absolute hidden space-y-2 group-hover:block shadow-lg p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900">
                <li><a href="/software-engineering" className="btn btn-ghost text-gray-300 dark:text-gray-400">Software Engineering</a></li>
                <li><a href="/vr-ar" className="btn btn-ghost text-gray-300 dark:text-gray-400">VR / AR</a></li>
              </ul>
            </details>
            <a href="/resume" className="btn btn-ghost text-gray-300 dark:text-gray-400">Resume</a>
            <a href="/storybook" className="btn btn-ghost text-gray-300 dark:text-gray-400">Storybook</a>
            <LightDarkToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header