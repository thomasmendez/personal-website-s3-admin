import { useSelector, useDispatch } from "react-redux"
import { getProjectsError, getProjectsStatus, selectAllProjects } from "../../store/projectsApiSlice"
import React, { FC, useEffect } from "react"
import { getProjects } from "../../store/projectsApiSlice"
import { AppDispatch } from "../../store/store"
import { Project } from "../../types/projectTypes"
import Loading from "../Loading/Loading"

interface CardMediaProps {
    projectName: string,
    mediaLink: string
}

const CardMedia: FC<CardMediaProps> = ({ projectName, mediaLink }) => {
    const mediaType = mediaLink.split('.').pop()
    switch(mediaType) {
        case 'mp4':
            return(
                <video controls>
                    <source src={mediaLink} type="video/mp4"/>
                    Your browser does not support the video tag
                </video>
            )
        case 'png' || 'jpeg':
            return(
                <img src={mediaLink} alt={`${projectName} Image`} />
            )
        default:
            console.error("Media has an invalid extension")
            return(
                <React.Fragment />
            )
    }
}

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
                {projects.map((project: Project, index: number) => (
                  <React.Fragment key={index}>
                    <section className="grid grid-cols-12 pt-4 pb-4 bg-neutral-200 dark:bg-neutral-900">
                        <div className="col-start-3 col-span-3">
                            <div className="col-start-3 col-span-7">
                                <p className="text-xl font-bold">{project.name}</p>
                            </div>
                            <div>
                                <p className="underline">Project Description:</p>
                                <p>{project.description}</p>
                            </div>
                            <div className="flex space-x-1">
                                <p className="underline">MyRole:</p>
                                <p>{project.role}</p>
                            </div>
                            <div className="space-x-5">
                                <p className="underline">My Tasks:</p>
                                <ul className="list-disc list-inside">
                                    {project.tasks.map((task: string, listIndex: number) => (
                                        <li key={listIndex}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                            {project.teamSize !== null && (
                                <div className="flex space-x-1">
                                    <p className="underline">Team Size:</p>
                                    <p>{project.teamSize}</p>
                                </div>
                            )}
                            {project.teamRoles !== null && (
                                <div className="space-x-5">
                                    <p className="underline">Team Roles:</p>
                                    <ul className="list-disc list-inside">
                                        {project.teamRoles.map((task: string, listIndex: number) => (
                                            <li key={listIndex}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.cloudServices !== null && (
                                <div className="space-x-5">
                                    <p className="underline">Cloud Services:</p>
                                    <ul className="list-disc list-inside">
                                        {project.cloudServices.map((cloudService: string, listIndex: number) => (
                                            <li key={listIndex}>{cloudService}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="space-x-5">
                                <p className="underline">Tools:</p>
                                <ul className="list-disc list-inside">
                                    {project.tools.map((cloudService: string, listIndex: number) => (
                                        <li key={listIndex}>{cloudService}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex space-x-1">
                                <p className="underline">Project Duration:</p>
                                <p>{project.duration}</p>
                            </div>
                            <div className="flex space-x-1">
                                <p className="underline">Project Date:</p>
                                <p>{project.startDate} - {project.endDate}</p>
                            </div>
                            <div className="space-x-1">
                                <p className="italic">*{project.notes}*</p>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="card bg-base-100 shadow-x1 dark:bg-neutral-800">
                              {/* {(project?.mediaLink) && (
                                <figure>
                                  {getMediaLinkSourceType(project.mediaLink!) === 'video/mp4' ? (
                                    <video controls>
                                      <source src={project.mediaLink!} type="video/mp4"/>
                                      Your browser does not support the video tag
                                    </video>
                                  ) : (
                                    <img src={project.mediaLink!} alt={`${project.name} Image`} />
                                  )}
                                </figure>
                              )} */}
                              { project?.mediaLink && (<CardMedia projectName={project.name} mediaLink={project.mediaLink} />)}
                              <div className="card-body">
                                <p className="card-title">{project.name} Features</p>
                                <p className="pt-2 pb-6">{project.featuresDescription}</p>
                                <div className="card-actions">
                                  {project.link && (<a href="https://youtube.com"><button className="btn btn-neutral dark:bg-neutral-700">{project?.linkType}</button></a>)}
                                </div>
                              </div>
                            </div>
                        </div>
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