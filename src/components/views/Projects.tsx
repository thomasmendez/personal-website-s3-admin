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
    projectsMediaChange,
    ProjectComponent,
} from "../../store/projectsApiSlice"
import React, { ChangeEvent, useEffect } from "react"
import { AppDispatch } from "../../store/store"
import Loading from "../Loading/Loading"
import DateInput from "../DateInput/DateInput"
import { formatDateToMonthYear } from "../../utils/dateFormat"
import AddButton from "../Buttons/AddButton"
import DeleteButton from "../Buttons/DeleteButton"
import EditButton from "../Buttons/EditButton"
import CardMedia from "../CardMedia/CardMedia"
import TopicList from "../TopicList/TopicList"
import TopicInline from "../TopicInline/TopicInline"
import { getCurrentUser, getUser, getUserStatus } from "../../store/userSlice"

const ProjectsView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const projects = useSelector(selectAllProjects)
    const projectsStatus = useSelector(getProjectsStatus)
    const projectsError = useSelector(getProjectsError)

    const mode = useSelector(getProjectsMode)
    const user = useSelector(getCurrentUser)
    const userStatus = useSelector(getUserStatus)
    const isAdmin = user.isAdmin

    const handleProjectsAdd = (index: number) => () => {
      dispatch(projectsAdd({index}))
    }

    const handleProjectsDelete = (index: number) => () => {
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

    const handleProjectsTeamRolesListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
      dispatch(projectsTeamRolesListChange({index, listIndex, value: newValue}))
    }

    const handleProjectsTasksListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
      dispatch(projectsTasksListChange({index, listIndex, value: newValue}))
    }

    const handleProjectsCloudServicesListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
      dispatch(projectsCloudServicesListChange({index, listIndex, value: newValue}))
    }

    const handleProjectsToolsListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleProjectsEndDatePresentChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(projectsEndDateChange({index, value: event.target.checked ? 'Present' : ''}))
    }

    const handleProjectsNotesChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(projectsNotesChange({index, value: newValue}))
    }

    const handleProjectsMediaChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      console.log("file", file)

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            dispatch(projectsMediaChange({index, mediaLink: null, mediaPreview: base64String, image: file}))
        };
        reader.readAsDataURL(file);
      }
    }

    const handleProjectsMediaRemoval = (index: number) => () => {
      dispatch(projectsMediaChange({index, mediaLink: null, mediaPreview: null, image: null}))
    }

    useEffect(() => {
        for (let i = 0; i < mode.length; i++) {
            if (mode[i] === 'editDone') {
                dispatch(putProjects(projects[i]))
                dispatch(projectsModeChange({index: i, mode: 'updated'}))
                // need to handle wait for response
            }
            if (mode[i] === 'newItemDone') {
                dispatch(postProjects(projects[i]))
                dispatch(projectsModeChange({index: i, mode: 'created'}))
                // need to handle wait for response
            }
        }
    }, [mode, projects])

    useEffect(() => {
        if (projectsStatus === 'idle') {
            dispatch(getProjects())
        }
        if (userStatus === 'idle') {
            dispatch(getUser())
        }
    }, [projectsStatus, userStatus, dispatch])

    let content;
    if (projectsStatus === 'pending') {
        content = <Loading />;
    } else if (projectsStatus === 'succeeded') {
        if (Array.isArray(projects) && projects.length > 0) {
            content = <React.Fragment>
                {projects.map((project: ProjectComponent, index: number) => (
                    <section key={index} className="grid grid-cols-12 p-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="sm:col-start-2 sm:col-span-3 md:col-start-3 md:col-span-3 col-span-12 space-y-3 pr-3">
                            <div className="col-start-3 col-span-7">
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        type="text"
                                        name={`project-name-${index}`}
                                        id={`project-name-${index}`}
                                        data-testid={`projects-${index}-sort-value-input-field`}
                                        placeholder="Project Name"
                                        defaultValue={project.sortValue}
                                        className="block font-bold rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1.125rem", lineHeight: "1.75rem"}}
                                        onChange={handleProjectsValueChange(index)}
                                    />
                                ) : (
                                    <p className="text-xl font-bold" data-testid={`projects-${index}-sort-value-read`}>{project.name}</p>
                                )}
                            </div>
                            <div>
                                <p className="underline">Project Description:</p>
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        name={`project-description-${index}`}
                                        id={`project-description-${index}`}
                                        data-testid={`projects-${index}-description-input-field`}
                                        defaultValue={project.description}
                                        className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                        onChange={handleProjectsDescriptionChange(index)}
                                    />
                                ) : (
                                    <p data-testid={`projects-${index}-description-read`}>{project.description}</p>
                                )}
                            </div>
                            <TopicInline
                                isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                topic="My Role" description={project.role}
                                onChange={handleProjectsRoleChange(index)}
                                data-testid={`projects-${index}-role`}
                            />
                            <TopicList
                                isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                topic="My Tasks" list={project.tasks}
                                onChange={(listIndex) => (e) => handleProjectsTasksListChange(index, listIndex)(e)}
                                data-testid={`projects-${index}-tasks`}
                            />
                            {project.teamSize !== null && (<TopicInline
                                isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                topic="Team Size" description={project.teamSize}
                                onChange={handleProjectsTeamSizeChange(index)}
                                data-testid={`projects-${index}-team-size`}
                            />)}
                            {project?.teamRoles && project.teamRoles.length > 0 && (
                                <TopicList
                                    isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                    topic="Team Roles" list={project.teamRoles}
                                    onChange={(listIndex) => (e) => handleProjectsTeamRolesListChange(index, listIndex)(e)}
                                    data-testid={`projects-${index}-team-roles`}
                                />
                            )}
                            {project?.cloudServices && project.cloudServices.length > 0 && (
                                <TopicList
                                    isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                    topic="Cloud Services" list={project.cloudServices}
                                    onChange={(listIndex) => (e) => handleProjectsCloudServicesListChange(index, listIndex)(e)}
                                    data-testid={`projects-${index}-cloud-services`}
                                />
                            )}
                            {project?.tools && project.tools.length > 0 && (
                                <TopicList
                                    isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                    topic="Tools" list={project.tools}
                                    onChange={(listIndex) => (e) => handleProjectsToolsListChange(index, listIndex)(e)}
                                    data-testid={`projects-${index}-tools`}
                                />
                            )}
                            <TopicInline
                                isEditMode={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')}
                                topic="Project Duration" description={project.duration}
                                onChange={handleProjectsDurationChange(index)}
                                data-testid={`projects-${index}-duration`}
                            />
                            <div className="flex space-x-1">
                                <p className="underline">Project Date:</p>
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <section className="flex space-x-1">
                                        <DateInput
                                            name={`startDate-${index}`}
                                            data-testid={`projects-${index}-start-date`}
                                            value={project.startDate}
                                            onChange={handleProjectsStartDateChange(index)}
                                        />
                                        <p>-</p>
                                        <DateInput
                                            name={`endDate-${index}`}
                                            data-testid={`projects-${index}-end-date`}
                                            value={project.endDate}
                                            onChange={handleProjectsEndDateChange(index)}
                                            onPresentChange={handleProjectsEndDatePresentChange(index)}
                                        />
                                    </section>
                                ) : (
                                    <p data-testid={`projects-${index}-date-read`}>{formatDateToMonthYear(project.startDate)} - {formatDateToMonthYear(project.endDate)}</p>
                                )}
                            </div>
                            {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <input
                                    name={`project-notes-${index}`}
                                    id={`project-notes-${index}`}
                                    data-testid={`projects-${index}-notes-input-field`}
                                    defaultValue={project.notes!}
                                    className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                    onChange={handleProjectsNotesChange(index)}
                                />
                            ) : (
                                <div className="space-x-1">
                                    <p className="italic" data-testid={`projects-${index}-notes-read`}>*{project.notes}*</p>
                                </div>
                            )}
                        </div>
                        <div className="sm:col-span-7 md:col-span-6 col-span-12">
                            {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <div
                                className={project.mediaPreview ?
                                    `relative flex flex-col border-2 border-dashed border-blue-500 dark:border-dashed dark:border-gray-300 rounded-lg transition-colors duration-200` :
                                    `flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-500 dark:border-dashed dark:border-gray-300 rounded-lg transition-colors duration-200`
                                  }
                                >
                                  {project.mediaPreview ? (
                                    <div className="relative inline-block">
                                      <img
                                        src={project.mediaPreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                      <button
                                        onClick={handleProjectsMediaRemoval(index)}
                                        className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded flex items-center justify-center text-sm font-bold transition-all duration-200 z-10"
                                        type="button"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      className={`flex flex-col items-center justify-center dark:border-dashed dark:border-gray-300 rounded-lg transition-colors duration-200`}
                                    >
                                      <p className="text-gray-600">Drag and drop a file here or click below</p>
                                      <label className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Browse
                                        <input
                                          type="file"
                                          className="hidden"
                                          onChange={handleProjectsMediaChange(index)}
                                        />
                                      </label>
                                    </div>
                                  )}
                                </div>
                            ) : (
                                <CardMedia projectName={project.name} media={project.mediaLink} />
                            )}

                            <div className="card bg-gray-300 shadow-x1 dark:bg-neutral-800 mt-3">
                              <div className="card-body">
                                <p className="card-title">{project.name} Features</p>
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        name={`features-description-${index}`}
                                        id={`features-description-${index}`}
                                        data-testid={`projects-${index}-features-description-input-field`}
                                        defaultValue={project.featuresDescription}
                                        className="pt-2 pb-6 block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                    />
                                ) : (
                                    <p className="pt-2 pb-6" data-testid={`projects-${index}-features-description-read`}>{project.featuresDescription}</p>
                                )}
                                <div className="card-actions">
                                    {project.link && (isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                        <div className="flex">
                                            <input
                                                name={`link-type-${index}`}
                                                id={`link-type-${index}`}
                                                data-testid={`projects-${index}-link-type-input-field`}
                                                defaultValue={project.linkType!}
                                                className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                            />
                                            <input
                                                name={`link-${index}`}
                                                id={`link-${index}`}
                                                data-testid={`projects-${index}-link-input-field`}
                                                defaultValue={project.link!}
                                                className="block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem"}}
                                            />
                                        </div>
                                    ) : (
                                        <a href={project.link} data-testid={`projects-${index}-link-type-read`}><button className="btn btn-neutral dark:bg-neutral-700" data-testid={`projects-${index}-link-type-button`}>{project?.linkType}</button></a>
                                    ))}
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12 space-x-1">
                            {isAdmin && (isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem')) ? (
                                <EditButton data-testid={`projects-${index}-edit-button-${mode[index]}`} onClick={() => {
                                    if (mode[index] === 'newItem') {
                                        dispatch(projectsModeChange({index, mode: 'newItemDone'}))
                                    } else if (mode[index] === 'edit') {
                                        dispatch(projectsModeChange({index, mode: 'editDone'}))
                                    } else {
                                        dispatch(projectsModeChange({index, mode: "view"}))
                                    }
                                }} />
                            ) : isAdmin && (
                                <EditButton data-testid={`projects-${index}-edit-button-default`} onClick={() => {
                                    dispatch(projectsModeChange({index, mode: 'edit'}))
                                }} />
                            )}
                            {isAdmin && <AddButton data-testid={`projects-${index}-add-button`} onClick={() => dispatch(handleProjectsAdd(index+1))} />}
                            {isAdmin && <DeleteButton data-testid={`projects-${index}-delete-button`} onClick={() => dispatch(handleProjectsDelete(index))} />}
                        </div>
                    </section>
                ))}
            </React.Fragment>
        } else if (Array.isArray(projects) && projects.length === 0) {
            content = <React.Fragment>
                <section className="grid grid-cols-12 p-4 bg-neutral-100 dark:bg-neutral-900">
                    <div className="sm:col-start-4 sm:col-span-8 col-start-2 space-y-2">
                        No projects found
                    </div>
                    <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12 space-x-1">
                        {isAdmin && (mode[0] === 'edit' || mode[0] === 'newItem' ? (
                                <EditButton data-testid={`projects-0-edit-button-${mode[0]}`} onClick={() => {
                                    if (mode[0] === 'newItem') {
                                        dispatch(projectsModeChange({index: 0, mode: 'newItemDone'}))
                                    } else if (mode[0] === 'edit') {
                                        dispatch(projectsModeChange({index: 0, mode: 'editDone'}))
                                    } else {
                                        dispatch(projectsModeChange({index: 0, mode: "view"}))
                                    }
                                }} />
                            ) : isAdmin && (
                                <EditButton data-testid={`projects-0-edit-button-default`} onClick={() => {
                                    dispatch(projectsModeChange({index: 0, mode: 'edit'}))
                                }} />
                            ))}
                        {isAdmin && <AddButton data-testid={`projects-0-add-button`} onClick={() => dispatch(handleProjectsAdd(0+1))} />}
                        {isAdmin && <DeleteButton data-testid={`projects-0-delete-button`} onClick={() => dispatch(handleProjectsDelete(0))} />}
                    </div>
                </section>
            </React.Fragment>;
        }
    } else if (projectsStatus === 'failed') {
        content = <p>{projectsError as string}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default ProjectsView
