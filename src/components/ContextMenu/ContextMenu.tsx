import * as React from 'react'
import './ContextMenu.scss'

interface IContextMenuProps extends React.Props<{}> {
    className: string
}

export const ContextMenu = (props: IContextMenuProps): React.ReactElement<object> => {
    const className = 'components--context-menu--div ' + (props.className || '')

    return <div className={className}>{props.children}</div>
}
