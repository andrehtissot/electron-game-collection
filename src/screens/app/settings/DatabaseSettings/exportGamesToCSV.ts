import { exportCSVFile } from 'helpers/exportCSVFile/exportCSVFile'
import { IGame } from 'interfaces/IGame'
import { Game } from 'storage/game/Game'

export const exportGamesToCSV = async (): Promise<void> => {
    const allGames: IGame[] = await Game.toArray()

    exportCSVFile(`${Date.now()}.games.csv`, allGames, 'text/csv')
}
