import { IPluginsHooks } from 'contexts/PluginsContext'
import { IGame } from 'interfaces/IGame'

export const enhanceGameData = async (game: IGame, pluginsHooks: IPluginsHooks): Promise<void> => {
    for (const pluginKey of Object.keys(pluginsHooks)) {
        const { enhanceGameData: pluginEnhanceGameData } = pluginsHooks[pluginKey]
        if (pluginEnhanceGameData) {
            await pluginEnhanceGameData(game)
        }
    }
}
