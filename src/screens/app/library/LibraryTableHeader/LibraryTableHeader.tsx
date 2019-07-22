import { FakeTableHead } from 'components/FakeTable/FakeTableHead/FakeTableHead'
import { FakeTableHeader } from 'components/FakeTable/FakeTableHeader/FakeTableHeader'
import { FakeTableHeaderSplitter } from 'components/FakeTable/FakeTableHeaderSplitter/FakeTableHeaderSplitter'
import { IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { LibraryTableSettingsHeader } from './LibraryTableSettingsHeader'

interface ILibraryTableHeaderProps {
    visibleColumns: IGameKey[]
    relativeWidthByColumn: { [key: string]: number }
    onColumnClick(columnName: IGameKey): void
}

export const LibraryTableHeader = (props: ILibraryTableHeaderProps): React.ReactElement<object> => {
    const { visibleColumns, onColumnClick } = props
    const columnHeaders = []
    for (const visibleColumn of visibleColumns) {
        const onClick = () => onColumnClick(visibleColumn)

        columnHeaders.push(
            <FakeTableHeader key={`FakeTableHeader_${visibleColumn}`} onClick={onClick}>
                {visibleColumn}
            </FakeTableHeader>
        )
        columnHeaders.push(<FakeTableHeaderSplitter key={`FakeTableHeaderSplitter_${visibleColumn}`} />)
    }

    return (
        <FakeTableHead>
            {columnHeaders}
            <LibraryTableSettingsHeader />
        </FakeTableHead>
    )
}
