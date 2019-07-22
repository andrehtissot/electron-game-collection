import csvwriter from 'csvwriter'

const convert = async (objectArray: {}[]): Promise<string> =>
    new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
        csvwriter(objectArray, (err: string, csv: string) => {
            if (err) {
                reject(err)
            } else {
                resolve(csv)
            }
        })
    })

self.addEventListener('message', async (event: MessageEvent) => {
    const [operation, values] = event.data
    if (operation !== 'convert') {
        return
    }
    try {
        const converted = await convert(values)
        postMessage(['success', converted])
    } catch (e) {
        postMessage(['error', e])
    }
})
