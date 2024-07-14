import { FC, ReactNode } from 'react'

interface Icon {
  iconName: string
  svgIcon: ReactNode
}

const Icon: FC<Icon> = ({ iconName, svgIcon }) => {
  return(
    <div className="flex">
      <button
        type="button"
        className="rounded text-xs leading-normal pr-2"
      >
        <span className="[&>svg]:h-5 [&>svg]:w-5 dark:[&>svg]:fill-[white]">
          {svgIcon}
        </span>
      </button>
      <p className="text-black dark:text-white">{iconName}</p>
    </div>
  )
}

export default Icon