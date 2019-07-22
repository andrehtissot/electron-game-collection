import { generateOnResizeEvent } from 'helpers/generateOnResizeEvent'
import * as React from 'react'

export interface IAutoSizerChildrenParams {
    innerHeight: number
    innerWidth: number
}

interface IAutoSizerProps extends React.Props<{}> {
    snooze?: number
    children({  }: IAutoSizerChildrenParams): React.ReactElement<object>
}

export const AutoSizer = (props: IAutoSizerProps): React.ReactElement<object> => {
    const [innerHeight, setInnerHeight] = React.useState<number>(window.innerHeight)
    const [innerWidth, setInnerWidth] = React.useState<number>(window.innerWidth)
    const [blocked, setBlocked] = React.useState<boolean>(false)
    let mounted = false

    const setState = () => {
        if (mounted) {
            setInnerHeight(window.innerHeight)
            setInnerWidth(window.innerWidth)
            setBlocked(false)
        }
    }

    const updateDimensions = () => {
        if (!blocked) {
            mounted = true
            if (props.snooze) {
                setTimeout(setState, props.snooze)
            } else {
                setState()
            }
        }
    }

    const cleanup = () => {
        mounted = false
    }

    React.useLayoutEffect(generateOnResizeEvent(updateDimensions, cleanup))

    return props.children({ innerHeight, innerWidth })
}
