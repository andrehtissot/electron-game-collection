import { GAMEPAD_BUTTONS } from './gamepadButtons'
import { gamepadsConnectedCount, OnGamepadPressedEvent } from './gamepadControls'
import { PROFILE } from './profile'

export const updateStatus = () => {
    const gamepads = navigator.getGamepads()
    for (const gamepad of gamepads) {
        if (gamepad === null) {
            continue
        }
        const buttonsPressed: Set<string> = new Set()
        for (const [button, index] of Object.entries(PROFILE.GAMEPAD_BUTTONS)) {
            if (buttonsPressed.has(button)) {
                if (gamepad.buttons[index].value !== 1) {
                    buttonsPressed.delete(button)
                    // onReleased(button as GAMEPAD_BUTTONS)
                }
            } else {
                if (gamepad.buttons[index].value !== 0) {
                    buttonsPressed.add(button)
                    // console.log(button)
                    const onPressed: OnGamepadPressedEvent = new CustomEvent('gamepadonpressed', {
                        detail: { button: button as GAMEPAD_BUTTONS },
                    })
                    window.dispatchEvent(onPressed)
                    // onPressed(button as GAMEPAD_BUTTONS)
                }
            }
        }
        // for (let i = gamepad.buttons.length - 1; i > -1; i--) {
        // if (gamepad.buttons[i].value !== 0) {
        //     console.log('button', i, 'is pressed')
        // }
        // }
        // for (let i = gamepad.axes.length - 1; i > -1; i--) {
        //     if (gamepad.axes[i] > PS4_BLUETOOTH_PROFILE.DEADZONE
        // || gamepad.axes[i] < -PS4_BLUETOOTH_PROFILE.DEADZONE) {
        //         console.log('axe', gamepad.axes[i], 'is pressed')
        //     }
        // }
    }
    if (gamepadsConnectedCount) {
        requestAnimationFrame(updateStatus)
    }
}
