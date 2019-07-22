import * as React from 'react'
import './TableBodyRow.scss'

export const TableBodyRow = (props: React.Props<{}>): React.ReactElement<object> => <tr>{props.children}</tr>
