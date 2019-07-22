import { IPluginsHooks } from 'contexts/PluginsContext'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { LibraryTableBodyRow } from '../LibraryTableBodyRow/LibraryTableBodyRow'
import { enhanceGameData } from './enhanceGameData'

export const generateForEachRow = (
    visibleColumns: IGameKey[],
    reloadGames: () => void,
    games: IGame[],
    pluginsHooks: IPluginsHooks
) => ({ index, style }: { index: number; style: React.CSSProperties }): React.ReactElement<object> => {
    const onUpdateClick = async () => {
        await enhanceGameData(games[index], pluginsHooks)
        reloadGames()
    }

    return (
        <LibraryTableBodyRow
            key={games[index].slug}
            onUpdateClick={onUpdateClick}
            visibleColumns={visibleColumns}
            game={games[index]}
            index={index}
            style={style}
        />
    )
}
