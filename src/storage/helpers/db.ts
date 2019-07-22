import { default as Dexie } from 'dexie'
import { migrate } from './migrate'

const DB_NAME: string = 'game-collection'

export const DB: Dexie = new Dexie(DB_NAME)

migrate(DB, DB_NAME).catch((e: Error) => console.error(e))

export type Table<T, Key> = Dexie.Table<T, Key>

declare var window: {
    Dexie: typeof Dexie
    MainDB: typeof DB
}

export const registerGlobalDexie = () => {
    window.Dexie = Dexie
    window.MainDB = DB
}
