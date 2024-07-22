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
                  <React.Fragment key={index}>
                    <section className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex col-start-3 col-span-7 justify-between">
                            <div className="flex space-x-1">
                                <p className="font-bold">{employment.jobTitle}</p>
                                <p>at</p>
                                <p className="italic">{employment.company},</p>
                                <p>{employment.location.city}, {employment.location.state}</p>
                            </div>
                        </div>
                        <div className="col-span-2 font-bold">
                            <p>{formatDateToMonthYear(employment.startDate)} - {formatDateToMonthYear(employment.endDate)}</p>
                        </div>
                        <div className="col-start-3 col-span-9">
                            <p className="italic">{employment.jobRole}</p>
                        </div>
                        <div className="col-start-3 col-span-9">
                            <ul className="list-disc list-inside">
                                {employment.jobDescription.map((task: string, jobDescriptionIndex: number) => (
                                    <li key={jobDescriptionIndex}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                  </React.Fragment>
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