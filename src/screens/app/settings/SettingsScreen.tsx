import * as React from 'react'
import { DatabaseSettings } from './DatabaseSettings/DatabaseSettings'
import { PluginsSettings } from './PluginsSettings/PluginsSettings'
import './SettingsScreen.scss'

interface ISettingsScreenProps extends React.Props<{}> {
    reloadGames(): void
}

export const SettingsScreen = (props: ISettingsScreenProps) => (
    <div className="screens--app--settings--settings-screen">
        <DatabaseSettings reloadGames={props.reloadGames} />
        <PluginsSettings />
    </div>
)
