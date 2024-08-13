import { FC } from "react"
import Icon from "../Icon/Icon"

interface AboutProps {
  aboutMeDetails: string,
  educationDetails: string,
  educationStartDate: string,
  educationEndDate: string,
  degreeMinors: string,
}

const About: FC<AboutProps> = ({ aboutMeDetails, educationDetails, educationStartDate, educationEndDate, degreeMinors }) => {
  return(
    <section className="grid grid-cols-12 bg-neutral-100 dark:bg-neutral-900">
      <section className="sm:col-start-3 sm:col-span-7 col-span-12">
        <section className="p-4 col-span-12 space-y-2">
          <p className="text-left text-xl font-semibold">About Me</p>
          <p className="text-left">I am a passionate software engineer who loves to solve real world problems using new unexplored technologies. I enjoy developing good user experiences, wether it be for desktop, mobile, or video games. Always looking forward to working on the next big project.</p>
        </section>
        <section className="p-4 text-left col-span-12 space-y-2">
          <p className="text-left col-span-12 text-xl grid-cols-12 font-semibold">Education</p>
          <div className="col-span-12">
            <p className="text-left">
              Bachelor of Science in Arts and Entertainment Technologies, at The University of Texas at Austin
            </p>
            <p className="text-left">
              August 2016 - May 2019
            </p>
            <ul className="text-left list-disc list-inside">
              <li>
                Elements of Computing Certificate
              </li>
            </ul>
          </div>
        </section>
      </section>
      <section className="p-4 sm:col-span-2 col-span-12 space-y-2">
        <p className="text-left text-xl font-semibold">Contact</p>
        <Icon
          iconName="LinkedIn"
          href="https://www.linkedin.com/in/thomas-a-mendez"
          svgIcon={
            <svg viewBox="0 0 448 512">
              <path d="M100.28 448H7.4V149.68h92.88zM53.79 108.1C24.09 108.1 0 83.98 0 54.29A53.79 53.79 0 0153.79 0a53.79 53.79 0 0153.79 54.29c0 29.69-24.09 53.81-53.79 53.81zM447.9 448h-92.68V302.4c0-34.7-.68-79.25-48.3-79.25-48.32 0-55.7 37.76-55.7 76.8V448h-92.78V149.68h89.18v40.8h1.28c12.43-23.48 42.75-48.3 88-48.3 94.1 0 111.4 61.96 111.4 142.5V448z" />
            </svg>
          }
        />
        <Icon
          iconName="Github"
          href="https://github.com/thomasmendez"
          svgIcon={
            <svg viewBox="0 0 448 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          }
        />
        {/* Email icon */}
        <div className="flex">
          <button
            type="button"
            className="rounded text-xs leading-normal pr-2"
          >
            <a target="_blank" href="mailto:thomasmendez01@gmail.com">
              <svg className="h-6 w-6 text-gray-900 dark:text-gray-300"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
            </a>
          </button>
          <a target="_blank" href="mailto:thomasmendez01@gmail.com">
            <p>Email</p>
          </a>
        </div>
      </section>
    </section>
  )
}

export default About