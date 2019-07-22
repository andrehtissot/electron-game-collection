import { usePersistedState } from 'helpers/usePersistedState'
import * as React from 'react'
import { Settings } from 'storage/AppSettings'
import { getGamesContext, IProvided } from './helpers/getGamesContext'

export type OverviewScreenContextProvided = IProvided & {
    cardWidth: number
    setCardWidth: (value: number) => void
}

const [GamesContext, GamesProvider] = getGamesContext()

export const OverviewScreenContext = React.createContext({})

const DEFAULT_CARD_WIDTH = 25 // 25% of screen width, four cells per row

export const OverviewScreenContextProvider = (
    props: React.Props<OverviewScreenContextProvided>
): React.ReactElement<object> => {
    const [cardWidth, setCardWidth] = usePersistedState<number>(
        Settings.OVERVIEW_SCREEN__CARD_WIDTH,
        DEFAULT_CARD_WIDTH
    )
    if (cardWidth === undefined) {
        return <></>
    }

    return (
        <OverviewScreenContext.Provider value={{ cardWidth, setCardWidth }}>
            <GamesProvider {...props} />
        </OverviewScreenContext.Provider>
    )
}

export const OverviewScreenContextConsumer = (props: {
    children(value: OverviewScreenContextProvided): React.ReactNode
}) => (
    <GamesContext.Consumer>
        {({ games, reloadGames, sortBy, setSortBy, toggleSortBy }: IProvided) => (
            <OverviewScreenContext.Consumer>
                {({ cardWidth, setCardWidth }: OverviewScreenContextProvided) =>
                    props.children({ games, reloadGames, sortBy, setSortBy, cardWidth, setCardWidth, toggleSortBy })
                }
            </OverviewScreenContext.Consumer>
        )}
    </GamesContext.Consumer>
)
