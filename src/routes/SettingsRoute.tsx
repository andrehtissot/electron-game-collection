import { LibraryScreenContext, LibraryScreenContextProvided } from 'contexts/LibraryScreenContext'
import { OverviewScreenContextConsumer, OverviewScreenContextProvided } from 'contexts/OverviewScreenContext'
import * as React from 'react'
import { SettingsScreen } from 'screens/app/settings/SettingsScreen'

export const SettingsRoute = (): React.ReactElement<object> => {
    return (
        <LibraryScreenContext.Consumer>
            {({ reloadGames: reloadLibraryGames }: LibraryScreenContextProvided) => (
                <OverviewScreenContextConsumer>
                    {({ reloadGames: reloadOverviewGames }: OverviewScreenContextProvided) => {
                        const reloadGames = () => {
                            reloadLibraryGames()
                            reloadOverviewGames()
                        }

                        return <SettingsScreen reloadGames={reloadGames} />
                    }}
                </OverviewScreenContextConsumer>
            )}
        </LibraryScreenContext.Consumer>
    )
}
