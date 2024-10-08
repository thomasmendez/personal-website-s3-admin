import About from "../About/About"
import ProfilePic from "../../../src/assets/pic.jpeg";

const HomeView = () => {
  return (
    <main className="flex min-h-80vh text-center flex-col bg-neutral-100 dark:bg-neutral-900">
      <section className="bg-neutral-200 dark:bg-neutral-800">
        <section className="flex justify-center pt-6">
          <img className="rounded-full w-48 h-48" src={ProfilePic} alt="profile picture" />
        </section>
        <section className="pt-6 pb-6">
          <h1 className="text-2xl font-semibold text-zinc-400 dark:text-white">Thomas A. Mendez</h1>
          <h1 className="text-xl font-semibold text-zinc-500 dark:text-white">Software Engineer and Game Developer</h1>
        </section>
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