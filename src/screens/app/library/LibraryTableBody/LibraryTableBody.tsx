import { AutoSizer } from 'components/AutoSizer'
import { IPluginsHooks } from 'contexts/PluginsContext'
import { usePersistedState } from 'helpers/usePersistedState'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { FixedSizeList, ListOnItemsRenderedProps, ListOnScrollProps } from 'react-window'
import { AppSettings, Settings } from 'storage/AppSettings'
import { generateForEachRow } from '../LibraryTableBodyRow/generateForEachRow'
import './LibraryTableBody.scss'

interface ILibraryTableBodyProps extends React.Props<{}> {
    games: IGame[]
    visibleColumns: IGameKey[]
    relativeWidthByColumn: { [key: string]: number }
    outerDivRef?: React.RefObject<HTMLDivElement>
    pluginsHooks: IPluginsHooks
    onItemsRendered?: (props: ListOnItemsRenderedProps) => any
    onLayoutEffect?: () => void
    reloadGames(): void
}

const onScroll = ({ scrollOffset }: ListOnScrollProps) => {
    AppSettings.setValue(Settings.LIBRARY_SCREEN__SCROLL_OFFSET, scrollOffset)
}

export const LibraryTableBody = (props: ILibraryTableBodyProps): React.ReactElement<object> => {
    // tslint:disable:react-hooks-nesting
    const [initialScrollOffset] =
        process.env.NODE_ENV === 'development'
            ? usePersistedState<number>(Settings.LIBRARY_SCREEN__SCROLL_OFFSET, 0)
            : React.useState<number>(0)
    // tslint:enable:react-hooks-nesting
    const [divOffsetTop, setDivOffsetTop] = React.useState(0)
    const outerDivRef = props.outerDivRef ? props.outerDivRef : React.createRef<HTMLDivElement>()
    const { onLayoutEffect } = props

    React.useLayoutEffect(() => {
        if (!outerDivRef || !outerDivRef.current) {
            return
        }
        setDivOffsetTop((outerDivRef.current.getBoundingClientRect() as DOMRect).y)
        onLayoutEffect && onLayoutEffect()
    })

    if (initialScrollOffset === undefined) {
        return <React.Fragment />
    }

    const { games, reloadGames, visibleColumns, onItemsRendered, pluginsHooks } = props
    const forEachRow = generateForEachRow(visibleColumns, reloadGames, games, pluginsHooks)

    return (
        <div className="screens--app--library--Library-table-body--div" ref={outerDivRef}>
            <AutoSizer>
                {({ innerHeight, innerWidth }: { innerHeight: number; innerWidth: number }) => {
                    const listHeight = innerHeight - divOffsetTop // TODO: DYNAMIC

                    return (
                        <FixedSizeList
                            initialScrollOffset={initialScrollOffset}
                            height={listHeight}
                            itemCount={games.length}
                            itemSize={30} // TODO: DYNAMIC
                            width={innerWidth}
                            children={forEachRow}
                            onScroll={onScroll}
                            onItemsRendered={onItemsRendered}
                        />
                    )
                }}
            </AutoSizer>
        </div>
    )
}
