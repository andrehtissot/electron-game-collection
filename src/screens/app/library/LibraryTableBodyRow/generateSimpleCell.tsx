import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'

export const generateSimpleCell = (attribute: IGameKey) => (game: IGame) => <div key={attribute}>{game[attribute]}</div>
