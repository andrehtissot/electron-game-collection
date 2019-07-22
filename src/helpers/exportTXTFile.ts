export const exportTXTFile = async (fileName: string, text: string, mime: string = 'text/plain') => {
    const anchor = document.createElement('a')
    const blob = new Blob([text], { type: mime })
    anchor.setAttribute('href', window.URL.createObjectURL(blob))
    anchor.setAttribute('download', fileName)
    anchor.click()
}
