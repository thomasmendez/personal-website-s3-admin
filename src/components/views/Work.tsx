import { useSelector, useDispatch } from "react-redux"
import { getWorkError, getWorkStatus, selectAllWork } from "../../store/workApiSlice"
import React, { useEffect } from "react"
import { fetchWork } from "../../store/workApiSlice"
import { AppDispatch } from "../../store/store"
import { Work } from "../../types/workTypes"
import { formatDateToMonthYear } from "../../utils/dateFormat"

const WorkView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const work = useSelector(selectAllWork)
    const workStatus = useSelector(getWorkStatus)
    const workError = useSelector(getWorkError)
    
    useEffect(() => {
        if (workStatus === 'idle') {
            dispatch(fetchWork())
        }
    }, [workStatus, dispatch])

    let content;
    if (workStatus === 'pending') {
        content = <p>"Loading..."</p>;
    } else if (workStatus === 'succeeded') {
        if (work && work.length > 0) {
            content = <>
                <p>Success</p>
                {work.map((employment: Work, index: number) => (
                  <React.Fragment key={index}>
                    <p>Job Title: {employment.jobTitle}</p>
                    <p>Company: {employment.company}</p>
                    <p>Location: {employment.location.city}, {employment.location.state}</p>
                    <p>{formatDateToMonthYear(employment.startDate)} - {formatDateToMonthYear(employment.endDate)}</p>
                    <p>Job Role: {employment.jobRole}</p>
                    <ul>
                        {employment.jobDescription.map((task: string, jobDescriptionIndex: number) => (
                            <li key={jobDescriptionIndex}>{task}</li>
                        ))}
                    </ul>
                    <br />
                  </React.Fragment>
                ))}
            </>
        }
    } else if (workStatus === 'failed') {
        content = <p>{workError}</p>;
    }

    return (
        <section>
            <h2>Work</h2>
            {content}
        </section>
    )
}

export default WorkView