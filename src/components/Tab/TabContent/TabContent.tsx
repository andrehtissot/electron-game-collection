import * as React from 'react'
import './TabContent.scss'

export const TabContent = (props: React.Props<{}>): React.ReactElement<object> => {
    return <div className="components--tab-content--div">{props.children}</div>
}
