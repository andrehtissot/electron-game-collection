import { OverviewScreenContextConsumer, OverviewScreenContextProvided } from 'contexts/OverviewScreenContext'
import * as React from 'react'
import { OverviewScreen } from 'screens/app/overview/OverviewScreen'

export const OverviewRoute = (): React.ReactElement<object> => {
    return (
        <OverviewScreenContextConsumer>
            {({ games, reloadGames, sortBy, setSortBy, cardWidth, setCardWidth }: OverviewScreenContextProvided) => (
                <OverviewScreen
                    games={games}
                    reloadGames={reloadGames}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    cardWidth={cardWidth}
                    setCardWidth={setCardWidth}
                />
            )}
        </OverviewScreenContextConsumer>
    )
}
