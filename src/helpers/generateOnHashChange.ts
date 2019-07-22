const PASSIVE_OPTION = {
    passive: true,
}

export const generateOnHashChange = (callback: () => void, cleanUp: () => void = () => undefined): (() => void) => {
    return (): (() => void) => {
        callback()
        window.addEventListener('hashchange', callback, PASSIVE_OPTION)

        return (): void => {
            window.removeEventListener('hashchange', callback)
            cleanUp()
        }
    }
}
