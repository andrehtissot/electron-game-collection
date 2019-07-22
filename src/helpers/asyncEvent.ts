const EVENT_LISTENER_OPTIONS = { once: true, passive: true }

interface IListenable {
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void
}

export const asyncEvent = <E extends Event>(element: IListenable, eventType: string): Promise<E> =>
    new Promise((resolve: (value: E) => void) => {
        element.addEventListener(
            eventType,
            (event: E) => {
                resolve(event)
            },
            EVENT_LISTENER_OPTIONS
        )
    })
