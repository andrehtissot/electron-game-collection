import { DB, Table } from './helpers/db'

export enum Settings {
    ROUTE_HASH = 'routeHash',
    PLUGINS__PLUGINS_ENABLED = 'plugins.pluginsEnabled',
    PLUGINS__PLUGINS_INSTALATION = 'plugins.pluginsInstalation',
    LIBRARY_SCREEN__VISIBLE_COLUMNS = 'libraryScreen.visibleColumns',
    LIBRARY_SCREEN__SORT_BY = 'libraryScreen.sortBy',
    LIBRARY_SCREEN__IS_SETTINGS_PRESSED = 'libraryScreen.isSettingsPressed',
    OVERVIEW_SCREEN__SORT_BY = 'overviewScreen.sortBy',
    OVERVIEW_SCREEN__CARD_WIDTH = 'overviewScreen.cardWidth',
    LIBRARY_SCREEN__SCROLL_OFFSET = 'libraryScreen.scrollOffset',
    OVERVIEW_SCREEN__SCROLL_TOP = 'overviewScreen.scrollTop',
}

export interface IAppSettingsType {
    setting: string
    value: unknown
}

type DBType = typeof DB & {
    AppSettings: Table<IAppSettingsType, string> & {
        setValue(setting: string, value: unknown): Promise<void>
        getValue<V = unknown>(setting: string): Promise<V | undefined>
    }
}

export const AppSettings = (DB as DBType).AppSettings

AppSettings.setValue = async (setting: string, value: unknown) => {
    await AppSettings.put({ setting, value })
}

AppSettings.getValue = async <V>(setting: string) => {
    const record = await AppSettings.get(setting)

    return record && (record.value as V)
}
