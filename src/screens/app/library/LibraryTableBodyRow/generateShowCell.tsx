import { IconButton } from 'components/IconButton/IconButton'
import { IGame, IGameKey } from 'interfaces/IGame'
import * as React from 'react'

const generateShow = (columnName: string, gameId: string) => (): void => {
    alert('TODO: ' + columnName + ' ' + gameId)
}

export const generateShowCell = (attribute: IGameKey) => (game: IGame) => (
    <div key={attribute}>
        {game[attribute] && <IconButton onClick={generateShow(attribute, game.slug)}>👁</IconButton>}
    </div>
)
