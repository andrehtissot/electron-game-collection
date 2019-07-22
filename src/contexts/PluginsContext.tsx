import { getPlugin, getPluginsAvailable } from 'helpers/server'
import { usePersistedState } from 'helpers/usePersistedState'
import { IGame } from 'interfaces/IGame'
import * as React from 'react'
import { Settings } from 'storage/AppSettings'

export interface IPluginAvailable {
    name: string
    key: string
}

export interface IPluginHooks {
    install?: {
        js: string
    }
    init?: {
        js: string
    }
    uninstall?: {
        js: string
    }
    SettingsSection?: React.FunctionComponent
    enhanceGameData?: (game: IGame) => Promise<void>
    enhanceGamesData?: (game: IGame[]) => Promise<void>
}

export interface IPluginsHooks {
    [pluginKey: string]: IPluginHooks
}

export interface IPluginsInstallation {
    [pluginKey: string]: string
}

export interface IPluginsContextContextProvided {
    pluginsEnabled: Set<string>
    togglePluginEnabled: (pluginKey: string) => void
    pluginsAvailable: IPluginAvailable[]
    pluginsHooks: IPluginsHooks
}

export interface IConsumerProps {
    children(value: IPluginsContextContextProvided): React.ReactNode
}

export const PluginsContextContext = React.createContext({})

const setupPluginsAvailable = async (setPluginsAvailable: (pluginsKeys: IPluginAvailable[]) => void) => {
    try {
        const [status, data] = await getPluginsAvailable()
        if (status === 'SUCCESS' && Array.isArray(data)) {
            setPluginsAvailable(data)
        } else {
            if (status === 'ERROR') {
                console.error(data)
            }
            setPluginsAvailable([])
        }
    } catch (e) {
        setPluginsAvailable([])
    }
}

const generateAddPluginInstallations = (
    pluginsInstallations: IPluginsInstallation,
    pluginsHooks: IPluginHooks,
    setPluginsInstallations: (pluginsInstallations: IPluginsInstallation) => void,
    togglePluginEnabled: (pluginKey: string) => void,
    setPluginsHooks: React.Dispatch<React.SetStateAction<IPluginsHooks>>
) => async (pluginKey: string) => {
    try {
        const [status, data] = await getPlugin<string>(pluginKey)
        if (status === 'ERROR') {
            if (data === 'plugin not found') {
                togglePluginEnabled(pluginKey)
                return
            }
            console.error(data)
            return
        }
        if (status !== 'SUCCESS' || typeof data !== 'string') {
            return
        }
        const instalations: IPluginsInstallation = {
            ...pluginsInstallations,
            [pluginKey]: data,
        }
        setPluginsInstallations(instalations)
        const hooks = {
            ...pluginsHooks,
            [pluginKey]: eval(data),
        } as IPluginsHooks
        setPluginsHooks(hooks)
    } catch (e) {
        console.error(e)
        const instalations: IPluginsInstallation = {
            ...pluginsInstallations,
        }
        delete instalations[pluginKey]
        setPluginsInstallations(instalations)
        const hooks = {
            ...pluginsHooks,
        } as IPluginsHooks
        delete hooks[pluginKey]
        setPluginsHooks(hooks)
    }
}

const generateTogglePluginEnabled = (
    pluginsEnabled: Set<string>,
    setPluginsEnabled: (pluginsEnabled: Set<string>) => void,
    addPluginInstallations: (pluginKey: string) => void
) => (pluginKey: string) => {
    const newSet = new Set(pluginsEnabled)
    if (pluginsEnabled.has(pluginKey)) {
        newSet.delete(pluginKey)
    } else {
        newSet.add(pluginKey)
        addPluginInstallations(pluginKey)
    }
    setPluginsEnabled(newSet)
}

const setupDevPluginsInstallationsState = (
    pluginsEnabled: Set<string>,
    setPluginsInstallations: (pluginsInstallations: IPluginsInstallation) => void,
    addPluginInstallations: (pluginKey: string) => Promise<void>
) => {
    if (pluginsEnabled.size) {
        pluginsEnabled.forEach(addPluginInstallations)
    } else {
        setPluginsInstallations({})
    }

    return <></>
}

const setupPluginsHooksProd = (
    pluginsInstallations: IPluginsInstallation,
    setPluginsHooks: React.Dispatch<React.SetStateAction<IPluginsHooks | undefined>>
) => {
    const hooks: IPluginsHooks = {}
    for (const [key, installation] of Object.entries(pluginsInstallations)) {
        hooks[key] = eval(installation)
    }
    setPluginsHooks(hooks)
}

const setupPluginsHooks = (
    pluginsInstallations: IPluginsInstallation | void,
    setPluginsHooks: React.Dispatch<React.SetStateAction<IPluginsHooks | undefined>>
) => {
    if (pluginsInstallations !== undefined && process.env.NODE_ENV !== 'development') {
        setupPluginsHooksProd(pluginsInstallations, setPluginsHooks)
        // setPluginsHooks
        return
    }

    setPluginsHooks({})
}

export const PluginsContextContextProvider = (
    props: React.Props<IPluginsContextContextProvided>
): React.ReactElement<object> => {
    const [pluginsAvailable, setPluginsAvailable] = React.useState<IPluginAvailable[]>()
    const [pluginsHooks, setPluginsHooks] = React.useState<IPluginsHooks>()
    const [pluginsEnabled, setPluginsEnabled] = usePersistedState<Set<string>>(
        Settings.PLUGINS__PLUGINS_ENABLED,
        new Set()
    )
    // tslint:disable:react-hooks-nesting
    const [pluginsInstallations, setPluginsInstallations] =
        process.env.NODE_ENV === 'development'
            ? React.useState<IPluginsInstallation>()
            : usePersistedState<IPluginsInstallation>(Settings.PLUGINS__PLUGINS_INSTALATION, {})
    // tslint:enable:react-hooks-nesting

    if (pluginsEnabled === undefined) {
        return <></>
    }

    if (pluginsInstallations === undefined && process.env.NODE_ENV !== 'development') {
        return <></>
    }

    if (pluginsHooks === undefined) {
        setupPluginsHooks(pluginsInstallations, setPluginsHooks)

        return <></>
    }

    if (pluginsAvailable === undefined) {
        setupPluginsAvailable(setPluginsAvailable)
    }

    let togglePluginEnabled = generateTogglePluginEnabled(pluginsEnabled, setPluginsEnabled, () => undefined)
    const addPluginInstallations = generateAddPluginInstallations(
        pluginsInstallations || {},
        pluginsHooks,
        setPluginsInstallations,
        togglePluginEnabled,
        setPluginsHooks
    )
    togglePluginEnabled = generateTogglePluginEnabled(pluginsEnabled, setPluginsEnabled, addPluginInstallations)
    if (pluginsInstallations === undefined && process.env.NODE_ENV === 'development') {
        return setupDevPluginsInstallationsState(pluginsEnabled, setPluginsInstallations, addPluginInstallations)
    }

    const provided: IPluginsContextContextProvided = {
        pluginsAvailable: pluginsAvailable || [],
        pluginsEnabled,
        pluginsHooks,
        togglePluginEnabled,
    }

    return <PluginsContextContext.Provider value={provided}>{props.children}</PluginsContextContext.Provider>
}
