import { useSelector, useDispatch } from "react-redux"
import { getProjectsError, getProjectsStatus, selectAllProjects,
    getProjectsMode, projectsModeChange,
    getProjects, postProjects, putProjects, deleteProjects,
    projectsAdd, projectsDelete,
    projectsValueChange, projectsDescriptionChange,
    projectsRoleChange,
    projectsTasksListChange,
    projectsTeamSizeChange,
    projectsTeamRolesListChange,
    projectsCloudServicesListChange,
    projectsToolsListChange,
    projectsDurationChange,
    projectsStartDateChange,
    projectsEndDateChange,
    projectsNotesChange,
} from "../../store/projectsApiSlice"
import React, { ChangeEvent, FC, useEffect } from "react"
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
            console.groupCollapsed(`%c Media for "${projectName}" has an invalid extension`, 'font-weight: bold; color: yellow');
            console.warn(new Error().stack);
            console.groupEnd();
            return(
                <React.Fragment />
            )
    }
}

interface TopicList {
    isEditMode: boolean,
    topic: string,
    list: string[],
    onChange: (listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const TopicList: FC<TopicList> = ({ isEditMode, topic, list, onChange }) => {
    const inputName = topic.toLowerCase().replace(/ /g, '-')
    // TODO: If lenght is big enough switch to use text box or use two at least 
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
                                className="block w-full max-w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${item.length + 1}ch`}}
                                onChange={onChange(listIndex)}
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopicInline: FC<TopicInline> = ({ isEditMode, topic, description, onChange }) => {
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
                    className="block w-auto rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${description.length + 1}ch`}}
                    onChange={onChange}
                />
            ) : (
                <p>{description}</p>
            )}
        </div>
    )
}


