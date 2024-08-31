import { useSelector, useDispatch } from "react-redux"
import { getProjectsError, getProjectsStatus, selectAllProjects } from "../../store/projectsApiSlice"
import React, { FC, useEffect, useState } from "react"
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

interface TopicList {
    isEditMode: boolean,
    topic: string,
    list: string[],
}

const TopicList: FC<TopicList> = ({ isEditMode, topic, list }) => {
    const inputName = topic.toLowerCase().replace(/ /g, '-')
    return(
        <div className="space-x-5">
            <p className="underline">{topic}:</p>
            <ul className="list-disc">
                {list.map((item: string, listIndex: number) => (
                    <li key={listIndex}>
                        {isEditMode ? (
                            <input
                                type="text"
                                name={`${inputName}-${listIndex}`}
                                id={`${inputName}-${listIndex}`}
                                defaultValue={item}
                                className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${item.length + 1}ch`}}
                            />
                        ) : (
                            item
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

interface TopicInline {
    isEditMode: boolean,
    topic: string,
    description: string,
}

const TopicInline: FC<TopicInline> = ({ isEditMode, topic, description }) => {
    const inputName = topic.toLowerCase().replace(/ /g, '-')
    return(
        <div className="flex space-x-1">
            <p className="underline">{topic}:</p>
            {isEditMode ? (
                <input
                    type="text"
                    name={inputName}
                    id={inputName}
                    defaultValue={description}
                    className="block w-auto rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${description.length + 1}ch`}}
                />
            ) : (
                <p>{description}</p>
            )}
        </div>
    )
}


const ProjectsView = () => {
    const [isEditMode, setIsEditMode] = useState(false)
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
                    <section key={index} className="grid grid-cols-12 p-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="sm:col-start-2 sm:col-span-3 md:col-start-3 md:col-span-3 col-span-12 space-y-3">
                            <div className="col-start-3 col-span-7">
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name={`project-name-${index}`}
                                        id={`project-name-${index}`}
                                        placeholder="Project Name"
                                        defaultValue={project.name}
                                        className="block font-bold rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1.125rem", lineHeight: "1.75rem"}}
                                    />
                                ) : (
                                    <p className="text-xl font-bold">{project.name}</p>
                                )}
                            </div>
                            <div>
                                <p className="underline">Project Description:</p>
                                {isEditMode ? (
                                    <input
                                        name={`project-description-${index}`}
                                        id={`project-description-${index}`}
                                        defaultValue={project.description}
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                    />
                                ) : (
                                    <p>{project.description}</p>
                                )}
                            </div>
                            <TopicInline isEditMode={isEditMode} topic="My Role" description={project.role} />
                            <TopicList isEditMode={isEditMode} topic="My Tasks" list={project.tasks} />
                            {project.teamSize !== null && (<TopicInline isEditMode={isEditMode} topic="Team Size" description={project.teamSize} />)}
                            {project?.teamRoles && (<TopicList isEditMode={isEditMode} topic="Team Roles" list={project.teamRoles} />)}
                            {project?.cloudServices && (<TopicList isEditMode={isEditMode} topic="Cloud Services" list={project.cloudServices} />)}
                            <TopicList isEditMode={isEditMode} topic="Tools" list={project.tools} />
                            <TopicInline isEditMode={isEditMode} topic="Project Duration" description={project.duration} />
                            <TopicInline isEditMode={isEditMode} topic="Project Date" description={`${project.startDate} - ${project.endDate}`} />
                            {isEditMode ? (
                                <input
                                    name={`project-notes-${index}`}
                                    id={`project-notes-${index}`}
                                    defaultValue={project.notes!}
                                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                />
                            ) : (
                                <div className="space-x-1">
                                    <p className="italic">*{project.notes}*</p>
                                </div>
                            )}
                        </div>
                        <div className="sm:col-span-7 md:col-span-6 col-span-12">
                            <div className="card bg-base-100 shadow-x1 dark:bg-neutral-800">
                              {project?.mediaLink && (<CardMedia projectName={project.name} mediaLink={project.mediaLink} />)}
                              <div className="card-body">
                                <p className="card-title">{project.name} Features</p>
                                {isEditMode ? (
                                    <input
                                        name={`features-description-${index}`}
                                        id={`features-description-${index}`}
                                        defaultValue={project.featuresDescription}
                                        className="pt-2 pb-6 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                    />
                                ) : (
                                    <p className="pt-2 pb-6">{project.featuresDescription}</p>
                                )}
                                <div className="card-actions">
                                    {project.link && (isEditMode ? (
                                        <div className="flex">
                                            <input
                                                name={`link-type-${index}`}
                                                id={`link-type-${index}`}
                                                defaultValue={project.linkType!}
                                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                            />
                                            <input
                                                name={`link-${index}`}
                                                id={`link-${index}`}
                                                defaultValue={project.link!}
                                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                            />
                                        </div>
                                    ) : (
                                        <a href={project.link}><button className="btn btn-neutral dark:bg-neutral-700">{project?.linkType}</button></a>
                                    ))}
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12">
                            {isEditMode ? (
                                <button className="after:content-['\01F441']" onClick={() => {setIsEditMode(false)}}></button>
                            ) : (
                                <button className="after:content-['\0270F']" onClick={() => {setIsEditMode(true)}}></button>
                            )}
                        </div>
                    </section>
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