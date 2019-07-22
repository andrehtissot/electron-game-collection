const PASSIVE_OPTION = {
    passive: true,
}

export const generateOnResizeEvent = (callback: () => void, cleanUp: () => void = () => undefined): (() => void) => {
    return (): (() => void) => {
        callback()
        const onEvent = (): void => {
            callback()
        }
        window.addEventListener('resize', onEvent, PASSIVE_OPTION)

        return (): void => {
            window.removeEventListener('resize', onEvent)
            cleanUp()
        }
    }
}
