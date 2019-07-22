import { usePersistedState } from 'helpers/usePersistedState'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { Settings } from 'storage/AppSettings'
import { getGamesSortedBy } from 'storage/game/Game'
import { SortBy } from 'storage/game/SortBy'

export interface IProvided {
    games: IGame[]
    sortBy: SortBy
    reloadGames(): void
    setSortBy(sortBy: SortBy): void
    toggleSortBy(sortByAttribute: string): void
}

export interface IConsumerProps {
    children(value: IProvided): React.ReactNode
}

const generateToggleSortBy = (sortBy: SortBy, setSortBy: (sortBy: SortBy) => void) => (sortByAttribute: IGameKey) => {
    const newSortBy: SortBy = [sortByAttribute, sortBy[0] === sortByAttribute ? !sortBy[1] : true]
    setSortBy(newSortBy)
}

export const getGamesContext = (): [
    React.Context<{}>,
    (props: React.Props<IProvided>) => React.ReactElement<object>
] => {
    const GamesContext = React.createContext({})

    const GamesContextProvider = (props: React.Props<IProvided>): React.ReactElement<object> => {
        const [games, setGames] = React.useState<IGame[]>()
        const [sortBy, setSortBy] = usePersistedState<SortBy>(Settings.LIBRARY_SCREEN__SORT_BY, ['slug', true])

        const loadGames = async () => {
            if (sortBy) {
                setGames(await getGamesSortedBy(sortBy))
            }
        }

        React.useEffect(() => {
            loadGames()
        }, [sortBy])

        if (!sortBy) {
            return <React.Fragment />
        }

        if (games === undefined) {
            loadGames().catch(console.error)

            return <React.Fragment />
        }
        const toggleSortBy = generateToggleSortBy(sortBy, setSortBy)

        return (
            <GamesContext.Provider
                value={{
                    games,
                    reloadGames: loadGames,
                    setSortBy,
                    sortBy,
                    toggleSortBy,
                }}
            >
                {props.children}
            </GamesContext.Provider>
        )
    }

    return [GamesContext, GamesContextProvider]
}
