import { FC } from "react"
import About from "../About/About"
import ProfilePic from "../../../src/assets/pic.jpeg";

interface HomeProps {
  name: string
  jobTitle: string
}

const HomeView: FC<HomeProps> = ({ name, jobTitle }) => {
  return (
    <main className="flex min-h-80vh text-center flex-col bg-neutral-200 dark:bg-neutral-900">
      <section className="flex justify-center pt-12 bg-neutral-200 dark:bg-neutral-800">
        <img className="rounded-full w-48 h-48" src={ProfilePic} alt="profile picture" />
      </section>
      <section className="pt-6 pb-6 bg-neutral-200 dark:bg-neutral-800">
        <h1 className="text-xl font-semibold text-zinc-400 dark:text-white">{name}</h1>
        <h1 className="text-xl font-semibold text-zinc-500 dark:text-white">{jobTitle}</h1>
      </section>
      <section className="flex justify-center">
        <About
          aboutMeDetails="details"
          educationDetails="details"
          educationStartDate="start date"
          educationEndDate="end date"
          degreeMinors="minor"
        />
      </section>
    </main>
  )
}

export default HomeView