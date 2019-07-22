import * as React from 'react'
import './Tab.scss'

export const Tab = (props: React.Props<{}>): React.ReactElement<object> => (
    <nav className="components--tab--nav">
        <ul>{props.children}</ul>
    </nav>
)
