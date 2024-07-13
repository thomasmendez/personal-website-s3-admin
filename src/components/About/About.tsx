import { FC, useState } from "react"

interface AboutProps {
  darkMode: boolean
  aboutMeDetails: string,
  educationDetails: string,
  educationStartDate: string,
  educationEndDate: string,
  degreeMinors: string,
}

const About: FC<AboutProps> = ({ darkMode, aboutMeDetails, educationDetails, educationStartDate, educationEndDate, degreeMinors }) => {
  return(
    <div className={`${darkMode && "dark"}`}>
      <section className="grid grid-cols-6 sm:gap-12 md:gap-22 bg-neutral-200 dark:bg-neutral-900">
        <section className="p-4 col-start-2 col-span-3">
          <section className="space-y-2">
            <p className="text-left text-xl font-semibold text-black dark:text-white">About Me</p>
            <p className="text-left text-black dark:text-white">I am a passionate software engineer who loves to solve real world problems using new unexplored technologies. I enjoy developing good user experiences, wether it be for desktop, mobile, or video games. Always looking forward to working on the next big project.</p>
          </section>
          <section className="pt-4 grid-cols-1 space-y-2">
            <p className="text-left text-xl font-semibold text-black dark:text-white">Education</p>
            <div className="grid sm:flex md:grid-cols-2">
              <p className="text-left text-black dark:text-white">Bachelor of Science in Arts and Entertainment Technologies, at The University of Texas at Austin</p>
              <p className="sm:text-left md:text-right text-black dark:text-white">August 2016 - May 2019</p>
            </div>
            <div>
              <ul className="text-left list-disc list-inside">
                <li className="text-black dark:text-white">
                  Elements of Computing Certificate
                </li>
              </ul>
            </div>
          </section>
        </section>
        <section className="p-4 col-span-1">
          <p className="text-left text-xl font-semibold dark:text-white">Contact</p>
        </section>
      </section>
    </div>
  )
}

export default About