import { useSelector, useDispatch } from "react-redux"
import { getSkillsToolsError, getSkillsToolsStatus, selectAllSkillsTools } from "../../store/skillsToolsApiSlice"
import React, { useEffect } from "react"
import { getSkillsTools } from "../../store/skillsToolsApiSlice"
import { AppDispatch } from "../../store/store"
import { SkillsTools } from "../../types/skillsToolsTypes"

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
        content = <p>"Loading..."</p>;
    } else if (skillsToolsStatus === 'succeeded') {
        if (skillsTools && skillsTools.length > 0) {
            content = <>
                <p>Success</p>
                {skillsTools.map((skillsTools: SkillsTools, index: number) => (
                  <React.Fragment key={index}>
                    <p>Category: {skillsTools.category}</p>
                    <p>Type: {skillsTools.type}</p>
                    <ul>
                        {skillsTools.list.map((skillTool: string, listIndex: number) => (
                            <li key={listIndex}>{skillTool}</li>
                        ))}
                    </ul>
                    <br />
                  </React.Fragment>
                ))}
            </>
        }
    } else if (skillsToolsStatus === 'failed') {
        content = <p>{skillsToolsError}</p>;
    }

    return (
        <section>
            <h2>Skills Tools</h2>
            {content}
        </section>
    )
}

export default SkillsToolsView