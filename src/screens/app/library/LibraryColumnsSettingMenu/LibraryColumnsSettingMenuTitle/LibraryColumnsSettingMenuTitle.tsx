import * as React from 'react'
import './LibraryColumnsSettingMenuTitle.scss'

export const LibraryColumnsSettingMenuTitle = (props: React.Props<{}>): React.ReactElement<object> => (
    <h2 className="screens--app--library--library-columns-setting-menu--library-columns-setting-menu-tittle-h2">
        {props.children}
    </h2>
)
