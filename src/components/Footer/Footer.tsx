import { FC } from "react"
import { Websites } from "../../types/websiteTypes"

interface FooterProps {
  websites: Websites[]
}

const Footer: FC<FooterProps> = ({ websites }) => {
  return(
    <footer className="grid grid-cols-6 pt-6 pb-6 items-center border-t-[1px] border-gray-500 dark:bg-zinc-800">
      <section className="col-start-2 col-span-1 text-center">
        <p className="dark:text-white">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            Copyright
        </p>
      </section>
      <section className="flex justify-center col-span-2 text-center">
        <ul className="space-y-2">
          {websites.map((item, index) => (
            <li key={index} className="dark:text-white">
                {item.text}
            </li>
          ))}
        </ul>
      </section>
      <section className="justify-end dark:text-white text-center">
        <p>contact info</p>
      </section>
    </footer>
  )
}

export default Footer