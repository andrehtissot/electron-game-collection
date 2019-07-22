import { requestAndReadCSVFile } from 'helpers/requestAndReadCSVFile/requestAndReadCSVFile'
import { IGame } from 'interfaces/IGame'
import { Game } from 'storage/game/Game'
import { convertToIGameArray } from './convertToIGameArray'

export const importGamesFromCSV = async () => {
    const gamesFound: IGame[] = await requestAndReadCSVFile<IGame>()
    const games: IGame[] = convertToIGameArray(gamesFound)
    await Game.bulkPut(games)
}
