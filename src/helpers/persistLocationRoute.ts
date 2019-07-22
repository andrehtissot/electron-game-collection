import { generateOnHashChange } from 'helpers/generateOnHashChange'
import { AppSettings, Settings } from 'storage/AppSettings'

const recoverRouteIfPossible = async () => {
    const hash = await AppSettings.getValue<string>(Settings.ROUTE_HASH)
    if (hash) {
        location.hash = hash
    }
}

const persistRoute = () => {
    AppSettings.setValue(Settings.ROUTE_HASH, location.hash)
}

export const persistLocationRoute = async () => {
    await recoverRouteIfPossible()
    generateOnHashChange(persistRoute)()
}
