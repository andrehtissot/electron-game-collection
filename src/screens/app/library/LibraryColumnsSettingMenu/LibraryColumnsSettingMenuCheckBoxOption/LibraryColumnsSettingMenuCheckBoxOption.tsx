import { CheckBoxOption } from 'components/CheckBoxOption/CheckBoxOption'
import * as React from 'react'
import './LibraryColumnsSettingMenuCheckBoxOption.scss'

interface ILibraryColumnsSettingMenuCheckBoxOptionProps extends React.Props<{}> {
    checked?: boolean
    onChange?(): void
}

export const LibraryColumnsSettingMenuCheckBoxOption = (
    props: ILibraryColumnsSettingMenuCheckBoxOptionProps
): React.ReactElement<object> => {
    const className =
        'screens--app--library--library-columns-setting-menu--' +
        'library-columns-setting-menu-check-box-option--context-menu-check-box-option'

    return <CheckBoxOption className={className} {...props} />
}
