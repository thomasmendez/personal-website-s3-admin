import { useSelector, useDispatch } from "react-redux"
import { getWorkError, getWorkStatus, selectAllWork } from "../../store/workApiSlice"
import React, { useEffect, useState } from "react"
import { getWork } from "../../store/workApiSlice"
import { AppDispatch } from "../../store/store"
import { Work } from "../../types/workTypes"
import { formatDateToMonthYear } from "../../utils/dateFormat"
import Loading from "../Loading/Loading"

const WorkView = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const work = useSelector(selectAllWork)
    const workStatus = useSelector(getWorkStatus)
    const workError = useSelector(getWorkError)
    
    useEffect(() => {
        if (workStatus === 'idle') {
            dispatch(getWork())
        }
    }, [workStatus, dispatch])

    let content;
    if (workStatus === 'pending') {
        content = <Loading />;
    } else if (workStatus === 'succeeded') {
        if (Array.isArray(work) && work.length > 0) {
            content = <React.Fragment>
                {work.map((employment: Work, index: number) => (
                    <section key={index} className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex sm:col-start-3 sm:col-span-7 col-start-3 col-span-9 justify-between">
                            <div className="flex space-x-1 text-black dark:text-white">
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name={`${employment.jobTitle}-${index}`}
                                        id={`${employment.jobTitle}-${index}`}
                                        defaultValue={employment.jobTitle}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 font-bold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.jobTitle.length + 1}ch`}}
                                    />
                                ) : (
                                    <span className="font-bold">{employment.jobTitle}</span>
                                )}
                                <span>at</span>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name={`${employment.company}-${index}`}
                                        id={`${employment.company}-${index}`}
                                        defaultValue={employment.company}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.company.length + 1}ch`}}
                                    />
                                ) : (
                                    <span className="italic">{employment.company}</span>
                                )}
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name={`${employment.location.city}-${index}`}
                                        id={`${employment.location.city}-${index}`}
                                        defaultValue={employment.location.city}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.location.city.length + 1}ch`}}
                                    />
                                ) : (
                                    <span>{employment.location.city},</span>
                                )}
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name={`${employment.location.state}-${index}`}
                                        id={`${employment.location.state}-${index}`}
                                        defaultValue={employment.location.state}
                                        className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${employment.location.state.length + 1}ch`}}
                                    />
                                ) : (
                                    <span>{employment.location.state}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex sm:col-span-2 col-start-3 col-span-9 font-bold">
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name={`${employment.startDate}-${index}`}
                                    id={`${employment.startDate}-${index}`}
                                    defaultValue={employment.startDate}
                                    className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${formatDateToMonthYear(employment.startDate).length + 1}ch`}}
                                />
                            ) : (
                                <p>{formatDateToMonthYear(employment.startDate)}-</p>
                            )}
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name={`${employment.endDate}-${index}`}
                                    id={`${employment.endDate}-${index}`}
                                    defaultValue={employment.endDate}
                                    className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${formatDateToMonthYear(employment.endDate).length + 1}ch`}}
                                />
                            ) : (
                                <p>{formatDateToMonthYear(employment.endDate)}</p>
                            )}
                        </div>
                        <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12">
                            {isEditMode ? (
                                <button className="after:content-['\01F441']" onClick={() => {setIsEditMode(false)}}></button>
                            ) : (
                                <button className="after:content-['\0270F']" onClick={() => {setIsEditMode(true)}}></button>
                            )}
                        </div>
                        <div className="sm:col-start-3 sm:col-span-9 col-start-3 col-span-9">
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name={`${employment.jobRole}-${index}`}
                                    id={`${employment.jobRole}-${index}`}
                                    defaultValue={employment.jobRole}
                                    className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${formatDateToMonthYear(employment.jobRole).length + 1}ch`}}
                                />
                            ) : (
                                <p className="italic">{employment.jobRole}</p>
                            )}
                        </div>
                        <div className="sm:col-start-3 sm:col-span-9 col-start-3 col-span-9">
                            <ul className={isEditMode ? "list-disc" : "list-disc list-inside"}>
                                {employment.jobDescription.map((task: string, jobDescriptionIndex: number) => (
                                    <li key={jobDescriptionIndex}>
                                        {isEditMode ? (
                                            <input
                                                type="text"
                                                name={`${task}-${jobDescriptionIndex}`}
                                                id={`${task}-${jobDescriptionIndex}`}
                                                defaultValue={task}
                                                className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${task.length + 1}ch`}}
                                            />
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
        }
    } else if (workStatus === 'failed') {
        content = <p>{workError}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default WorkView