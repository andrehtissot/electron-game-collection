import { IPluginsContextContextProvided, PluginsContextContext } from 'contexts/PluginsContext'
import { usePersistedState } from 'helpers/usePersistedState'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { Settings } from 'storage/AppSettings'
import { SortBy } from 'storage/game/SortBy'
import { LibraryColumnsSettingMenu } from '../LibraryColumnsSettingMenu/LibraryColumnsSettingMenu'
import { LibraryTableBody } from '../LibraryTableBody/LibraryTableBody'
import { LibraryTableHeader } from '../LibraryTableHeader/LibraryTableHeader'
import { applyRelativeWidthByColumn } from './applyRelativeWidthByColumn'
import { generateSetVisibleColumnAndSave } from './generateSetVisibleColumnAndSave'
import { getRelativeWidthByColumn } from './getRelativeWidthByColumn'
import './LibraryScreen.scss'

interface ILibraryScreenProps extends React.Props<{}> {
    games: IGame[]
    sortBy: SortBy
    toggleSortBy(attributeName: IGameKey): void
    reloadGames(): void
}

export interface ISuggestionsModalDataParam {
    game: IGame
}

const setupSetScrollBarWidth = (
    divRef: React.RefObject<HTMLDivElement>,
    setScrollBarWidth: React.Dispatch<React.SetStateAction<number>>
) => {
    if (!divRef || !divRef.current) {
        return
    }
    setScrollBarWidth(divRef.current.scrollWidth - divRef.current.clientWidth)
}

const INITIAL_LIBRARY_COLUMNS: IGameKey[] = [
    'title',
    'slug',
    'platforms',
    'userOwnOnLibraries',
    'releaseDate',
    'metacriticScore',
]

export const LibraryScreen = (props: ILibraryScreenProps): React.ReactElement<object> => {
    const [visibleColumns, setVisibleColumns] = usePersistedState<IGameKey[]>(
        Settings.LIBRARY_SCREEN__VISIBLE_COLUMNS,
        INITIAL_LIBRARY_COLUMNS
    )
    const [relativeWidthByColumn, setRelativeWidthByColumn] = React.useState<{ [key: string]: number }>()
    const [scrollBarWidth, setScrollBarWidth] = React.useState(0)
    const divRef = React.createRef<HTMLDivElement>()

    if (visibleColumns === undefined) {
        return <React.Fragment />
    }

    if (relativeWidthByColumn === undefined) {
        setRelativeWidthByColumn(getRelativeWidthByColumn(visibleColumns))

        return <React.Fragment />
    }

    const { games, reloadGames, toggleSortBy } = props

    const setVisibleColumn = generateSetVisibleColumnAndSave(
        visibleColumns,
        scrollBarWidth,
        setVisibleColumns,
        setRelativeWidthByColumn
    )
    applyRelativeWidthByColumn(visibleColumns, relativeWidthByColumn, scrollBarWidth)
    const onLibraryTableBodyLayoutEffect = () => setupSetScrollBarWidth(divRef, setScrollBarWidth)

    return (
        <PluginsContextContext.Consumer>
            {({ pluginsHooks }: IPluginsContextContextProvided) => (
                <div className="screens--app--library--library-screen" ref={divRef}>
                    <LibraryTableHeader
                        visibleColumns={visibleColumns}
                        relativeWidthByColumn={relativeWidthByColumn}
                        onColumnClick={toggleSortBy}
                    />
                    <LibraryTableBody
                        games={games}
                        reloadGames={reloadGames}
                        visibleColumns={visibleColumns}
                        relativeWidthByColumn={relativeWidthByColumn}
                        onLayoutEffect={onLibraryTableBodyLayoutEffect}
                        pluginsHooks={pluginsHooks}
                    />
                    <LibraryColumnsSettingMenu
                        visibleColumns={visibleColumns}
                        setVisibleColumn={setVisibleColumn}
                        reloadGames={reloadGames}
                        pluginsHooks={pluginsHooks}
                    />
                </div>
            )}
        </PluginsContextContext.Consumer>
    )
}
