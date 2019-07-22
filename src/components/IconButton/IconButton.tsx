import * as React from 'react'
import './IconButton.scss'

interface IIconButtonProps extends React.Props<{}> {
    isPressed?: boolean
    className?: string
    onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}

export const IconButton = (props: IIconButtonProps): React.ReactElement<object> => {
    const { isPressed, onClick, children, className } = props
    const divClassName =
        (isPressed ? 'components--icon-button--pressed ' : 'components--icon-button ') + (className || '')

    return (
        <div onClick={onClick} role="button" className={divClassName}>
            {children}
        </div>
    )
}
