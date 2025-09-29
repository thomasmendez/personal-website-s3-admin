import { ChangeEvent, FC } from "react";

interface TopicList {
    isEditMode: boolean,
    topic: string,
    list: string[],
    onChange: (listIndex: number) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

const TopicList: FC<TopicList> = ({ isEditMode, topic, list, onChange }) => {
    const INPUT_THRESHOLD = 40
    const inputName = topic.toLowerCase().replace(/ /g, '-')

    return (
        <div className="space-x-5">
            <p className="underline">{topic}:</p>
            <ul className="list-disc">
                {list.map((item: string, listIndex: number) => (
                    <li key={listIndex}>
                        {isEditMode ? (
                            item.length > INPUT_THRESHOLD ? (
                                <textarea
                                    name={`${inputName}-${listIndex}`}
                                    id={`${inputName}-${listIndex}`}
                                    defaultValue={item}
                                    className="block w-full max-w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", minHeight: "2.5rem" }}
                                    onChange={onChange(listIndex)}
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={`${inputName}-${listIndex}`}
                                    id={`${inputName}-${listIndex}`}
                                    defaultValue={item}
                                    className="block w-full max-w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${item.length + 1}ch`}}
                                    onChange={onChange(listIndex)}
                                />
                            )
                        ) : (
                            item
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TopicList