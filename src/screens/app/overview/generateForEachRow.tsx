import { IGame } from 'interfaces/IGame'
import * as React from 'react'
import { GameCard } from './GameCard/GameCard'

export const generateForEachRow = (games: IGame[], columnCount: number, selectedIndex: number) => ({
    columnIndex,
    rowIndex,
    style,
}: {
    columnIndex: number
    rowIndex: number
    style: React.CSSProperties
}): React.ReactElement<object> => {
    const index = rowIndex * columnCount + columnIndex
    const game = games[index]

    return <GameCard key={game.slug} game={game} style={style} isSelected={selectedIndex === index} />
}
