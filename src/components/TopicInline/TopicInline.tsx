import { FC } from "react"

interface TopicInline {
    isEditMode: boolean,
    topic: string,
    description: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    'data-testid': string;
}

const TopicInline: FC<TopicInline> = ({ isEditMode, topic, description, onChange, 'data-testid': dataTestId }) => {
    const inputName = topic.toLowerCase().replace(/ /g, '-')
    return(
        <div className="flex space-x-1">
            <p className="underline">{topic}:</p>
            {isEditMode ? (
                <input
                    type="text"
                    name={inputName}
                    id={inputName}
                    defaultValue={description}
                    className="block w-auto rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ fontSize: "1rem", lineHeight: "1.5rem", width: `${description.length + 1}ch`}}
                    onChange={onChange}
                    data-testid={`${dataTestId}-input-field`}
                />
            ) : (
                <p data-testid={`${dataTestId}-read`}>{description}</p>
            )}
        </div>
    )
}

export default TopicInline