export const indexByValue = <V = string | number>(source: { [key: string]: string | number }) => {
    const output: { [value: string]: V[] } = {}
    for (const [value, key] of Object.entries(source)) {
        if (output[key]) {
            output[key].push((value as unknown) as V)
        } else {
            output[key] = [(value as unknown) as V]
        }
    }

    return output
}
