import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'

export const generateJSONCell = (attribute: IGameKey) => (game: IGame) => (
    <div key={attribute}>{game[attribute] && JSON.stringify(game[attribute])}</div>
)
