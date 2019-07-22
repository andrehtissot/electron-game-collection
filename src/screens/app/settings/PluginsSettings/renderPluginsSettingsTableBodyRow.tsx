import { CheckBoxOption } from 'components/CheckBoxOption/CheckBoxOption'
import { TableBodyCenterCell } from 'components/Table/TableBodyCenterCell/TableBodyCenterCell'
import { TableBodyRow } from 'components/Table/TableBodyRow/TableBodyRow'
import { IPluginsContextContextProvided } from 'contexts/PluginsContext'
import * as React from 'react'

export const renderPluginsSettingsTableBodyRow = (
    pluginsEnabled: IPluginsContextContextProvided['pluginsEnabled'],
    togglePluginEnabled: IPluginsContextContextProvided['togglePluginEnabled'],
    {
        key,
        name,
    }: {
        key: string
        name: string
    }
) => {
    const onChange = () => togglePluginEnabled(key)

    return (
        <TableBodyRow key={`table-body-row-for-plugin-${key}`}>
            <TableBodyCenterCell>
                <CheckBoxOption onChange={onChange} checked={pluginsEnabled.has(key)}>
                    {name}
                </CheckBoxOption>
            </TableBodyCenterCell>
        </TableBodyRow>
    )
}
