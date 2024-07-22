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

interface TopicList {
    topic: string,
    list: string[],
}

const TopicList: FC<TopicList> = ({ topic, list }) => {
    return(
        <div className="space-x-5">
            <p className="underline">{topic}:</p>
            <ul className="list-disc list-inside">
                {list.map((item: string, listIndex: number) => (
                    <li key={listIndex}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

interface TopicInline {
    topic: string,
    description: string,
}

const TopicInline: FC<TopicInline> = ({ topic, description }) => {
    return(
        <div className="flex space-x-1">
            <p className="underline">{topic}:</p>
            <p>{description}</p>
        </div>
    )
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
                    <section className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="col-start-3 col-span-3 space-y-3">
                            <div className="col-start-3 col-span-7">
                                <p className="text-xl font-bold">{project.name}</p>
                            </div>
                            <div>
                                <p className="underline">Project Description:</p>
                                <p>{project.description}</p>
                            </div>
                            <TopicInline topic="My Role" description={project.role} />
                            <TopicList topic="My Tasks" list={project.tasks} />
                            {project.teamSize !== null && (<TopicInline topic="Team Size" description={project.teamSize} />)}
                            {project?.teamRoles && (<TopicList topic="Team Roles" list={project.teamRoles} />)}
                            {project?.cloudServices && (<TopicList topic="Cloud Services" list={project.cloudServices} />)}
                            <TopicList topic="Tools" list={project.tools} />
                            <TopicInline topic="Project Duration" description={project.duration} />
                            <TopicInline topic="Project Date" description={`${project.startDate} - ${project.endDate}`} />
                            <div className="space-x-1">
                                <p className="italic">*{project.notes}*</p>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="card bg-base-100 shadow-x1 dark:bg-neutral-800">
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