import { AutoSizer, IAutoSizerChildrenParams } from 'components/AutoSizer'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { FixedSizeGrid, GridOnScrollProps } from 'react-window'
import { AppSettings, Settings } from 'storage/AppSettings'
import { SortBy } from 'storage/game/SortBy'
import { cardWidthToHeight } from './cardWidthToHeight'
import { generateForEachRow } from './generateForEachRow'
import { OverviewHeader } from './OverviewHeader/OverviewHeader'

interface IOverviewScreenProps extends React.Props<{}> {
    games: IGame[]
    sortBy: SortBy
    cardWidth: number
    setCardWidth(value: number): void
    setSortBy(sortBy: SortBy): void
    reloadGames(): void
}

const onScroll = ({ scrollTop }: GridOnScrollProps) => {
    AppSettings.setValue(Settings.OVERVIEW_SCREEN__SCROLL_TOP, scrollTop)
}

const FIXED_SIZE_GRID_STYLE: React.CSSProperties = { overflowX: 'hidden' }

export const OverviewScreen = (props: IOverviewScreenProps): React.ReactElement<object> => {
    const [initialScrollTop, setInitialScrollTop] = React.useState<number>()
    const overviewGridRef = React.createRef<FixedSizeGrid & { _outerRef: HTMLDivElement }>()
    const gamesCount = props.games.length
    const columnCount = Math.floor(100 / props.cardWidth)
    const rowCount = Math.floor(gamesCount / columnCount)
    const forEach = generateForEachRow(props.games, columnCount, 0)

    if (initialScrollTop === undefined) {
        AppSettings.getValue<number>(Settings.OVERVIEW_SCREEN__SCROLL_TOP).then((scrollTop: number | void) =>
            setInitialScrollTop(scrollTop || 0)
        )

        return <React.Fragment />
    }
    const setSortByAttribute = (attribute: IGameKey) => {
        props.setSortBy([attribute, props.sortBy[1]])
    }
    const setSortByIsAsc = (isAsc: boolean) => {
        props.setSortBy([props.sortBy[0], isAsc])
    }

    return (
        <>
            <OverviewHeader
                sortByAttribute={props.sortBy[0]}
                setSortByAttribute={setSortByAttribute}
                sortByIsAsc={props.sortBy[1]}
                setSortByIsAsc={setSortByIsAsc}
                cardWidth={props.cardWidth}
                setCardWidth={props.setCardWidth}
            />
            <AutoSizer snooze={400}>
                {({ innerHeight, innerWidth }: IAutoSizerChildrenParams) => {
                    const gridHeight = innerHeight - 80
                    const columnWidth = innerWidth / columnCount
                    const rowHeight = cardWidthToHeight(columnWidth)

                    return (
                        <FixedSizeGrid
                            style={FIXED_SIZE_GRID_STYLE}
                            initialScrollTop={initialScrollTop}
                            ref={overviewGridRef}
                            height={gridHeight}
                            rowHeight={rowHeight}
                            width={innerWidth}
                            columnCount={columnCount}
                            rowCount={rowCount}
                            columnWidth={columnWidth}
                            children={forEach}
                            onScroll={onScroll}
                        />
                    )
                }}
            </AutoSizer>
        </>
    )
}
