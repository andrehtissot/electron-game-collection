import { IGame } from 'interfaces/IGame'
import { DB, Table } from '../helpers/db'
import { generateGamesSortBySortFunction } from './generateGamesSortBySortFunction'
import { SortBy } from './SortBy'

type DBType = typeof DB & { Game: Table<IGame, string> }

export const Game = (DB as DBType).Game

export const getGamesSortedBy = async (sortBy: SortBy): Promise<IGame[]> => {
    const [sortByAttribute, sortByAsc] = sortBy
    if (sortByAttribute === 'slug') {
        if (sortByAsc) {
            return Game.toArray()
        }

        return Game.reverse().toArray()
    }
    const games = await Game.toArray()
    games.sort(generateGamesSortBySortFunction(sortBy))

    return games
}
