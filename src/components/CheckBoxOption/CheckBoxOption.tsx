import { IconButton } from 'components/IconButton/IconButton'
import * as React from 'react'
import './CheckBoxOption.scss'

interface ICheckBoxOptionProps extends React.Props<{}> {
    checked?: boolean
    className?: string
    onChange?(): void
}

export const CheckBoxOption = (props: ICheckBoxOptionProps): React.ReactElement<object> => {
    const { children, onChange, checked, className } = props
    const checkedString = checked ? 'true' : 'false'
    const iconString = checked ? '☑' : '☐'
    const labelClassName = 'components--check-box-option--label ' + (className || '')

    return (
        <label role={'checkbox'} aria-checked={checkedString} onClick={onChange} className={labelClassName}>
            <IconButton className="components--check-box-option--icon-button">{iconString}</IconButton>
            {children}
        </label>
    )
}
