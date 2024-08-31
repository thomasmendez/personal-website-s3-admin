import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { getSkillsToolsError, getSkillsToolsStatus, selectAllSkillsTools,
    skillsToolsCategoryChange, skillsToolsTypeChange, skillsToolsListChange } from "../../store/skillsToolsApiSlice"
import React, { useEffect, useState } from "react"
import { getSkillsTools } from "../../store/skillsToolsApiSlice"
import { AppDispatch } from "../../store/store"
import { SkillsTools } from "../../types/skillsToolsTypes"
import Loading from "../Loading/Loading"

const SkillsToolsView = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const skillsTools = useSelector(selectAllSkillsTools)
    const skillsToolsStatus = useSelector(getSkillsToolsStatus)
    const skillsToolsError = useSelector(getSkillsToolsError)

    const handleSkillsToolsCategoryChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(skillsToolsCategoryChange({index, value: newValue}))
    }

    const handleSkillsToolsTypeChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(skillsToolsTypeChange({index, value: newValue}))
    }

    const handleSkillsToolsListChange = (index: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      console.log(index, listIndex)
      dispatch(skillsToolsListChange({index, listIndex, value: newValue}))
    }
    
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
                    <section key={index} className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="sm:col-start-4 sm:col-span-8 col-start-2 space-y-2">
                            {isEditMode ? (
                                <div className="flex font-bold">
                                    <input
                                        type="text"
                                        name={`skills-tools-category-${index}`}
                                        id={`skills-tools-category-${index}`}
                                        defaultValue={skillsTools.category}
                                        className="block w-auto rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${skillsTools.category.length + 1}ch`}}
                                        onChange={handleSkillsToolsCategoryChange(index)}
                                    />:
                                </div>
                            ) : (
                                <p className="text-xl underline">{skillsTools.category}</p>
                            )}
                            <div className="flex space-x-1">
                                {isEditMode ? (
                                    <div className="flex font-bold">
                                        <input
                                            type="text"
                                            name={`skills-tools-type-${index}`}
                                            id={`skills-tools-type-${index}`}
                                            defaultValue={skillsTools.type}
                                            className="block w-auto rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${skillsTools.type.length + 1}ch`}}
                                            onChange={handleSkillsToolsTypeChange(index)}
                                        />:
                                    </div>
                                ) : (
                                    <p className="font-bold">{skillsTools.type}:</p>
                                )}
                                <ul className="flex space-x-1">
                                    {skillsTools.list.map((skillTool: string, listIndex: number) => (
                                        <li key={listIndex}>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    name={`${skillsTools.type}-${listIndex}`}
                                                    id={`${skillsTools.type}-${listIndex}`}
                                                    defaultValue={skillTool}
                                                    className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${skillTool.length + 1}ch`}}
                                                    onChange={handleSkillsToolsListChange(index, listIndex)}
                                                />
                                            ) : (
                                                `${skillTool}${listIndex !== skillsTools.list.length - 1 ? ',' : ''}`
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12">
                            {isEditMode ? (
                                <button className="after:content-['\01F441']" onClick={() => {setIsEditMode(false)}}></button>
                            ) : (
                                <button className="after:content-['\0270F']" onClick={() => {setIsEditMode(true)}}></button>
                            )}
                        </div>
                    </section>
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