import { FC } from "react"
import DarkModeToggle from "./DarkModeToggle"

interface NavItem {
  title: string,
  link: string,
}

const NavItem: FC<NavItem> = ({ title, link }) => {
  return(
    <a href={link} className="btn btn-ghost text-gray-300 dark:text-gray-400">{title}</a>
  )
}

const Header = () => {
  return(
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="text-neutral-content p-4 flex justify-between items-center bg-zinc-500 dark:bg-zinc-800">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl normal-case text-gray-300 dark:text-gray-400">
              <a href="/">Thomas A. Mendez</a>
            </div>
            <div className="space-x-4 items-center hidden lg:flex">
              <NavItem title="About" link="/about"/>
              <NavItem title="Work" link="/work"/>
              <NavItem title="Skills & Tools" link="skills-tools"/>
              <details className="relative group">
                <summary className="btn btn-ghost text-gray-300 dark:text-gray-400">Projects</summary>
                <ul className="text-zinc-500 dark:text-zinc-300 absolute hidden space-y-2 group-hover:block shadow-lg p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900">
                  <li><a href="/software-engineering" className="btn btn-ghost text-gray-400">Software Engineering</a></li>
                  <li><a href="/vr-ar" className="btn btn-ghost text-gray-400">VR / AR</a></li>
                </ul>
              </details>
              <NavItem title="Resume" link="/resume"/>
              <NavItem title="Storybook" link="/storybook"/>
              <DarkModeToggle />
            </div>
            <div className="flex space-x-3 lg:hidden">
              <DarkModeToggle />
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer" className="drawer-overlay w-screen"></label>
        <ul className="menu p-4 w-80 bg-base-100 dark:bg-zinc-800 text-base-content">
          <li><a href="/about" className="btn btn-ghost text-gray-400 dark:text-gray-400">About</a></li>
          <li><a href="/work" className="btn btn-ghost text-gray-400 dark:text-gray-400">Work</a></li>
          <li><a href="/skills-tools" className="btn btn-ghost text-gray-400 dark:text-gray-400">Skills & Tools</a></li>
          <li><details className="relative group">
            <summary className="btn btn-ghost text-gray-400 dark:text-gray-400">Projects</summary>
            <ul className="text-zinc-500 dark:text-zinc-300 space-y-2 shadow-lg p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <li><a href="/software-engineering" className="btn btn-ghost text-gray-400">Software Engineering</a></li>
              <li><a href="/vr-ar" className="btn btn-ghost text-gray-400">VR / AR</a></li>
            </ul>
          </details></li>
          <li><a href="/resume" className="btn btn-ghost text-gray-400 dark:text-gray-400">Resume</a></li>
          <li><a href="/storybook" className="btn btn-ghost text-gray-400 dark:text-gray-400">Storybook</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Header