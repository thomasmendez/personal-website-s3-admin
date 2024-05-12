import { useSelector, useDispatch } from "react-redux"
import { getProjectsError, getProjectsStatus, selectAllProjects } from "../../store/projectsApiSlice"
import React, { useEffect } from "react"
import { getProjects } from "../../store/projectsApiSlice"
import { AppDispatch } from "../../store/store"
import { Project } from "../../types/projectTypes"

const projectsView = () => {
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
        content = <p>"Loading..."</p>;
    } else if (projectsStatus === 'succeeded') {
        if (projects && projects.length > 0) {
            content = <>
                <p>Success</p>
                {projects.map((projects: Project, index: number) => (
                  <React.Fragment key={index}>
                    <p>Category: {projects.Category}</p>
                    <p>Name: {projects.Name}</p>
                    <p>Description: {projects.Description}</p>
                    <p>Features Description: {projects.FeaturesDescription}</p>
                    <p>Role: {projects.Role}</p>
                    <ul>
                        {projects.Tasks.map((task: string, listIndex: number) => (
                            <li key={listIndex}>{task}</li>
                        ))}
                    </ul>
                    <p>Team Size: {projects?.TeamSize}</p>
                    <ul>
                        {projects.TeamRoles?.map((teamRoles: string, listIndex: number) => (
                            <li key={listIndex}>{teamRoles}</li>
                        ))}
                    </ul>
                    <ul>
                        {projects.CloudServices?.map((cloudService: string, listIndex: number) => (
                            <li key={listIndex}>{cloudService}</li>
                        ))}
                    </ul>
                    <ul>
                        {projects.Tools.map((tool: string, listIndex: number) => (
                            <li key={listIndex}>{tool}</li>
                        ))}
                    </ul>
                    <p>Duration: {projects.Duration}</p>
                    <p>StartDate: {projects.StartDate}</p>
                    <p>EndDate: {projects.EndDate}</p>
                    <p>Notes: {projects.Notes}</p>
                    <p>Link: {projects.Link}</p>
                    <p>Link Type: {projects.LinkType}</p>
                    <p>Media Link: {projects.MediaLink}</p>
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
            <h2>Projects</h2>
            {content}
        </section>
    )
}

export default projectsView