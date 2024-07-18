import { useSelector, useDispatch } from "react-redux"
import { getProjectsError, getProjectsStatus, selectAllProjects } from "../../store/projectsApiSlice"
import React, { useEffect } from "react"
import { getProjects } from "../../store/projectsApiSlice"
import { AppDispatch } from "../../store/store"
import { Project } from "../../types/projectTypes"
import Loading from "../Loading/Loading.jsx"

const ProjectsView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const projects = useSelector(selectAllProjects)
    const projectsStatus = useSelector(getProjectsStatus)
    const projectsError = useSelector(getProjectsError)
    
    useEffect(() => {
        if (projectsStatus === 'idle') {
            dispatch(getProjects())
        }
    }, [projectsStatus, dispatch])

    let content;
    if (projectsStatus === 'pending') {
        content = <Loading/>;
    } else if (projectsStatus === 'succeeded') {
        if (projects && projects.length > 0) {
            content = <>
                <p>Success</p>
                {projects.map((projects: Project, index: number) => (
                  <React.Fragment key={index}>
                    <p>Category: {projects.category}</p>
                    <p>Name: {projects.name}</p>
                    <p>Description: {projects.description}</p>
                    <p>Features Description: {projects.featuresDescription}</p>
                    <p>Role: {projects.role}</p>
                    <ul>
                        {projects.tasks.map((task: string, listIndex: number) => (
                            <li key={listIndex}>{task}</li>
                        ))}
                    </ul>
                    <p>Team Size: {projects?.teamSize}</p>
                    <p>Team Roles:</p>
                    <ul>
                        {projects.teamRoles?.map((teamRoles: string, listIndex: number) => (
                            <li key={listIndex}>{teamRoles}</li>
                        ))}
                    </ul>
                    <p>Cloud Services:</p>
                    <ul>
                        {projects.cloudServices?.map((cloudService: string, listIndex: number) => (
                            <li key={listIndex}>{cloudService}</li>
                        ))}
                    </ul>
                    <p>Tools:</p>
                    <ul>
                        {projects.tools.map((tool: string, listIndex: number) => (
                            <li key={listIndex}>{tool}</li>
                        ))}
                    </ul>
                    <p>Duration: {projects.duration}</p>
                    <p>StartDate: {projects.startDate}</p>
                    <p>EndDate: {projects.endDate}</p>
                    <p>Notes: {projects.notes}</p>
                    <p>Link: {projects.link}</p>
                    <p>Link Type: {projects.linkType}</p>
                    <p>Media Link: {projects.mediaLink}</p>
                    <br />
                  </React.Fragment>
                ))}
            </>
        }
    } else if (projectsStatus === 'failed') {
        content = <p>{projectsError}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default ProjectsView