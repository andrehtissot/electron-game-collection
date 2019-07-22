import * as React from 'react'
import './TableHeader.scss'

interface ITableHeaderProps extends React.Props<{}> {
    rowSpan?: number
    colSpan?: number
}

export const TableHeader = (props: ITableHeaderProps) => {
    const { children, rowSpan, colSpan } = props

    return (
        <th className={'components--table--table-header'} rowSpan={rowSpan} colSpan={colSpan}>
            {children}
        </th>
    )
}
