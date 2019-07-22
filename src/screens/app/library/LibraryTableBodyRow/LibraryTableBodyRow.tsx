import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { generateBodyCellFor } from './generateBodyCellFor'
import './LibraryTableBodyRow.scss'

interface ILibraryTableBodyRowProps extends React.Props<{}> {
    visibleColumns: IGameKey[]
    game: IGame
    index: number
    style: React.CSSProperties
    onUpdateClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}

export const LibraryTableBodyRow = (props: ILibraryTableBodyRowProps): React.ReactElement<object> => {
    const { game, onUpdateClick, visibleColumns, style, index } = props
    const className = 'screens--app--library--library-table-body-row--div' + (index % 2 === 0 ? '--even' : '')

    return (
        <div className={className} style={style}>
            {visibleColumns.map(
                (visibleColumn: IGameKey) =>
                    generateBodyCellFor[visibleColumn] && generateBodyCellFor[visibleColumn](game)
            )}
            <div
                className="screens--app--library--library-table-body-row--settings-div"
                onClick={onUpdateClick}
                role="button"
            >
                ☁️
            </div>
        </div>
    )
}
