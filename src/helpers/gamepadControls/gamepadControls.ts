import { GAMEPAD_BUTTONS } from './gamepadButtons'
import { updateStatus } from './updateStatus'

export let gamepadsConnectedCount = 0

export type OnGamepadPressedEvent = CustomEvent<{ button: GAMEPAD_BUTTONS }>

const onGamepadDisconnected = () => {
    gamepadsConnectedCount--
}

const onGamepadConnected = () => {
    gamepadsConnectedCount++
    requestAnimationFrame(updateStatus)
}

export const enableGamepadControls = () => {
    window.addEventListener('gamepadconnected', onGamepadConnected)
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected)
}
export const disableGamepadControls = () => {
    window.removeEventListener('gamepadconnected', onGamepadConnected)
    window.removeEventListener('gamepaddisconnected', onGamepadDisconnected)
}
