import { FC, ReactNode } from 'react'

interface Icon {
  iconName?: string,
  href: string,
  svgIcon: ReactNode
}

const Icon: FC<Icon> = ({ iconName, svgIcon, href }) => {
  return(
    <div className="flex">
      <button
        type="button"
        className="rounded text-xs leading-normal pr-2"
      >
        <a target="_blank" href={href}>
            <span className="[&>svg]:h-5 [&>svg]:w-5 dark:[&>svg]:fill-[white]">
              {svgIcon}
            </span>
        </a>
      </button>
      {iconName && <a target="_blank" href={href}><p className="text-black dark:text-white">{iconName}</p></a>}
    </div>
  )
}

export default Icon