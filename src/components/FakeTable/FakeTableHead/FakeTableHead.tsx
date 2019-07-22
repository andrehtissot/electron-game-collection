import * as React from 'react'
import './FakeTableHead.scss'

export const FakeTableHead = (props: React.Props<{}>): React.ReactElement<object> => {
    return <div className={'components--fake-table--fake-table-head--div'}>{props.children}</div>
}
