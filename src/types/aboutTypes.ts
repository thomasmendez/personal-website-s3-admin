export interface About {
  aboutMeDetails: string;
  educationDetails: string;
  educationStartDate: string;
  educationEndDate: string;
  degreeMinors: string[];
  workExperience: any[];
  skills: any[];
  projects: any[];
  contactDetails: {
    email: string;
    phone: string;
    linkedIn: string;
    github: string;
    resume: string;
  };
}