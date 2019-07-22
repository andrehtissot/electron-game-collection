import { IconButton } from 'components/IconButton/IconButton'
import { IGameKey } from 'interfaces/IGame'
import * as React from 'react'
import { OverviewSortBySelect } from './OverviewSortBySelect'

interface IOverviewHeaderProps extends React.Props<{}> {
    sortByAttribute: IGameKey
    sortByIsAsc: boolean
    cardWidth: number
    setCardWidth(value: number): void
    setSortByAttribute(value: IGameKey): void
    setSortByIsAsc(value: boolean): void
}

export const OverviewHeader = (props: IOverviewHeaderProps): React.ReactElement<object> => {
    const sortArrow = props.sortByIsAsc ? '⬇️' : '⬆️'
    const toggleSortArrow = () => props.setSortByIsAsc(!props.sortByIsAsc)
    const onTileSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setCardWidth(Math.pow(parseInt(event.target.value, 10), 3) / 10000)
    }
    const value = Math.round(Math.pow(props.cardWidth * 10000, 1 / 3))

    return (
        <div className="screens--app--overview--overview-header--div">
            <label>
                <span className="screens--app--overview--overview-header--div--label--span">Sort By</span>
                <OverviewSortBySelect selected={props.sortByAttribute} setSelected={props.setSortByAttribute} />
            </label>
            <IconButton className="screens--app--overview--overview-header--div--icon-button" onClick={toggleSortArrow}>
                {sortArrow}
            </IconButton>
            <label>
                <span className="screens--app--overview--overview-header--div--label--span">Tile Size</span>
                <input
                    type="range"
                    onChange={onTileSizeChange}
                    min={30}
                    max={80}
                    aria-valuemax={80}
                    aria-valuemin={30}
                    aria-valuenow={value}
                    defaultValue={'' + value}
                    placeholder="Tile Size"
                />
            </label>
        </div>
    )
}
