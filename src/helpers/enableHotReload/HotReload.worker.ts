const REQUEST_OPTIONS: RequestInit = { cache: 'no-cache' }

const getFileContent = async (filePath: string) => {
    const address = `${location.protocol}//${location.host}${location.pathname.replace(/\/[^/]+$/, '')}/${filePath}`
    const request = new Request(address, REQUEST_OPTIONS)
    const response = await fetch(request)

    return response.ok ? response.text() : ''
}

const setupHotReload = async (filePath: string, intervalDelay: number) => {
    const initialFileContent = await getFileContent(filePath)
    if (initialFileContent === '') {
        return
    }
    let hotReloadInterval: NodeJS.Timeout
    const hotReload = async () => {
        const fileContent = await getFileContent(filePath)
        if (initialFileContent !== fileContent) {
            if (hotReloadInterval) {
                clearInterval(hotReloadInterval)
            }
            postMessage(['reload'])
        }
    }
    hotReloadInterval = (setInterval(hotReload, intervalDelay) as unknown) as NodeJS.Timeout
}

self.addEventListener('message', (event: MessageEvent) => {
    const [operation, values] = event.data
    if (operation === 'watch') {
        for (const [filePath, intervalDelay] of values) {
            setupHotReload(filePath, intervalDelay)
        }
    }
})
