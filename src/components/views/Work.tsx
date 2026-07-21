import { useSelector, useDispatch } from "react-redux"
import React, { ChangeEvent, useEffect } from "react"
import { getWorkError, getWorkStatus, selectAllWork,
    getWorkMode, workModeChange,
    getWork, postWork, putWork, deleteWork,
    workAdd, workDelete,
    workChange,
    workCompanyChange,
    workLocationCityChange,
    workLocationStateChange,
    workStartDateChange,
    workEndDateChange,
    workJobRoleChange,
    workJobDescriptionListChange,
    workJobDescriptionListAdd,
    workJobDescriptionListRemove,
} from "../../store/workApiSlice"
import { getCurrentUser, getUser, getUserStatus } from "../../store/userSlice"
import { AppDispatch } from "../../store/store"
import { Work } from "../../types/workTypes"
import { formatDateToMonthYear } from "../../utils/dateFormat"
import Loading from "../Loading/Loading"
import DateInput from "../DateInput/DateInput"
import AddButton from "../Buttons/AddButton"
import DeleteButton from "../Buttons/DeleteButton"
import EditButton from "../Buttons/EditButton"

const WorkView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const work = useSelector(selectAllWork)
    const workStatus = useSelector(getWorkStatus)
    const workError = useSelector(getWorkError)

    const mode = useSelector(getWorkMode)
    const user = useSelector(getCurrentUser)
    const userStatus = useSelector(getUserStatus)
    const isAdmin = user.isAdmin

    const handleWorkAdd = (index: number) => () => {
      dispatch(workAdd({index}))
    }

    const handleWorkDelete = (index: number) => () => {
      dispatch(workDelete({index}))
      dispatch(deleteWork(work[index]))
    }

    const handleWorkValueChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workChange({index, value: newValue}))
    }

    const handleWorkCompanyChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workCompanyChange({index, value: newValue}))
    }

    const handleWorkLocationCityChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workLocationCityChange({index, value: newValue}))
    }

    const handleWorkLocationStateChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workLocationStateChange({index, value: newValue}))
    }

    const handleWorkStartDateChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workStartDateChange({index, value: newValue}))
    }

    const handleWorkEndDateChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workEndDateChange({index, value: newValue}))
    }

    const handleWorkEndDatePresentChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(workEndDateChange({index, value: event.target.checked ? 'Present' : ''}))
    }

    const handleWorkJobRoleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workJobRoleChange({index, value: newValue}))
    }

    const handleWorkJobDescriptionListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(workJobDescriptionListChange({index, listIndex, value: newValue}))
    }

    const handleWorkJobDescriptionListAdd = (index: number, newItemIndex: number, newItem: string) => () => {
      dispatch(workJobDescriptionListAdd({index, newItemIndex, newItem}))
    }

    const handleWorkJobDescriptionListRemove = (index: number, listIndex: number) => () => {
        dispatch(workJobDescriptionListRemove({index, listIndex}))
    }

    useEffect(() => {
        for (let i = 0; i < mode.length; i++) {
            if (mode[i] === 'editDone') {
                dispatch(putWork(work[i]))
                dispatch(workModeChange({index: i, mode: 'updated'}))
                // need to handle wait for response
            }
            if (mode[i] === 'newItemDone') {
                dispatch(postWork(work[i]))
                dispatch(workModeChange({index: i, mode: 'created'}))
                // need to handle wait for response
            }
        }
    }, [mode, work])

    useEffect(() => {
        if (workStatus === 'idle') {
            dispatch(getWork())
        }
        if (userStatus === 'idle') {
            dispatch(getUser())
        }
    }, [workStatus, userStatus, dispatch])

    let content;
    if (workStatus === 'pending' || userStatus === 'pending') {
        content = <Loading />;
    } else if (workStatus === 'succeeded' && userStatus === 'succeeded') {
        if (Array.isArray(work) && work.length > 0) {
            content = <React.Fragment>
                {work.map((employment: Work, index: number) => (
                    <section key={index} className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex row-start-1 col-start-3 col-span-8 sm:row-start-auto sm:col-start-2 sm:col-span-6 lg:col-start-3 lg:col-span-7 justify-between">
                            <div className="flex flex-wrap sm:flex-nowrap min-w-0 space-x-1 text-black dark:text-white">
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        type="text"
                                        name={`${employment.jobTitle}-${index}`}
                                        id={`${employment.jobTitle}-${index}`}
                                        data-testid={`work-${index}-job-title-input-field`}
                                        defaultValue={employment.jobTitle}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 font-bold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:basis-full max-sm:!w-full"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.jobTitle.length + 1}ch`}}
                                        onChange={handleWorkValueChange(index)}
                                    />
                                ) : (
                                    <span className="font-bold max-sm:basis-full" data-testid={`work-${index}-job-title-read`}>{employment.jobTitle}</span>
                                )}
                                <span>at</span>
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        type="text"
                                        name={`${employment.company}-${index}`}
                                        id={`${employment.company}-${index}`}
                                        data-testid={`work-${index}-company-input-field`}
                                        defaultValue={employment.company}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:basis-full max-sm:!w-full"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.company.length + 1}ch`}}
                                        onChange={handleWorkCompanyChange(index)}
                                    />
                                ) : (
                                    <span className="italic" data-testid={`work-${index}-company-read`}>{employment.company}</span>
                                )}
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        type="text"
                                        name={`${employment.location.city}-${index}`}
                                        id={`${employment.location.city}-${index}`}
                                        data-testid={`work-${index}-city-input-field`}
                                        defaultValue={employment.location.city}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:basis-full max-sm:!w-full"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.location.city.length + 1}ch`}}
                                        onChange={handleWorkLocationCityChange(index)}
                                    />
                                ) : (
                                    <span data-testid={`work-${index}-city-read`}>{employment.location.city},</span>
                                )}
                                {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                    <input
                                        type="text"
                                        name={`${employment.location.state}-${index}`}
                                        id={`${employment.location.state}-${index}`}
                                        data-testid={`work-${index}-state-input-field`}
                                        defaultValue={employment.location.state}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:basis-full max-sm:!w-full"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.location.state.length + 1}ch`}}
                                        onChange={handleWorkLocationStateChange(index)}
                                    />
                                ) : (
                                    <span data-testid={`work-${index}-state-read`}>{employment.location.state}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start row-start-2 col-start-3 col-span-9 sm:flex-row sm:items-start sm:justify-end sm:row-start-1 sm:col-start-8 sm:col-span-4 lg:col-start-10 lg:col-span-2 font-bold">
                            {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <DateInput
                                    name={`startDate-${index}`}
                                    data-testid={`work-${index}-start-date`}
                                    value={employment.startDate}
                                    onChange={handleWorkStartDateChange(index)}
                                />
                            ) : (
                                <p data-testid={`work-${index}-start-date-read`}>{formatDateToMonthYear(employment.startDate)}-</p>
                            )}
                            {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <DateInput
                                    name={`endDate-${index}`}
                                    data-testid={`work-${index}-end-date`}
                                    value={employment.endDate}
                                    onChange={handleWorkEndDateChange(index)}
                                    onPresentChange={handleWorkEndDatePresentChange(index)}
                                />
                            ) : (
                                <p data-testid={`work-${index}-end-date-read`}>{formatDateToMonthYear(employment.endDate)}</p>
                            )}
                        </div>
                        <div className="justify-center text-center row-start-1 col-start-11 col-span-2 sm:row-start-auto sm:col-start-12 sm:col-span-1 space-x-1">
                            {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <EditButton data-testid={`work-${index}-edit-button-${mode[index]}`} onClick={() => {
                                    if (mode[index] === 'newItem') {
                                        dispatch(workModeChange({index, mode: 'newItemDone'}))
                                    } else if (mode[index] === 'edit') {
                                        dispatch(workModeChange({index, mode: 'editDone'}))
                                    } else {
                                        dispatch(workModeChange({index, mode: "view"}))
                                    }
                                }} />
                            ) : isAdmin && (
                                <EditButton data-testid={`work-${index}-edit-button-default`} onClick={() => {
                                    dispatch(workModeChange({index, mode: 'edit'}))
                                }} />
                            )}
                            {isAdmin && <AddButton data-testid={`work-${index}-add-button`} onClick={() => dispatch(handleWorkAdd(index+1))} />}
                            {isAdmin && <DeleteButton data-testid={`work-${index}-delete-button`} onClick={() => dispatch(handleWorkDelete(index))} />}
                        </div>
                        <div className="col-start-3 col-span-9 sm:col-start-2 sm:col-span-10 lg:col-start-3 lg:col-span-9">
                            {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <input
                                    type="text"
                                    name={`${employment.jobRole}-${index}`}
                                    id={`${employment.jobRole}-${index}`}
                                    data-testid={`work-${index}-job-role-input-field`}
                                    defaultValue={employment.jobRole}
                                    className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:!w-full"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.jobRole.length + 1}ch`}}
                                    onChange={handleWorkJobRoleChange(index)}
                                />
                            ) : (
                                <p className="italic" data-testid={`work-${index}-job-role-read`}>{employment.jobRole}</p>
                            )}
                        </div>
                        <div className="col-start-3 col-span-9 sm:col-start-2 sm:col-span-10 lg:col-start-3 lg:col-span-9">
                            <ul className={isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? "list-disc space-y-2" : "list-disc list-inside space-y-2"}>
                                {employment.jobDescription.map((task: string, jobDescriptionIndex: number) => (
                                    <li key={jobDescriptionIndex} data-testid={`work-${index}-job-description-${jobDescriptionIndex}-read`}>
                                        {isAdmin && (mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                            <React.Fragment>
                                                <div className="flex min-w-0 rounded-lg shadow-sm">
                                                    <input
                                                        type="text"
                                                        name={`${task}-${jobDescriptionIndex}`}
                                                        id={`${task}-${jobDescriptionIndex}`}
                                                        data-testid={`work-${index}-job-description-${jobDescriptionIndex}-input-field`}
                                                        value={task}
                                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:min-w-0 max-sm:!w-full"
                                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${task.length + 1}ch`}}
                                                        onChange={handleWorkJobDescriptionListChange(index, jobDescriptionIndex)}
                                                    />
                                                    {isAdmin && <AddButton data-testid={`work-${index}-job-description-${jobDescriptionIndex}-add-button`} onClick={() => dispatch(handleWorkJobDescriptionListAdd(index, jobDescriptionIndex, 'Describe Task'))} />}
                                                    {isAdmin && <DeleteButton data-testid={`work-${index}-job-description-${jobDescriptionIndex}-delete-button`} onClick={() => dispatch(handleWorkJobDescriptionListRemove(index, jobDescriptionIndex))} />}
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            `${task}`
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </React.Fragment>
        } else if (Array.isArray(work) && work.length === 0) {
            content = <React.Fragment>
                <section className="grid grid-cols-12 p-4 bg-neutral-100 dark:bg-neutral-900">
                    <p className="col-start-2 col-span-10 sm:col-start-2 sm:col-span-9 lg:col-start-3 lg:col-span-8 space-y-2">
                        No work found
                    </p>
                    <div className="justify-center text-center col-span-12 sm:col-start-12 sm:col-span-1 space-x-1">
                        {isAdmin &&(mode[0] === 'edit' || mode[0] === 'newItem') ? (
                                <EditButton data-testid={`work-${0}-edit-button-${mode[0]}`} onClick={() => {
                                    if (mode[0] === 'newItem') {
                                        dispatch(workModeChange({index: 0, mode: 'newItemDone'}))
                                    } else if (mode[0] === 'edit') {
                                        dispatch(workModeChange({index: 0, mode: 'editDone'}))
                                    } else {
                                        dispatch(workModeChange({index: 0, mode: "view"}))
                                    }
                                }} />
                            ) : isAdmin && <EditButton data-testid={`work-${0}-edit-button-default`} onClick={() => dispatch(workModeChange({index: 0, mode: 'edit'}))} />}
                        {isAdmin && <AddButton data-testid={`work-${0}-add-button`} onClick={() => dispatch(handleWorkAdd(0+1))} />}
                        {isAdmin && <DeleteButton data-testid={`work-${0}-delete-button`} onClick={() => dispatch(handleWorkDelete(0))} />}
                    </div>
                </section>
            </React.Fragment>;
        }
    } else if (workStatus === 'failed') {
        content = <p>{workError as string}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default WorkView
