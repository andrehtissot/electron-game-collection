import * as React from 'react'
import './FakeTableHeader.scss'

interface IFakeTableHeaderProps extends React.Props<{}> {
    className?: string
    style?: React.CSSProperties
    hasSplitter?: boolean
    onClick?(): void
}

const DEFAULT_PROPS: Partial<IFakeTableHeaderProps> = {
    className: '',
    hasSplitter: true,
}

export const FakeTableHeader = (props: IFakeTableHeaderProps): React.ReactElement<object> => {
    const { children, onClick, style, className } = { ...DEFAULT_PROPS, ...props }

    return (
        <div
            className={`components--fake-table--fake-table-header ${className}`}
            onClick={onClick}
            role="button"
            style={style}
        >
            {children}
        </div>
    )
}
