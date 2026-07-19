import { ChangeEvent, FC } from "react";
import AddButton from "../Buttons/AddButton";

interface TopicList {
    isEditMode: boolean,
    topic: string,
    list: string[],
    onChange: (listIndex: number) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onAdd?: () => void;
    onRemove?: (listIndex: number) => () => void;
    'data-testid': string;
}

const TopicList: FC<TopicList> = ({ isEditMode, topic, list, onChange, onAdd, onRemove, 'data-testid': dataTestId }) => {
    const INPUT_THRESHOLD = 40
    const inputName = topic.toLowerCase().replace(/ /g, '-')

    return (
        <div className="space-x-5">
            <p className="underline">{topic}:</p>
            <ul className="list-disc">
                {list.map((item: string, listIndex: number) => (
                    <li key={listIndex} data-testid={`${dataTestId}-${listIndex}-${isEditMode ? 'edit' : 'read'}`}>
                        {isEditMode ? (
                            <div className="flex w-full max-w-full rounded-lg shadow-sm">
                                {item.length > INPUT_THRESHOLD ? (
                                    <textarea
                                        name={`${inputName}-${listIndex}`}
                                        id={`${inputName}-${listIndex}`}
                                        value={item}
                                        className="block w-full max-w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", minHeight: "2.5rem" }}
                                        onChange={onChange(listIndex)}
                                        data-testid={`${dataTestId}-${listIndex}-input-field`}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={`${inputName}-${listIndex}`}
                                        id={`${inputName}-${listIndex}`}
                                        value={item}
                                        className="block w-full max-w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${item.length + 1}ch`}}
                                        onChange={onChange(listIndex)}
                                        data-testid={`${dataTestId}-${listIndex}-input-field`}
                                    />
                                )}
                                {onRemove && (
                                    <span
                                        className="cursor-pointer px-1 inline-flex items-center min-w-fit rounded-e-md border border-s-0 border-gray-200 bg-gray-50 text-sm dark:bg-neutral-700 dark:border-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
                                        onClick={onRemove(listIndex)}
                                        data-testid={`${dataTestId}-${listIndex}-remove-button`}
                                    >
                                        <span className="text-sm text-gray-500 dark:text-neutral-400">x</span>
                                    </span>
                                )}
                            </div>
                        ) : (
                            item
                        )}
                    </li>
                ))}
            </ul>
            {isEditMode && onAdd && (
                <AddButton data-testid={`${dataTestId}-add-button`} onClick={onAdd} />
            )}
        </div>
    )
}

export default TopicList
