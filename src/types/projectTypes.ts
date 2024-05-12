export interface Project {
    PersonalWebsiteType: string    
	SortValue: string    
	Category: string    
	Name: string    
	Description: string    
	FeaturesDescription : string    
	Role: string    
	Tasks: string[]
	TeamSize: string | null
	TeamRoles: string[] | null
	CloudServices: string[] | null
	Tools: string[]
	Duration: string    
	StartDate: string    
	EndDate: string    
	Notes: string | null
	Link: string | null
	LinkType: string | null
	MediaLink: string | null
}