import { IGameAttributesKeys, IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { LibraryColumnsSettingMenuCheckBoxOption } from './LibraryColumnsSettingMenuCheckBoxOption'

export const getMenuOptions = (
    visibleColumns: IGameKey[],
    setVisibleColumn: (visibleColumn: IGameKey, isVisible: boolean) => void
) =>
    IGameAttributesKeys.map(
        (libraryColumn: IGameKey): React.ReactElement<object> => {
            const onChange = (): void => {
                setVisibleColumn(libraryColumn, !visibleColumns.includes(libraryColumn))
            }

            return (
                <LibraryColumnsSettingMenuCheckBoxOption
                    key={`visibleColumnCheckbox-${libraryColumn}`}
                    checked={visibleColumns.includes(libraryColumn)}
                    onChange={onChange}
                >
                    {libraryColumn}
                </LibraryColumnsSettingMenuCheckBoxOption>
            )
        }
    )
