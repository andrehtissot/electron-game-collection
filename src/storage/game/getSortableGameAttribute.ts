import { IGame, IGameKey } from 'interfaces/IGame'

export const getSortableGameAttribute = (game: IGame, sortByAttribute: IGameKey) => {
    if (game[sortByAttribute]) {
        return game[sortByAttribute]
    }
}
