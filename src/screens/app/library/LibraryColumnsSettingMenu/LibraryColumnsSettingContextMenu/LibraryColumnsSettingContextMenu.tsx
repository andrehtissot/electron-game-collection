import { ContextMenu } from 'components/ContextMenu/ContextMenu'
import * as React from 'react'
import './LibraryColumnsSettingContextMenu.scss'

export const LibraryColumnsSettingContextMenu = (props: React.Props<{}>) => {
    const className =
        'screens--app--library--library-columns-setting-menu--library-columns-setting-context-menu--context-menu'

    return <ContextMenu className={className} children={props.children} />
}
