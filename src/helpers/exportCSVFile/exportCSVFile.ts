import { asyncEvent } from 'helpers/asyncEvent'
import { exportTXTFile } from 'helpers/exportTXTFile'
import ObjectArrayToCSVTextWorker from 'worker-loader!./ObjectArrayToCSVText.worker'

export const exportCSVFile = async (fileName: string, objectArray: {}[], mime: string = 'text/csv') => {
    const worker = new ObjectArrayToCSVTextWorker()
    const response = asyncEvent<MessageEvent>(worker, 'message')
    worker.postMessage(['convert', objectArray])
    const [status, result] = (await response).data
    worker.terminate()
    if (status === 'error') {
        throw new Error(result)
    }

    return exportTXTFile(fileName, result, mime)
}
