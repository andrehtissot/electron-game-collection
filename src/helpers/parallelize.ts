interface IParallelizeOptions<E, R> {
    maxThreadsCount: number
    map: boolean
    forEach(element: E, result: R): void
}

const DEFAULT_OPTIONS: IParallelizeOptions<unknown, unknown> = {
    forEach: () => undefined,
    map: false,
    maxThreadsCount: 8,
}

export const parallelize = async <E, R>(
    elements: E[],
    method: (element: E) => Promise<R>,
    options?: Partial<IParallelizeOptions<E, R>>
) => {
    const { maxThreadsCount, forEach, map } = { ...DEFAULT_OPTIONS, ...options }
    let currentIndex = 0
    const maxIndex = elements.length
    const mapped: R[] = map ? Array(maxIndex) : []
    const getNext = async (): Promise<void> => {
        if (currentIndex >= maxIndex) {
            return
        }
        const elementIndex = currentIndex
        const element = elements[currentIndex]
        currentIndex++

        return method(element).then(async (result: R) => {
            forEach(element, result)
            if (map) {
                mapped[elementIndex] = result
            }

            return getNext()
        })
    }

    const promises = []
    for (let i = maxThreadsCount; i > 0; i--) {
        promises.push(getNext())
    }
    await Promise.all(promises)
    return map ? mapped : undefined
}
