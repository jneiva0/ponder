import { useState } from 'react'

export interface UseHoverOptions {
  mouseEnterDelayMS?: number
  mouseLeaveDelayMS?: number
}

export type HoverProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onMouseEnter' | 'onMouseLeave'
>

export const useHover = ({
  mouseEnterDelayMS = 0,
  mouseLeaveDelayMS = 0,
}: UseHoverOptions = {}): [boolean, HoverProps] => {
  const [isHovering, setIsHovering] = useState(false)
  let mouseEnterTimer: NodeJS.Timeout | undefined
  let mouseOutTimer: NodeJS.Timeout | undefined
  return [
    isHovering,
    {
      onMouseEnter: () => {
        clearTimeout(mouseOutTimer)
        mouseEnterTimer = setTimeout(
          () => setIsHovering(true),
          mouseEnterDelayMS
        )
      },
      onMouseLeave: () => {
        clearTimeout(mouseEnterTimer)
        mouseOutTimer = setTimeout(
          () => setIsHovering(false),
          mouseLeaveDelayMS
        )
      },
    },
  ]
}
