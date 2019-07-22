import { titleToSlug } from 'helpers/titleToSlug'
import { AttributeTypes } from 'interfaces/helpers/AttributeTypes'
import { IGame, IGameAttributes, IGameAttributesKeys, IGameKey } from 'interfaces/IGame'

const convertFor = (gameFound: IGame, gameKey: IGameKey) => {
    const type = IGameAttributes[gameKey]
    switch (type) {
        case AttributeTypes.STRING_ARRAY:
            return (gameFound[gameKey] as string).split(',')
        case AttributeTypes.OBJECT:
            console.info('TODO: convertFor OBJECT =>', JSON.stringify(gameFound[gameKey]))

            return gameFound[gameKey]
        case AttributeTypes.DATE:
            return new Date(gameFound[gameKey] as string)
        case AttributeTypes.NUMBER:
            return typeof gameFound[gameKey] === 'number' ? gameFound[gameKey] : Number(gameFound[gameKey] as string)
        case AttributeTypes.NUMBER_ARRAY:
            return (gameFound[gameKey] as string).split(',').map(Number)
        default:
            return gameFound[gameKey]
    }
}

export const convertToIGameArray = (gamesFound: IGame[]): IGame[] => {
    const games: IGame[] = []

    for (const gameFound of gamesFound) {
        const game = {} as IGame
        for (const gameKey of IGameAttributesKeys) {
            if (gameFound[gameKey]) {
                game[gameKey] = convertFor(gameFound, gameKey) as never
            }
        }
        if (!game.slug && game.title) {
            game.slug = titleToSlug(game.title)
        }
        games.push(game)
    }

    return games
}
