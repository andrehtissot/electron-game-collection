import { GAMEPAD_BUTTONS } from './gamepadButtons'

const PS4_BLUETOOTH_PROFILE = {
    AXES_DEAD_ZONE: 0.2,
    GAMEPAD_BUTTONS: {
        [GAMEPAD_BUTTONS.UP]: 12,
        [GAMEPAD_BUTTONS.DOWN]: 13,
        [GAMEPAD_BUTTONS.LEFT]: 14,
        [GAMEPAD_BUTTONS.RIGHT]: 15,
    },
    ID: 'Sony Interactive Entertainment DUALSHOCK®4 USB Wireless Adaptor (STANDARD GAMEPAD Vendor: 054c Product: 0ba0)',
}

export const PROFILE = PS4_BLUETOOTH_PROFILE
