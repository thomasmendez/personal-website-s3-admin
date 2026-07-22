import { FC, ChangeEvent, useEffect, useRef } from "react"

interface ExpandingTextInput {
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    'data-testid': string;
    className?: string;
    threshold?: number;
}

const DEFAULT_THRESHOLD = 40
const baseClassName = "block w-full rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

// swaps between a single-line input and a textarea once the value grows past the threshold
const ExpandingTextInput: FC<ExpandingTextInput> = ({ name, value, onChange, 'data-testid': dataTestId, className = '', threshold = DEFAULT_THRESHOLD }) => {
    const isTextarea = value.length > threshold
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const wasTextarea = useRef(isTextarea)
    // cursor position captured right before a keystroke swaps the underlying element,
    // since the element (and its selection) is gone by the time the effect below runs
    const pendingSelection = useRef<number | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        pendingSelection.current = e.target.selectionStart
        onChange(e)
    }

    useEffect(() => {
        if (wasTextarea.current !== isTextarea && pendingSelection.current !== null) {
            const el = isTextarea ? textareaRef.current : inputRef.current
            const pos = Math.min(pendingSelection.current, value.length)
            el?.focus()
            el?.setSelectionRange(pos, pos)
        }
        wasTextarea.current = isTextarea
        pendingSelection.current = null
    }, [isTextarea, value])

    const combinedClassName = `${baseClassName} ${className}`.trim()

    return isTextarea ? (
        <textarea
            ref={textareaRef}
            name={name}
            id={name}
            data-testid={dataTestId}
            value={value}
            className={combinedClassName}
            style={{ fontSize: "1rem", lineHeight: "1.5rem", minHeight: "2.5rem" }}
            onChange={handleChange}
        />
    ) : (
        <input
            type="text"
            ref={inputRef}
            name={name}
            id={name}
            data-testid={dataTestId}
            value={value}
            className={combinedClassName}
            style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
            onChange={handleChange}
        />
    )
}

export default ExpandingTextInput
