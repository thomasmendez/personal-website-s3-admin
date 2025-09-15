import { Project } from "../../types/projectTypes"

const ProjectsMock: Project[] = [
  {
    personalWebsiteType: "Projects",
    sortValue: "Open-LMS-Blended",
    category: "Software Engineering",
    name: "Open-LMS-Blended",
    description: "An open source learning management system intended for K-12 educational institutions.",
    featuresDescription: "A user is able to create an account, create a course, and upload/manage their syllabus, assignments, class schedule, and lectures. They can also manage their account such as their email, semester, password, or delete their account. Any viewer can view any created courses along with uploaded files.",
    role: "Software Engineer",
    tasks: [
      "Developed an open source LMS intended for K-12 educational institutions using the MERN stack",
      "Experienced the entire development lifecycle, deployed, and documented the entire application for both Digital Ocean and AWS",
    ],
    teamSize: "1",
    teamRoles: null,
    cloudServices: [
      "AWS",
      "Digital Ocean"
    ],
    tools: [
      'MongoDB',
      'Express',
      'React',
      'Node.js',
    ],
    duration: "3 Months",
    startDate: "March 2020",
    endDate: "May 2020",
    notes: "This site is no longer avaliable as of May 2021. The site was only intended to be avaliable for a year for demo purposes.",
    link: "https://github.com/thomasmendez/open-lms-blended",
    linkType: "GitHub",
    mediaLink: "http://link-to-media-file"
  },
  // {
  //   personalWebsiteType: "Projects",
  //   sortValue: "Project Title",
  //   category: "Software Engineering",
  //   name: "Social Media Site",
  //   description: "A social media site",
  //   featuresDescription: "A user is able to communicate with other users",
  //   role: "Project Lead",
  //   tasks: [
  //     "Develop backend",
  //     "Develop frontend"
  //   ],
  //   teamSize: "1",
  //   teamRoles: [
  //     "Backend Developer",
  //     "Frontend Developer"
  //   ],
  //   cloudServices: [
  //     "AWS",
  //     "Azure",
  //     "GCP"
  //   ],
  //   tools: [
  //     "Go",
  //     "React"
  //   ],
  //   duration: "6 Months",
  //   startDate: "Jan 2024",
  //   endDate: "Dec 2024",
  //   notes: "Site is still in development stages",
  //   link: "http://my-url",
  //   linkType: "Youtube",
  //   mediaLink: "http://link-to-media-file"
  // }
]

export default ProjectsMock