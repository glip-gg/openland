import { useRef, useEffect, useCallback } from 'react'
import throttle from 'lodash/throttle'

const windowScrollPositionKey:any = {
  y: 'pageYOffset',
  x: 'pageXOffset'
}

const documentScrollPositionKey:any = {
  y: 'scrollTop',
  x: 'scrollLeft'
}

const getScrollPosition = (axis:any) =>
  window[windowScrollPositionKey[axis]] ||
  document.documentElement[documentScrollPositionKey[axis]] ||
  document.body[documentScrollPositionKey[axis]] ||
  0

export const ReactWindowScroller = ({
  children,
  throttleTime = 10,
  isGrid = false
}:any) => {
  const ref:any = useRef()
  const outerRef:any = useRef()

  useEffect(() => {
      const handleWindowScroll = throttle(() => {
          console.log('handleWindowScroll');
          const { offsetTop = 0, offsetLeft = 0 }:any = outerRef.current || {}
      const scrollTop = getScrollPosition('y') - offsetTop
      const scrollLeft = getScrollPosition('x') - offsetLeft
      if (isGrid) ref.current && ref.current.scrollTo({ scrollLeft, scrollTop })
      if (!isGrid) ref.current && ref.current.scrollTo(scrollTop)
    }, throttleTime)

    window.addEventListener('scroll', handleWindowScroll)
    return () => {
      handleWindowScroll.cancel()
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [isGrid])

  const onScroll = useCallback(
      ({ scrollLeft, scrollTop, scrollOffset, scrollUpdateWasRequested }:any) => {
          console.log('scoll bitch');
      if (!scrollUpdateWasRequested) return
      const top:any = getScrollPosition('y')
      const left:any = getScrollPosition('x')
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {}

      scrollOffset += Math.min(top, offsetTop)
      scrollTop += Math.min(top, offsetTop)
      scrollLeft += Math.min(left, offsetLeft)

      if (!isGrid && scrollOffset !== top) window.scrollTo(0, scrollOffset)
      if (isGrid && (scrollTop !== top || scrollLeft !== left)) {
        window.scrollTo(scrollLeft, scrollTop)
      }
    },
    [isGrid]
  )

  return children({
    ref,
    outerRef,
    style: {
        width: isGrid ? 'auto' : '100%',
        height: '100%',
        display: 'inline-block'
    },
      onScroll
  })
}
