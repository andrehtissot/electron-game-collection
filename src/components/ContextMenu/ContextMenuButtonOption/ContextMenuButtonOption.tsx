import * as React from 'react'
import { IconButton } from '../../IconButton/IconButton'
import './ContextMenuButtonOption.scss'

interface IContextMenuButtonOptionProps extends React.Props<{}> {
    icon: string
    className?: string
    onClick?(): void
}

export const ContextMenuButtonOption = (props: IContextMenuButtonOptionProps): React.ReactElement<object> => {
    const { children, onClick, icon, className } = props
    const labelClassName = 'components--context-menu-button-option--label ' + (className || '')

    return (
        <label role={'button'} onClick={onClick} className={labelClassName}>
            <IconButton>{icon}</IconButton>
            {children}
        </label>
    )
}
