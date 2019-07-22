import { GAMEPAD_BUTTONS } from 'helpers/gamepadControls/gamepadButtons'
import { OnGamepadPressedEvent } from 'helpers/gamepadControls/gamepadControls'
import { getColumnCount } from './getColumnCount'

export const generateOnGamepadControlPressed = (
    selectedIndex: number,
    maxIndex: number,
    setSelectedIndex: (value: number) => void,
    cardWidth: number
) => (event: OnGamepadPressedEvent): boolean => {
    let newSelectedIndex = selectedIndex
    switch (event.detail.button) {
        case GAMEPAD_BUTTONS.DOWN:
            newSelectedIndex += getColumnCount(cardWidth)
            break
        case GAMEPAD_BUTTONS.UP:
            newSelectedIndex -= getColumnCount(cardWidth)
            break
        case GAMEPAD_BUTTONS.RIGHT:
            newSelectedIndex++
            break
        case GAMEPAD_BUTTONS.LEFT:
            newSelectedIndex--
            break
        default:
            return false
    }
    if (newSelectedIndex < 0) {
        return false
    }
    if (newSelectedIndex >= maxIndex) {
        return false
    }
    setSelectedIndex(newSelectedIndex)

    return true
}
