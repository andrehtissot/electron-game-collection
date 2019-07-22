import { useState } from 'react'
import { AppSettings, Settings } from 'storage/AppSettings'

const wrapperSetter = <T>(setting: Settings, setter: (value: T) => void) => (value: T) => {
    setter(value)
    AppSettings.setValue(setting, value)
}

export const usePersistedState = <T>(setting: Settings, defaultValue: T): [T | void, (value: T) => void] => {
    const [value, setter] = useState<T>()
    if (value === undefined) {
        AppSettings.getValue<T>(setting).then((recoveredValue: T) => setter(recoveredValue || defaultValue))

        return [value, setter]
    }

    return [value, wrapperSetter<T>(setting, setter)]
}
