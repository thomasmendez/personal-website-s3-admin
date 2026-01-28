export interface Work {
    readonly personalWebsiteType: 'Work'
    readonly sortValue: string
    jobTitle: string
    company: string
    location: {
        city: string
        state: string
    }
    startDate: string
    endDate: string
    jobRole: string
    jobDescription: string[]
}