import { IGameKey } from 'interfaces/IGame'
import { applyRelativeWidthByColumn } from './applyRelativeWidthByColumn'
import { getRelativeWidthByColumn } from './getRelativeWidthByColumn'

export const generateSetVisibleColumnAndSave = (
    visibleColumns: IGameKey[],
    scrollBarWidth: number,
    setVisibleColumns: (visibleColumns: IGameKey[]) => void,
    setRelativeWidthByColumn: React.Dispatch<React.SetStateAction<{ [key: string]: number } | undefined>>
) => (visibleColumn: IGameKey, isVisible: boolean) => {
    let updatedVisibleColumns
    if (isVisible) {
        updatedVisibleColumns = [...visibleColumns, visibleColumn]
    } else {
        updatedVisibleColumns = visibleColumns.filter((column: IGameKey) => column !== visibleColumn)
    }
    setVisibleColumns(updatedVisibleColumns)
    const relativeWidthByColumn = getRelativeWidthByColumn(updatedVisibleColumns)
    setRelativeWidthByColumn(relativeWidthByColumn)
    applyRelativeWidthByColumn(updatedVisibleColumns, relativeWidthByColumn, scrollBarWidth)
}
