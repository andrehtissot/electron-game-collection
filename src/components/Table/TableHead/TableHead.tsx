import * as React from 'react'
import './TableHead.scss'

export const TableHead = (props: React.Props<{}>): React.ReactElement<object> => <thead>{props.children}</thead>
