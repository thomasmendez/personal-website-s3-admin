import { FC } from "react"

interface TitleHeader {
  title: string
}

const TitleHeader: FC<TitleHeader> = ({ title }) => {
  return(
    <section className="pt-8 pb-8 bg-neutral-200 dark:bg-neutral-800">
      <h1 className="text-3xl font-semibold text-center text-black dark:text-white">{title}</h1>
    </section>
  )
}

export default TitleHeader