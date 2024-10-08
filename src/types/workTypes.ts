export interface Work {
    readonly personalWebsiteType: 'Jobs'
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