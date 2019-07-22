import { IPluginAvailable, IPluginsHooks } from 'contexts/PluginsContext'
import * as React from 'react'

interface IInstalledPluginSettingsProps extends React.Props<{}> {
    pluginKey: string
    pluginsAvailable: IPluginAvailable[]
    pluginsHooks: IPluginsHooks
}

export const InstalledPluginSettings = (props: IInstalledPluginSettingsProps) => {
    const { pluginKey, pluginsHooks } = props
    const SettingsSection = (pluginsHooks[pluginKey] || {}).SettingsSection
    if (!SettingsSection) {
        return <></>
    }
    return React.createElement(SettingsSection)
}
