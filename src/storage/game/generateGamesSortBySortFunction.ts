import { IGame, IGameKey } from 'interfaces/IGame'
import { getSortableGameAttribute } from './getSortableGameAttribute'
import { SortBy } from './SortBy'

const gamesSortBySortBySlugFunction = (gameA: IGame, gameB: IGame): number => {
    const valueA = getSortableGameAttribute(gameA, 'slug')
    const valueB = getSortableGameAttribute(gameB, 'slug')
    if (valueA === valueB) {
        return 0
    }
    if (valueA === undefined) {
        return -1
    }
    if (valueB === undefined) {
        return 1
    }
    if (valueA < valueB) {
        return -1
    }

    return 1
}

const generateGamesSortBySortByAttributeFunction = (sortByAttribute: IGameKey) => (
    gameA: IGame,
    gameB: IGame
): number => {
    const valueA = getSortableGameAttribute(gameA, sortByAttribute)
    const valueB = getSortableGameAttribute(gameB, sortByAttribute)
    if (valueA === undefined && valueB === undefined) {
        return gamesSortBySortBySlugFunction(gameA, gameB)
    }
    if (valueA === valueB) {
        return 0
    }
    if (valueA === undefined) {
        return -1
    }
    if (valueB === undefined) {
        return 1
    }
    if (valueA < valueB) {
        return -1
    }

    return 1
}

const reverse = (wrappedFunction: (gameA: IGame, gameB: IGame) => number) => (gameA: IGame, gameB: IGame): number =>
    wrappedFunction(gameA, gameB) * -1

export const generateGamesSortBySortFunction = ([sortByAttribute, sortByAsc]: SortBy) => {
    const sortByFunction = generateGamesSortBySortByAttributeFunction(sortByAttribute)

    return sortByAsc ? sortByFunction : reverse(sortByFunction)
}
