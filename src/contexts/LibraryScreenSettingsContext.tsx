import { usePersistedState } from 'helpers/usePersistedState'
import * as React from 'react'
import { Settings } from 'storage/AppSettings'

export interface ILibraryScreenSettingsContextProvided {
    isSettingsPressed: boolean
    toggleSettingsPressed: () => void
}

export interface IConsumerProps {
    children(value: ILibraryScreenSettingsContextProvided): React.ReactNode
}

export const LibraryScreenSettingsContext = React.createContext({})

export const LibraryScreenSettingsContextProvider = (
    props: React.Props<ILibraryScreenSettingsContextProvided>
): React.ReactElement<object> => {
    // tslint:disable:react-hooks-nesting
    const [isSettingsPressed, setIsSettingsPressed] =
        process.env.NODE_ENV === 'development'
            ? usePersistedState<boolean>(Settings.LIBRARY_SCREEN__IS_SETTINGS_PRESSED, false)
            : React.useState<boolean>(false)
    // tslint:enable:react-hooks-nesting
    const toggleSettingsPressed = () => setIsSettingsPressed(!isSettingsPressed)

    if (isSettingsPressed === undefined) {
        return <React.Fragment />
    }

    return (
        <LibraryScreenSettingsContext.Provider
            value={{
                isSettingsPressed,
                toggleSettingsPressed,
            }}
        >
            {props.children}
        </LibraryScreenSettingsContext.Provider>
    )
}
