export interface Project {
    personalWebsiteType: string    
	sortValue: string    
	category: string    
	name: string    
	description: string    
	featuresDescription : string    
	role: string    
	tasks: string[]
	teamSize: string | null
	teamRoles: string[] | null
	cloudServices: string[] | null
	tools: string[]
	duration: string    
	startDate: string    
	endDate: string    
	notes: string | null
	link: string | null
	linkType: string | null
	mediaLink: string | null
}