import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'

const convertDateToString = (value: Date) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`

export const generateDateCell = (attribute: IGameKey) => (game: IGame) => (
    <div key={attribute}>{game[attribute] instanceof Date && convertDateToString(game[attribute] as Date)}</div>
)
