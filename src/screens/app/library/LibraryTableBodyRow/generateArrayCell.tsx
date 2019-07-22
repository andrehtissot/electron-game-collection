import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'

export const generateArrayCell = (attribute: IGameKey) => (game: IGame) => (
    <div key={attribute}>{game[attribute] && (game[attribute] as string[]).join('; ')}</div>
)
