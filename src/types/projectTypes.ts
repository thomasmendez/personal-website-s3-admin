import { ProjectComponent } from "../store/projectsApiSlice"

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

export function projectToFormData(project: ProjectComponent): FormData {
	const { mediaPreview, ...projectData } = project
	
    const formData = new FormData()
    
    // Handle each property based on its type
    Object.entries(projectData).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            // Skip null/undefined values or append empty string if needed
            formData.append(key, '') // Uncomment if you want to include null as empty string
            return
        }
        
        if (Array.isArray(value)) {
            // Handle arrays - you have several options:
            
            // Option 1: JSON stringify the array
            formData.append(key, JSON.stringify(value))
            
            // Option 2: Append each item with indexed keys (uncomment to use)
            // value.forEach((item, index) => {
            //     formData.append(`${key}[${index}]`, item)
            // })
            
            // Option 3: Append each item with the same key (uncomment to use)
            // value.forEach(item => {
            //     formData.append(key, item)
            // })
        } else {
            // Handle strings and other primitive values
			if (key === 'image') {
				formData.append(key, value)
			} else {
				formData.append(key, String(value))
			}
        }
    })
	    
    return formData
}
