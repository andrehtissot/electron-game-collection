import { FakeTableHeader } from 'components/FakeTable/FakeTableHeader/FakeTableHeader'
import { IconButton } from 'components/IconButton/IconButton'
import {
    ILibraryScreenSettingsContextProvided,
    LibraryScreenSettingsContext,
} from 'contexts/LibraryScreenSettingsContext'
import * as React from 'react'
import './LibraryTableSettingsHeader.scss'

export const LibraryTableSettingsHeader = (): React.ReactElement<object> => (
    <LibraryScreenSettingsContext.Consumer>
        {({ isSettingsPressed, toggleSettingsPressed }: ILibraryScreenSettingsContextProvided) => {
            const className =
                'screens--app--library--library-table-header--library-table-settings-header--fake-table-header'
            const headerClassName = className + (isSettingsPressed ? '--selected' : '')
            const IconButtonClassName = `${className}--icon-button`

            return (
                <FakeTableHeader hasSplitter={false} className={headerClassName}>
                    <IconButton
                        onClick={toggleSettingsPressed}
                        isPressed={isSettingsPressed}
                        children={'🔧'}
                        className={IconButtonClassName}
                    />
                </FakeTableHeader>
            )
        }}
    </LibraryScreenSettingsContext.Consumer>
)
