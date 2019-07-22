import { IGameKey } from 'interfaces/IGame'

export const getRelativeWidthByColumn = (visibleColumns: IGameKey[]) => {
    const relativeWidths: {
        [key: string]: number
    } = {}
    for (const visibleColumn of visibleColumns) {
        relativeWidths[visibleColumn] = Math.floor(10000 / visibleColumns.length) / 100
    }
    return relativeWidths
}
