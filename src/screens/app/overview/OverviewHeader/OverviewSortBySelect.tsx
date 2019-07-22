import { IGameAttributesKeys, IGameKey } from 'interfaces/IGame'
import * as React from 'react'

interface IOverviewSortBySelectProps extends React.Props<{}> {
    selected: IGameKey
    setSelected(value: IGameKey): void
}

const getSelectOptions = (selected: IGameKey) =>
    IGameAttributesKeys.map((attributeKey: IGameKey) => (
        <option value={attributeKey} key={attributeKey} role="option" aria-selected={selected === attributeKey}>
            {attributeKey}
        </option>
    ))

export const OverviewSortBySelect = (props: IOverviewSortBySelectProps): React.ReactElement<object> => {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setSelected(event.target.value as IGameKey)
    }

    return (
        <select defaultValue={props.selected} onBlur={onChange}>
            {getSelectOptions(props.selected)}
        </select>
    )
}
