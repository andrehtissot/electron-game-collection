import { Table } from 'components/Table/Table'
import { TableBody } from 'components/Table/TableBody'
import { IPluginAvailable, IPluginsContextContextProvided, PluginsContextContext } from 'contexts/PluginsContext'
import * as React from 'react'
import { InstalledPluginSettings } from './InstalledPluginSettings'
import { renderPluginsSettingsTableBodyRow } from './renderPluginsSettingsTableBodyRow'

interface IPluginsSettingsProps extends React.Props<{}> {}

export const PluginsSettings = (props: IPluginsSettingsProps) => (
    <PluginsContextContext.Consumer>
        {({ pluginsEnabled, togglePluginEnabled, pluginsAvailable, pluginsHooks }: IPluginsContextContextProvided) => {
            if (!pluginsAvailable.length) {
                return (
                    <div>
                        <h1>Plugins</h1>
                        <div>None curently available</div>
                    </div>
                )
            }
            return (
                <>
                    <div>
                        <h1>Plugins</h1>
                        <Table>
                            <TableBody>
                                {pluginsAvailable.map((pluginAvailable: IPluginAvailable) =>
                                    renderPluginsSettingsTableBodyRow(
                                        pluginsEnabled,
                                        togglePluginEnabled,
                                        pluginAvailable
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {[...pluginsEnabled.values()].map((pluginEnabled: string) => (
                        <InstalledPluginSettings
                            key={`installed-plugin-settings-for-${pluginEnabled}`}
                            pluginKey={pluginEnabled}
                            pluginsAvailable={pluginsAvailable}
                            pluginsHooks={pluginsHooks}
                        />
                    ))}
                </>
            )
        }}
    </PluginsContextContext.Consumer>
)
