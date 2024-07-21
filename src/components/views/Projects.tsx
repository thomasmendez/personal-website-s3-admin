import { useSelector, useDispatch } from "react-redux"
import { getProjectsError, getProjectsStatus, selectAllProjects } from "../../store/projectsApiSlice"
import React, { useEffect } from "react"
import { getProjects } from "../../store/projectsApiSlice"
import { AppDispatch } from "../../store/store"
import { Project } from "../../types/projectTypes"
import Ankhor from "../../assets/ankhor.mp4";
import Loading from "../Loading/Loading"

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
        content = <Loading />;
    } else if (projectsStatus === 'succeeded') {
        if (projects && projects.length > 0) {
            content = <React.Fragment>
                {projects.map((projects: Project, index: number) => (
                  <React.Fragment key={index}>
                    <section className="grid grid-cols-12 pt-4 pb-4 bg-neutral-200 dark:bg-neutral-900">
                        <div className="col-start-3 col-span-3">
                            <div className="col-start-3 col-span-7">
                                <p className="text-xl font-bold">{projects.name}</p>
                            </div>
                            <div>
                                <p className="underline">Project Description:</p>
                                <p>{projects.description}</p>
                            </div>
                            <div className="flex space-x-1">
                                <p className="underline">MyRole:</p>
                                <p>{projects.role}</p>
                            </div>
                            <div className="space-x-5">
                                <p className="underline">My Tasks:</p>
                                <ul className="list-disc list-inside">
                                    {projects.tasks.map((task: string, listIndex: number) => (
                                        <li key={listIndex}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                            {projects.teamSize !== null && (
                                <div className="flex space-x-1">
                                    <p className="underline">Team Size:</p>
                                    <p>{projects.teamSize}</p>
                                </div>
                            )}
                            {projects.teamRoles !== null && (
                                <div className="space-x-5">
                                    <p className="underline">Team Roles:</p>
                                    <ul className="list-disc list-inside">
                                        {projects.teamRoles.map((task: string, listIndex: number) => (
                                            <li key={listIndex}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {projects.cloudServices !== null && (
                                <div className="space-x-5">
                                    <p className="underline">Cloud Services:</p>
                                    <ul className="list-disc list-inside">
                                        {projects.cloudServices.map((cloudService: string, listIndex: number) => (
                                            <li key={listIndex}>{cloudService}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="space-x-5">
                                <p className="underline">Tools:</p>
                                <ul className="list-disc list-inside">
                                    {projects.tools.map((cloudService: string, listIndex: number) => (
                                        <li key={listIndex}>{cloudService}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex space-x-1">
                                <p className="underline">Project Duration:</p>
                                <p>{projects.duration}</p>
                            </div>
                            <div className="flex space-x-1">
                                <p className="underline">Project Date:</p>
                                <p>{projects.startDate} - {projects.endDate}</p>
                            </div>
                            <div className="space-x-1">
                                <p className="italic">*{projects.notes}*</p>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="card bg-base-100 shadow-xl">
                              <figure>
                                <video controls>
                                    <source src={Ankhor} type="video/mp4"/>
                                    Your browser does not support the video tag
                                </video>
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                  <button className="btn btn-primary">Buy Now</button>
                                </div>
                              </div>
                            </div>
                        </div>
                        {/* <p>Category: {projects.category}</p>
                        <p>Duration: {projects.duration}</p>
                        <p>StartDate: {projects.startDate}</p>
                        <p>EndDate: {projects.endDate}</p>
                        <p>Notes: {projects.notes}</p>
                        <p>Link: {projects.link}</p>
                        <p>Link Type: {projects.linkType}</p>
                        <p>Media Link: {projects.mediaLink}</p> */}
                    </section>
                  </React.Fragment>
                ))}
            </React.Fragment>
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