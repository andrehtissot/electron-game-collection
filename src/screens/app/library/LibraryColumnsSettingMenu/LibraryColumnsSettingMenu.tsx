import { ContextMenuButtonOption } from 'components/ContextMenu/ContextMenuButtonOption/ContextMenuButtonOption'
import {
    ILibraryScreenSettingsContextProvided,
    LibraryScreenSettingsContext,
} from 'contexts/LibraryScreenSettingsContext'
import { IPluginsHooks } from 'contexts/PluginsContext'
import { parallelize } from 'helpers/parallelize'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { getGamesSortedBy, Game } from 'storage/game/Game'
import { enhanceGameData } from '../LibraryTableBodyRow/enhanceGameData'
import { getMenuOptions } from './getMenuOptions'
import { LibraryColumnsSettingContextMenu } from './LibraryColumnsSettingContextMenu/LibraryColumnsSettingContextMenu'
import './LibraryColumnsSettingMenu.scss'
import { LibraryColumnsSettingMenuTitle } from './LibraryColumnsSettingMenuTitle/LibraryColumnsSettingMenuTitle'

interface ILibraryColumnsSettingMenuProps extends React.Props<{}> {
    visibleColumns: IGameKey[]
    pluginsHooks: IPluginsHooks
    setVisibleColumn: (column: IGameKey, isVisible: boolean) => void
    reloadGames(): void
}

export const LibraryColumnsSettingMenu = (props: ILibraryColumnsSettingMenuProps): React.ReactElement<object> => {
    const { visibleColumns, setVisibleColumn, reloadGames, pluginsHooks } = props
    const parallelizeGameEnhance = (games: IGame[]) =>
        parallelize(
            games,
            async (game: IGame) => {
                console.time(`Enhanced ${game.title}`)
                await enhanceGameData(game, pluginsHooks)
                console.timeEnd(`Enhanced ${game.title}`)
            },
            { maxThreadsCount: 120 }
        )
    const onUpdateAllClick = async () => {
        const games = await getGamesSortedBy(['platforms', true])
        await parallelizeGameEnhance(games)
        reloadGames()
    }
    const onUpdateSelectiveClick = async () => {
        const games = await Game.filter((game) => !game.releaseDate).toArray()
        await parallelizeGameEnhance(games)
        reloadGames()
    }
    return (
        <LibraryScreenSettingsContext.Consumer>
            {({ isSettingsPressed }: ILibraryScreenSettingsContextProvided) => {
                if (!isSettingsPressed) {
                    return <React.Fragment />
                }

                return (
                    <LibraryColumnsSettingContextMenu>
                        <LibraryColumnsSettingMenuTitle>Visible Columns</LibraryColumnsSettingMenuTitle>
                        {...getMenuOptions(visibleColumns, setVisibleColumn)}
                        <LibraryColumnsSettingMenuTitle>Run For All</LibraryColumnsSettingMenuTitle>
                        <ContextMenuButtonOption
                            onClick={onUpdateAllClick}
                            icon={'☁️'}
                            className="screens--app--library--library-columns-setting-menu---context-menu-button-option"
                        >
                            Trigger update scripts
                        </ContextMenuButtonOption>
                        <ContextMenuButtonOption
                            onClick={onUpdateSelectiveClick}
                            icon={'☁️'}
                            className="screens--app--library--library-columns-setting-menu---context-menu-button-option"
                        >
                            Trigger selective updates
                        </ContextMenuButtonOption>
                    </LibraryColumnsSettingContextMenu>
                )
            }}
        </LibraryScreenSettingsContext.Consumer>
    )
}
