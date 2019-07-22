import { runPlugin } from './server'

declare var window: {
    Plugin: typeof Plugin
}

export const Plugin = {
    run: runPlugin,
}

export const registerGlobalPlugin = () => {
    window.Plugin = Plugin
}
