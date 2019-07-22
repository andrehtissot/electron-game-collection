import hotReloadFilesJson from 'configs/hotReloadFiles.json'
import HotReloadWorker from 'worker-loader!./HotReload.worker'

export const enableHotReload = () => {
    const worker = new HotReloadWorker()
    worker.addEventListener(
        'message',
        (event: MessageEvent) => {
            const [status, message] = event.data
            if (status === 'ERROR') {
                console.error(message)
            }
            if (status === 'SUCCESS') {
                worker.terminate()
                window.location.reload(true)
                return
            }
        },
        { once: true, passive: true }
    )
    worker.postMessage(['watch', hotReloadFilesJson])
    // ['./index.html', 1000], ['./index.css', 1000]
}
