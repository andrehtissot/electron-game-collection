const FILE_NOT_SELECTED_BY_USER_ERROR_MESSAGE = 'No file was selected by the user'

interface IFileInputEventTarget extends EventTarget {
    files: FileList
}

export const requestFile = async (accept: string): Promise<File> =>
    new Promise((resolve: (file: File) => void, reject: (error: Error) => void): void => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = accept
        input.onchange = (event: Event): void => {
            const { files } = event.target as IFileInputEventTarget
            if (files !== undefined && files[0] !== undefined) {
                resolve(files[0])
            }
            reject(new Error(FILE_NOT_SELECTED_BY_USER_ERROR_MESSAGE))
        }
        input.click()
    })
