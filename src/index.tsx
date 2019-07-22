import { enableGamepadControls } from 'helpers/gamepadControls/gamepadControls'
import { persistLocationRoute } from 'helpers/persistLocationRoute'
import { registerGlobalPlugin } from 'helpers/plugin'
import { registerGlobalExportFile } from 'helpers/registerGlobalExportFile'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import { App } from 'screens/app/App'
import { registerGlobalDexie } from 'storage/helpers/db'
import './index.scss'

ReactDom.render(<App />, document.getElementById('root'))

registerGlobalPlugin()
registerGlobalDexie()
registerGlobalExportFile()
persistLocationRoute()
enableGamepadControls()
if (process.env.NODE_ENV === 'development') {
    import('helpers/enableHotReload/enableHotReload').then(({ enableHotReload }: { enableHotReload: () => void }) =>
        enableHotReload()
    )
}
