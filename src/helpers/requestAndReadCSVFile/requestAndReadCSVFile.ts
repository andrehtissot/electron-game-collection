import { asyncEvent } from 'helpers/asyncEvent'
import { requestFile } from 'helpers/requestFile'
import CSVFileToObjectArrayWorker from 'worker-loader!./CSVFileToObjectArray.worker'

export const requestAndReadCSVFile = async <T>(): Promise<T[]> => {
    const file = await requestFile('.csv')
    const worker = new CSVFileToObjectArrayWorker()
    const response = asyncEvent<MessageEvent>(worker, 'message')
    worker.postMessage(['convert', file])
    const [status, objectArray] = (await response).data
    worker.terminate()

    return objectArray as Promise<T[]>
}
