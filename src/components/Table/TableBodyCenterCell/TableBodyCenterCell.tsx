import * as React from 'react'
import './TableBodyCenterCell.scss'

interface ITableBodyCenterCellProps extends React.Props<{}> {
    rowSpan?: number
    colSpan?: number
}

export const TableBodyCenterCell = (props: ITableBodyCenterCellProps): React.ReactElement<object> => {
    const { children, rowSpan, colSpan } = props

    return (
        <td className="components--table--table-body-center-cell" rowSpan={rowSpan} colSpan={colSpan}>
            {children}
        </td>
    )
}
