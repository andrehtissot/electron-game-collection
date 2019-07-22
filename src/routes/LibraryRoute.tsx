import { LibraryScreenContext, LibraryScreenContextProvided } from 'contexts/LibraryScreenContext'
import { LibraryScreenSettingsContextProvider } from 'contexts/LibraryScreenSettingsContext'
import { OverviewScreenContextConsumer, OverviewScreenContextProvided } from 'contexts/OverviewScreenContext'
import * as React from 'react'
import { LibraryScreen } from 'screens/app/library/LibraryScreen/LibraryScreen'

export const LibraryRoute = (): React.ReactElement<object> => {
    return (
        <LibraryScreenSettingsContextProvider>
            <OverviewScreenContextConsumer>
                {({ reloadGames: overviewReloadGames }: OverviewScreenContextProvided) => (
                    <LibraryScreenContext.Consumer>
                        {({
                            games,
                            reloadGames: libraryReloadGames,
                            sortBy,
                            toggleSortBy,
                        }: LibraryScreenContextProvided) => {
                            const reloadGames = () => {
                                overviewReloadGames()
                                libraryReloadGames()
                            }
                            return (
                                <LibraryScreen
                                    games={games}
                                    reloadGames={reloadGames}
                                    sortBy={sortBy}
                                    toggleSortBy={toggleSortBy}
                                />
                            )
                        }}
                    </LibraryScreenContext.Consumer>
                )}
            </OverviewScreenContextConsumer>
        </LibraryScreenSettingsContextProvider>
    )
}
