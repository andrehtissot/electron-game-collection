import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './TabItem.scss'

interface ITabItemProps extends React.Props<{}> {
    linkTo: string
}

export const TabItem = (props: ITabItemProps): React.ReactElement<object> => {
    return (
        <li className="components--tab-item--li">
            <NavLink
                className="components--tab-item--li--nav-link"
                to={props.linkTo}
                activeClassName="components--tab-item--li--nav-link--active"
            >
                {props.children}
            </NavLink>
        </li>
    )
}
