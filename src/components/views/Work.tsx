import { useSelector, useDispatch } from "react-redux"
import { getWorkError, getWorkStatus, selectAllWork } from "../../store/workApiSlice"
import React, { useEffect } from "react"
import { getWork } from "../../store/workApiSlice"
import { AppDispatch } from "../../store/store"
import { Work } from "../../types/workTypes"
import { formatDateToMonthYear } from "../../utils/dateFormat"
import Loading from "../Loading/Loading"

const WorkView = () => {
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
        if (work && work.length > 0) {
            content = <React.Fragment>
                {work.map((employment: Work, index: number) => (
                    <section key={index} className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex sm:col-start-3 sm:col-span-7 col-start-3 col-span-9 justify-between">
                            <p className="space-x-1">
                                <span className="font-bold">{employment.jobTitle}</span>
                                <span>at</span>
                                <span className="italic">{employment.company},</span>
                                <span>{employment.location.city}, {employment.location.state}</span>
                            </p>
                        </div>
                        <div className="sm:col-span-2 col-start-3 col-span-9 font-bold">
                            <p>{formatDateToMonthYear(employment.startDate)} - {formatDateToMonthYear(employment.endDate)}</p>
                        </div>
                        <div className="sm:col-start-3 sm:col-span-9 col-start-3 col-span-9">
                            <p className="italic">{employment.jobRole}</p>
                        </div>
                        <div className="sm:col-start-3 sm:col-span-9 col-start-3 col-span-9">
                            <ul className="list-disc list-inside">
                                {employment.jobDescription.map((task: string, jobDescriptionIndex: number) => (
                                    <li key={jobDescriptionIndex}>{task}</li>
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