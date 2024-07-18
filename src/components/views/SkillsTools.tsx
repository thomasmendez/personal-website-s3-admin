import { useSelector, useDispatch } from "react-redux"
import { getSkillsToolsError, getSkillsToolsStatus, selectAllSkillsTools } from "../../store/skillsToolsApiSlice"
import React, { useEffect } from "react"
import { getSkillsTools } from "../../store/skillsToolsApiSlice"
import { AppDispatch } from "../../store/store"
import { SkillsTools } from "../../types/skillsToolsTypes"
import Loading from "../Loading/Loading"

const SkillsToolsView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const skillsTools = useSelector(selectAllSkillsTools)
    const skillsToolsStatus = useSelector(getSkillsToolsStatus)
    const skillsToolsError = useSelector(getSkillsToolsError)
    
    useEffect(() => {
        if (skillsToolsStatus === 'idle') {
            dispatch(getSkillsTools())
        }
    }, [skillsToolsStatus, dispatch])

    let content;
    if (skillsToolsStatus === 'pending') {
        content = <Loading />;
    } else if (skillsToolsStatus === 'succeeded') {
        if (skillsTools && skillsTools.length > 0) {
            content = <React.Fragment>
                {skillsTools.map((skillsTools: SkillsTools, index: number) => (
                  <React.Fragment key={index}>
                    <section className="grid grid-cols-12 pt-4 pb-4 bg-neutral-200 dark:bg-neutral-900">
                        <div className="col-start-4 col-span-6 space-y-2">
                            <p className="text-xl underline">{skillsTools.category}</p>
                            <div className="flex space-x-1">
                                <p className="font-bold">{skillsTools.type}: </p>
                                <ul className="flex space-x-1">
                                    {skillsTools.list.map((skillTool: string, listIndex: number) => (
                                        <li key={listIndex}>{`${skillTool} ${listIndex !== skillsTools.list.length - 1 ? ',' : ''}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                  </React.Fragment>
                ))}
            </React.Fragment>
        }
    } else if (skillsToolsStatus === 'failed') {
        content = <p>{skillsToolsError}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default SkillsToolsView