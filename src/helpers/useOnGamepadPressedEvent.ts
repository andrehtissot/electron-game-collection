import { OnGamepadPressedEvent } from 'helpers/gamepadControls/gamepadControls'
import * as React from 'react'

const EVENT_LISTENER_OPTIONS = {
    once: true,
    passive: true,
}

export const useOnGamepadPressedEvent = (
    selectedIndex: number,
    maxIndex: number,
    cardWidth: number,
    setSelectedIndex: (value: number) => void,
    generateOnGamepadControlPressed: (
        selectedIndex: number,
        maxIndex: number,
        setSelectedIndex: (value: number) => void,
        cardWidth: number
    ) => (event: OnGamepadPressedEvent) => boolean,
    {
        snooze,
    }: {
        snooze: number
    }
) => {
    React.useEffect(() => {
        let show = true
        const onGamepadPressed = generateOnGamepadControlPressed(selectedIndex, maxIndex, setSelectedIndex, cardWidth)
        const addEventListener = () => {
            if (show) {
                window.addEventListener(
                    'gamepadonpressed',
                    (event: OnGamepadPressedEvent) => {
                        const haveChanged = onGamepadPressed(event)
                        if (!haveChanged) {
                            addEventListener()
                        }
                    },
                    EVENT_LISTENER_OPTIONS
                )
            }
        }
        setTimeout(addEventListener, snooze)

        return () => {
            show = false
            window.removeEventListener('gamepadconnected', onGamepadPressed)
        }
    })
}
