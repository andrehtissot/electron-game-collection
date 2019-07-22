import { Table } from 'components/Table/Table'
import { TableBody } from 'components/Table/TableBody'
import { TableBodyCenterCell } from 'components/Table/TableBodyCenterCell/TableBodyCenterCell'
import { TableBodyLeftCell } from 'components/Table/TableBodyLeftCell/TableBodyLeftCell'
import { TableBodyRow } from 'components/Table/TableBodyRow/TableBodyRow'
import { TableHead } from 'components/Table/TableHead/TableHead'
import { TableHeader } from 'components/Table/TableHeader/TableHeader'
import { TableHeadRow } from 'components/Table/TableHeadRow'
import * as React from 'react'
import { Game } from 'storage/game/Game'
import { exportGamesToCSV } from './exportGamesToCSV'
import { importGamesFromCSV } from './importGamesFromCSV/importGamesFromCSV'

interface IDatabaseSettingsProps extends React.Props<{}> {
    reloadGames(): void
}

const generateClearGames = (reloadGames: () => void) => async () => {
    await Game.clear()
    reloadGames()
    alert('Game data cleared!')
}

const generateClearGameCovers = (reloadGames: () => void) => async () => {
    const games = await Game.toArray()
    for (let i = 0; i < games.length - 1; i++) {
        delete games[i].overviewImagePath
    }
    await Game.bulkPut(games)
    reloadGames()
    alert('Game covers data cleared!')
}

const generateImportGamesFromCSV = (reloadGames: () => void) => async () => {
    await importGamesFromCSV()
    reloadGames()
    alert('Game data imported!')
}
export const DatabaseSettings = (props: IDatabaseSettingsProps) => (
    <div>
        <h1>Settings</h1>
        <Table>
            <TableHead>
                <TableHeadRow>
                    <TableHeader>Entity</TableHeader>
                    <TableHeader>Import</TableHeader>
                    <TableHeader>Export</TableHeader>
                    <TableHeader>Clear</TableHeader>
                </TableHeadRow>
            </TableHead>
            <TableBody>
                <TableBodyRow>
                    <TableBodyLeftCell>Games</TableBodyLeftCell>
                    <TableBodyCenterCell>
                        <button onClick={generateImportGamesFromCSV(props.reloadGames)}>From CSV</button>
                    </TableBodyCenterCell>
                    <TableBodyCenterCell>
                        <button onClick={exportGamesToCSV}>To CSV</button>
                    </TableBodyCenterCell>
                    <TableBodyCenterCell>
                        <button onClick={generateClearGames(props.reloadGames)}>Erase</button>
                    </TableBodyCenterCell>
                </TableBodyRow>
                <TableBodyRow>
                    <TableBodyLeftCell>Game Covers</TableBodyLeftCell>
                    <TableBodyCenterCell colSpan={2} />
                    <TableBodyCenterCell>
                        <button onClick={generateClearGameCovers(props.reloadGames)}>Erase</button>
                    </TableBodyCenterCell>
                </TableBodyRow>
            </TableBody>
        </Table>
    </div>
)
