export interface About {
  aboutMeDetails: string;
  educationDetails: string;
  educationStartDate: string;
  educationEndDate: string;
  degreeMinors: string[];
  workExperience: unknown[];
  skills: unknown[];
  projects: unknown[];
  contactDetails: {
    email: string;
    phone: string;
    linkedIn: string;
    github: string;
    resume: string;
  };
}
