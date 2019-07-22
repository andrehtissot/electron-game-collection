import * as React from 'react'
import './TableBodyLeftCell.scss'

export const TableBodyLeftCell = (props: React.Props<{}>): React.ReactElement<object> => (
    <td className="components--table--table-body-left-cell">{props.children}</td>
)
