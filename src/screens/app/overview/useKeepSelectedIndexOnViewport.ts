import * as React from 'react'
import { FixedSizeGrid } from 'react-window'
import { getColumnCount } from './getColumnCount'

export const useKeepSelectedIndexOnViewport = (
    overviewGridRef: React.RefObject<FixedSizeGrid & { _outerRef: HTMLDivElement }>,
    selectedIndex: number,
    cardWidth: number,
    cardHeight: number
) => {
    React.useLayoutEffect(() => {
        if (!overviewGridRef || !overviewGridRef.current) {
            return
        }
        const overviewGridOuterDiv = overviewGridRef.current._outerRef
        if (!overviewGridOuterDiv) {
            return
        }
        const { scrollTop, clientHeight } = overviewGridOuterDiv
        const rowIndex = Math.floor(selectedIndex / getColumnCount(cardWidth))
        const currentSelectedVisibleRow = rowIndex - Math.round(scrollTop / cardHeight)
        if (currentSelectedVisibleRow <= 0) {
            overviewGridRef.current.scrollTo({ scrollLeft: 0, scrollTop: rowIndex * cardHeight })

            return
        }
        const visibleRowsCount = Math.floor(clientHeight / cardHeight)
        if (currentSelectedVisibleRow >= visibleRowsCount) {
            overviewGridRef.current.scrollTo({
                scrollLeft: 0,
                scrollTop: (rowIndex + 1) * cardHeight - clientHeight,
            })
        }
    })
}
