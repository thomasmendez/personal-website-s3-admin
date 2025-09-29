import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { getSkillsToolsError, getSkillsToolsStatus, selectAllSkillsTools,
    skillsToolsAdd, skillsToolsDelete,
    getSkillsToolsMode, skillsToolsModeChange,
    skillsToolsValueChange, skillsToolsCategoryChange,
    skillsToolsListChange, skillsToolsCategoryListAdd, skillsToolsCategoryListRemove,
    skillsToolsAddCategory, skillsToolsDeleteCategory,
    deleteSkillsTools,
    postSkillsTools,
 } from "../../store/skillsToolsApiSlice"
import React, { useEffect } from "react"
import { getSkillsTools, putSkillsTools } from "../../store/skillsToolsApiSlice"
import { AppDispatch } from "../../store/store"
import { Categories, SkillsTools } from "../../types/skillsToolsTypes"
import Loading from "../Loading/Loading"
import AddButton from "../Buttons/AddButton"
import DeleteButton from "../Buttons/DeleteButton"

const SkillsToolsView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const skillsTools = useSelector(selectAllSkillsTools)
    const skillsToolsStatus = useSelector(getSkillsToolsStatus)
    const skillsToolsError = useSelector(getSkillsToolsError)

    const mode = useSelector(getSkillsToolsMode)

    const handleSkillsToolsValueChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(skillsToolsValueChange({index, value: newValue}))
    }

    const handleSkillsToolsCategoryChange = (index: number, categoryIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(skillsToolsCategoryChange({index, categoryIndex, value: newValue}))
    }

    const handleSkillsToolsCategoryListChange = (index: number, categoryIndex: number, listIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(skillsToolsListChange({index, categoryIndex, listIndex, value: newValue}))
    }

    const handleSkillsToolsCategoryListAdd = (index: number, categoryIndex: number, newItem: string) => () => {
      dispatch(skillsToolsCategoryListAdd({index, categoryIndex, newItem}))
    }

    const handleSkillsToolsCategoryListRemove = (index: number, categoryIndex: number, listIndex: number) => () => {
        dispatch(skillsToolsCategoryListRemove({index, categoryIndex, listIndex}))
    }

    const handleSkillsToolsAddCategory = (index: number) => () => {
      dispatch(skillsToolsAddCategory({index}))
    }

    const handleSkillsToolsDeleteCategory = (index: number, categoryIndex: number) => () => {
      dispatch(skillsToolsDeleteCategory({index, categoryIndex}))
    }
  
    const handleSkillsToolsAdd = (index: number) => () => {
      dispatch(skillsToolsAdd({index}))
    }

    const handleSkillsToolsDelete = (index: number) => () => {
      dispatch(skillsToolsDelete({index})) // TODO: Only delete when delete api call returns 200, this line modifies the state
      dispatch(deleteSkillsTools(skillsTools[index])) // TODO: Only delete when delete api call returns 200
    }

    useEffect(() => {
        for (let i = 0; i < mode.length; i++) {
            if (mode[i] === 'editDone') {
                dispatch(putSkillsTools(skillsTools[i]))
                dispatch(skillsToolsModeChange({index: i, mode: 'updated'}))
            }
            if (mode[i] === 'newItemDone') {
                dispatch(postSkillsTools(skillsTools[i]))
                dispatch(skillsToolsModeChange({index: i, mode: 'created'}))
            }
        }
    }, [mode, skillsTools, dispatch])
    
    useEffect(() => {
        if (skillsToolsStatus === 'idle') {
            dispatch(getSkillsTools())
        }
    }, [skillsToolsStatus, dispatch])

    let content;
    if (skillsToolsStatus === 'pending') {
        content = <Loading />;
    } else if (skillsToolsStatus === 'succeeded') {
        if (Array.isArray(skillsTools) && skillsTools.length > 0) {
            content = <React.Fragment>
                {skillsTools.map((skillsToolsValue: SkillsTools, index: number) => (
                    <section key={index} className="grid grid-cols-12 pt-4 pb-4 bg-neutral-100 dark:bg-neutral-900">
                        <div className="sm:col-start-4 sm:col-span-8 col-start-2 space-y-2">
                            {(mode[index] === 'edit' || mode[index] === 'newItem') ? (
                                <div className="flex font-bold">
                                    <input
                                        type="text"
                                        name={`skills-tools-${index}`}
                                        id={`skills-tools-${index}`}
                                        defaultValue={skillsToolsValue.sortValue}
                                        className="block w-auto rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${skillsToolsValue.sortValue.length + 1}ch`}}
                                        onChange={handleSkillsToolsValueChange(index)}
                                    />:
                                </div>
                            ) : (
                                <p className="text-xl underline">{skillsToolsValue.sortValue}</p>
                            )}
                        </div>
                        <div className="justify-center text-center sm:col-span-1 md:col-span-1 col-span-12 space-x-1">
                            {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                <button className="after:content-['\01F441']" onClick={() => {
                                    if (mode[index] === 'newItem') {
                                        dispatch(skillsToolsModeChange({index, mode: 'newItemDone'}))
                                    } else if (mode[index] === 'edit') {
                                        dispatch(skillsToolsModeChange({index, mode: 'editDone'}))
                                    } else {
                                        dispatch(skillsToolsModeChange({index, mode: "view"}))
                                    }
                                }}></button>
                            ) : (
                                <button className="after:content-['\0270F']" onClick={() => {
                                    dispatch(skillsToolsModeChange({index, mode: 'edit'}))
                                }}></button>
                            )}
                            {/* https://emojipedia.org/ */}
                            <AddButton onClick={() => dispatch(handleSkillsToolsAdd(index+1))} />
                            <DeleteButton onClick={() => dispatch(handleSkillsToolsDelete(index))} />
                        </div>
                        {skillsToolsValue.categories?.map((categories: Categories, categoryIndex) => (
                            <div key={`${skillsToolsValue.sortValue}-${categoryIndex}`} className="sm:col-start-4 sm:col-span-8 col-start-2 space-y-2">
                                <div className="flex space-x-1">
                                    {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                        <div className="flex font-bold">
                                            <input
                                                type="text"
                                                name={`skills-tools-category-${categoryIndex}`}
                                                id={`skills-tools-category-${categoryIndex}`}
                                                value={categories.category}
                                                className="block w-auto rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${categories.category.length + 1}ch`}}
                                                onChange={handleSkillsToolsCategoryChange(index, categoryIndex)}
                                            />:
                                        </div>
                                    ) : (
                                        <p className="font-bold">{categories.category}:</p>
                                    )}
                                    <ul className="flex space-x-1">
                                        {categories.list.map((item: string, listIndex) => (
                                            <li key={`${skillsToolsValue.sortValue}-${categories.category}-${categoryIndex}-list-${listIndex}`} className='flex space-x-1'>
                                                {mode[index] === 'edit' || mode[index] === 'newItem' ? (
                                                    <React.Fragment>
                                                        <div className="flex rounded-lg shadow-sm">
                                                          <input
                                                            type="text"
                                                            name={`${skillsToolsValue.sortValue}-${categories.category}-${listIndex}`}
                                                            id={`${skillsToolsValue.sortValue}-${categories.category}-${listIndex}`}
                                                            value={item}
                                                            className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${item.length + 1}ch`}}
                                                            onChange={handleSkillsToolsCategoryListChange(index, categoryIndex, listIndex)}
                                                          />
                                                          <span
                                                            className="cursor-pointer px-1 inline-flex items-center min-w-fit rounded-e-md border border-s-0 border-gray-200 bg-gray-50 text-sm dark:bg-neutral-700 dark:border-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
                                                            onClick={handleSkillsToolsCategoryListRemove(index, categoryIndex, listIndex)}
                                                          >
                                                            <span className="text-sm text-gray-500 dark:text-neutral-400">x</span>
                                                          </span>
                                                        </div>
                                                        {(listIndex === categories.list.length - 1) && (
                                                            <AddButton onClick={() => dispatch(handleSkillsToolsCategoryListAdd(index, categoryIndex, ''))} />
                                                        )}
                                                        {(listIndex === categories.list.length - 1) && (
                                                            <DeleteButton onClick={() => dispatch(handleSkillsToolsDeleteCategory(index, categoryIndex))} />
                                                        )}
                                                    </React.Fragment>
                                                ) : (
                                                    `${item}${listIndex !== categories.list.length - 1 ? ',' : ''}`
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div> 
                                {(mode[index] === 'edit' || mode[index] === 'newItem') && (categoryIndex === skillsToolsValue.categories.length - 1) && (
                                    <AddButton onClick={() => dispatch(handleSkillsToolsAddCategory(index))} />
                                )}
                            </div>
                        ))}
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