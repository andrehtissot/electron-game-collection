import csvtojson from 'csvtojson'

interface IFileReaderEventTarget extends EventTarget {
    result: string
}

const CSVTOJSON_DEFAULT_PARAMS = {
    ignoreEmpty: true,
    trim: true,
}

const readFileAsString = async (file: File): Promise<string> =>
    new Promise((resolve: (text: string) => void): void => {
        const reader = new FileReader()
        reader.onload = (event: Event): void => {
            const { result } = event.target as IFileReaderEventTarget
            resolve(result)
        }
        reader.readAsText(file)
    })

const readCSVFile = async (file: File): Promise<{}[]> => {
    const text = await readFileAsString(file)

    return csvtojson(CSVTOJSON_DEFAULT_PARAMS).fromString(text)
}

self.addEventListener('message', async (event: MessageEvent) => {
    const [operation, values] = event.data
    if (operation === 'convert') {
        const converted = await readCSVFile(values)
        postMessage(['success', converted])
    }
})
