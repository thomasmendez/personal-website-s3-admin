import { ChangeEvent, FC } from "react"
import { asDateValue } from "../../utils/dateFormat"

interface DateInputProps {
    name: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onPresentChange?: (e: ChangeEvent<HTMLInputElement>) => void // renders a "Present" checkbox when provided
    'data-testid': string
}

const DateInput: FC<DateInputProps> = ({ name, value, onChange, onPresentChange, 'data-testid': dataTestId }) => (
    <span className="flex items-center space-x-1">
        <input
            type="date"
            name={name}
            id={name}
            data-testid={`${dataTestId}-input-field`}
            value={asDateValue(value)}
            className="block rounded-md border-0 bg-white text-black dark:bg-black dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
            onChange={onChange}
        />
        {onPresentChange && (
            <label className="flex items-center space-x-1 font-normal" style={{ fontSize: "0.875rem" }}>
                <input
                    type="checkbox"
                    data-testid={`${dataTestId}-present-checkbox`}
                    checked={value === 'Present'}
                    onChange={onPresentChange}
                />
                <span>Present</span>
            </label>
        )}
    </span>
)

export default DateInput
