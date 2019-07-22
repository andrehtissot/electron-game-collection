import { asyncEvent } from './asyncEvent'

export interface IServerConnection<T = unknown> extends Promise<['SUCCESS' | 'ERROR', T]> {
    abort: () => void
}

const request = <T = unknown>(
    operation: string,
    options: {
        params?: unknown
        forEachResponse?: (response: [string, T]) => void
    } = {}
): IServerConnection<T> => {
    const { forEachResponse, params } = options
    const ws: WebSocket = new WebSocket('ws://127.0.0.1:8000/')
    const promise = new Promise(
        async (resolve: (value?: {} | PromiseLike<{}> | undefined) => void, reject: (reason?: any) => void) => {
            ws.onerror = (event: Event) => reject(event)
            await asyncEvent(ws, 'open')
            if (forEachResponse) {
                ws.addEventListener('message', (event: MessageEvent) => {
                    forEachResponse(JSON.parse(event.data))
                })
                ws.send(JSON.stringify([operation, params]))
                resolve(await asyncEvent(ws, 'close'))
            } else {
                const response = asyncEvent<MessageEvent>(ws, 'message')
                ws.send(JSON.stringify([operation, params]))
                const result = JSON.parse((await response).data)
                ws.close()
                resolve(result)
            }
        }
    ) as IServerConnection<T>
    promise.abort = () => {
        ws && ws.close()
    }
    return promise
}

export const getPluginsAvailable = () => request('getPluginsAvailable')

export const getPlugin = <T = unknown>(pluginKey: string): IServerConnection<T> =>
    request<T>('getPlugin', { params: pluginKey })

export const runPlugin = <T = unknown>(
    pluginKey: string,
    operation: string,
    options: {
        params?: unknown
        forEachResponse?: (response: [string, T]) => void
    } = {}
): IServerConnection<T> =>
    request<T>('runPlugin', {
        ...options,
        params: {
            operation,
            params: options.params,
            pluginKey,
        },
    })