const ProjectsView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const projects = useSelector(selectAllProjects)
    const projectsStatus = useSelector(getProjectsStatus)
    const projectsError = useSelector(getProjectsError)

    const mode = useSelector(getProjectsMode)

    const handleProjectsAdd = (index: number) => (event: MouseEvent<HTMLButtonElement>) => {
      dispatch(projectsAdd({index}))
    }

    const handleProjectsDelete = (index: number) => (event: MouseEvent<HTMLButtonElement>) => {
      dispatch(projectsDelete({index}))
      dispatch(deleteProjects(projects[index]))
    }

    const handleProjectsValueChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsValueChange({index, value: newValue}))
    }

    const handleProjectsDescriptionChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsDescriptionChange({index, value: newValue}))
    }

    const handleProjectsRoleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsRoleChange({index, value: newValue}))
    }

    const handleProjectsTeamSizeChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsTeamSizeChange({index, value: newValue}))
    }

    const handleProjectsTeamRolesListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsTeamRolesListChange({index, listIndex, value: newValue}))
    }

    const handleProjectsTasksListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsTasksListChange({index, listIndex, value: newValue}))
    }

    const handleProjectsCloudServicesListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsCloudServicesListChange({index, listIndex, value: newValue}))
    }

    const handleProjectsToolsListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        dispatch(projectsToolsListChange({index, listIndex, value: newValue}))
      }

    const handleProjectsDurationChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsDurationChange({index, value: newValue}))
    }

    const handleProjectsStartDateChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsStartDateChange({index, value: newValue}))
    }

    const handleProjectsEndDateChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsEndDateChange({index, value: newValue}))
    }

    const handleProjectsNotesChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsNotesChange({index, value: newValue}))
    }

    useEffect(() => {
        for (let i = 0; i < mode.length; i++) {
            if (mode[i] === 'editDone') {
                dispatch(putProjects(projects[i]))
                dispatch(projectsModeChange({index: i, mode: 'updated'}))
            }
            if (mode[i] === 'newItemDone') {
                dispatch(postProjects(projects[i]))
                dispatch(projectsModeChange({index: i, mode: 'created'}))
            }
        }
    }, [mode, projects, dispatch])
    
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
                                {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                    <input
                                        type="text"
                                        name={`project-name-${index}`}
                                        id={`project-name-${index}`}
                                        placeholder="Project Name"
                                        defaultValue={project.sortValue}
                                        className="block font-bold rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1.125rem", lineHeight: "1.75rem"}}
                                        onChange={handleProjectsValueChange(index)}
                                    />
                                ) : (
                                    <p className="text-xl font-bold">{project.name}</p>
                                )}
                            </div>
                            <div>
                                <p className="underline">Project Description:</p>
                                {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                    <input
                                        name={`project-description-${index}`}
                                        id={`project-description-${index}`}
                                        defaultValue={project.description}
                                        className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                        onChange={handleProjectsDescriptionChange(index)}
                                    />
                                ) : (
                                    <p>{project.description}</p>
                                )}
                            </div>
                            <TopicInline
                                isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                topic="My Role" description={project.role}
                                onChange={handleProjectsRoleChange(index)}
                            />
                            <TopicList
                                isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                topic="My Tasks" list={project.tasks}
                                onChange={(listIndex) => (e) => handleProjectsTasksListChange(index, listIndex)(e)}
                            />
                            {project.teamSize !== null && (<TopicInline
                                isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                topic="Team Size" description={project.teamSize}
                                onChange={handleProjectsTeamSizeChange(index)}
                            />)}
                            {project?.teamRoles && project.teamRoles.length > 0 && (
                                <TopicList
                                    isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                    topic="Team Roles" list={project.teamRoles}
                                    onChange={(listIndex) => (e) => handleProjectsTeamRolesListChange(index, listIndex)(e)}
                                />
                            )}
                            {project?.cloudServices && project.cloudServices.length > 0 && (
                                <TopicList
                                    isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                    topic="Cloud Services" list={project.cloudServices}
                                    onChange={(listIndex) => (e) => handleProjectsCloudServicesListChange(index, listIndex)(e)}
                                />
                            )}
                            {project?.tools && project.tools.length > 0 && (
                                <TopicList
                                    isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                    topic="Tools" list={project.tools}
                                    onChange={(listIndex) => (e) => handleProjectsToolsListChange(index, listIndex)(e)}
                                />
                            )}
                            <TopicInline
                                isEditMode={mode[index] === 'edit' || mode[index] === 'newItem'}
                                topic="Project Duration" description={project.duration}
                                onChange={handleProjectsDurationChange(index)}
                            />
                            <div className="flex space-x-1">
                                <p className="underline">Project Date:</p>
                                {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                    <section className="flex space-x-1">
                                        <input
                                            type="text"
                                            name={`startDate-${index}`}
                                            id={`startDate-${index}`}
                                            defaultValue={project.startDate}
                                            className="block w-auto rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${project.startDate.length + 1}ch`}}
                                            onChange={handleProjectsStartDateChange(index)}
                                        />
                                        <p>-</p>
                                        <input
                                            type="text"
                                            name={`endDate-${index}`}
                                            id={`endDate-${index}`}
                                            defaultValue={project.endDate}
                                            className="block w-auto rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${project.endDate.length + 1}ch`}}
                                            onChange={handleProjectsEndDateChange(index)}
                                        />
                                    </section>
                                ) : (
                                    <p>{project.startDate} - {project.endDate}</p>
                                )}
                            </div>
                            {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                <input
                                    name={`project-notes-${index}`}
                                    id={`project-notes-${index}`}
                                    defaultValue={project.notes!}
                                    className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                    onChange={handleProjectsNotesChange(index)}
                                />
                            ) : (
                                <div className="space-x-1">
                                    <p className="italic">*{project.notes}*</p>
                                </div>
                            )}
                        </div>
                        <div className="sm:col-span-7 md:col-span-6 col-span-12">
                            <div className="card bg-gray-300 shadow-x1 dark:bg-neutral-800">
                              {project?.mediaLink && (<CardMedia projectName={project.name} mediaLink={project.mediaLink} />)}
                              <div className="card-body">
                                <p className="card-title">{project.name} Features</p>
                                {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                    <input
                                        name={`features-description-${index}`}
                                        id={`features-description-${index}`}
                                        defaultValue={project.featuresDescription}
                                        className="pt-2 pb-6 block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                    />
                                ) : (
                                    <p className="pt-2 pb-6">{project.featuresDescription}</p>
                                )}
                                <div className="card-actions">
                                    {project.link && (mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                        <div className="flex">
                                            <input
                                                name={`link-type-${index}`}
                                                id={`link-type-${index}`}
                                                defaultValue={project.linkType!}
                                                className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                            />
                                            <input
                                                name={`link-${index}`}
                                                id={`link-${index}`}
                                                defaultValue={project.link!}
                                                className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12 space-x-1">
                            {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                <button className="after:content-['\01F441']" onClick={() => {
                                    if (mode[index] === 'newItem') {
                                        dispatch(projectsModeChange({index, mode: 'newItemDone'}))
                                    } else if (mode[index] === 'edit') {
                                        dispatch(projectsModeChange({index, mode: 'editDone'}))
                                    } else {
                                        dispatch(projectsModeChange({index, mode: "view"}))
                                    }
                                }}></button>
                            ) : (
                                <button className="after:content-['\0270F']" onClick={() => {
                                    dispatch(projectsModeChange({index, mode: 'edit'}))
                                }}></button>
                            )}
                            {/* https://emojipedia.org/ */}
                            <button
                                className="bg-blue-200 hover:bg-blue-300 dark:bg-gray-500 dark-hover:bg-gray-700 px-1"
                                onClick={() => dispatch(handleProjectsAdd(index+1))}
                            >
                              +
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-300 dark:bg-red-500 dark-hover:bg-red-700 px-1"
                                onClick={() => dispatch(handleProjectsDelete(index))}
                            >
                              -
                            </button>
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