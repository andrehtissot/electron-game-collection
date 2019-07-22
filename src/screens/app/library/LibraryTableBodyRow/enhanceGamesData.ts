import { IPluginsHooks } from 'contexts/PluginsContext'
import { IGame } from 'interfaces/IGame'

export const enhanceGamesData = async (games: IGame[], pluginsHooks: IPluginsHooks): Promise<void> => {
    for (const pluginKey of Object.keys(pluginsHooks)) {
        const { enhanceGamesData: pluginEnhanceGamesData } = pluginsHooks[pluginKey]
        if (pluginEnhanceGamesData) {
            await pluginEnhanceGamesData(games)
        }
    }
}
