import { default as Dexie } from 'dexie'

interface ITransaction extends Dexie.Transaction {
    AppSettings: Dexie.Table<{ setting: string; value: object }, object>
}

export const migrate = async (DB: Dexie, DB_NAME: string): Promise<void> => {
    DB.version(1).stores({ AppSettings: 'setting' })
    DB.version(1).stores({
        Game:
            'slug,acronyms,alternativeNames,category,collection,controllerSupport,cover,developers,gameModes,genres,' +
            'keywords,libraries,metacriticMetascore,metacriticTitle,metacriticURL,platforms,playerPerspectives,' +
            'publishers,releaseDate,screenshots,summary,tags,themes,timeToBeat,title,userOwnOnLibraries,' +
            'userOwnOnPlatforms,videos',
    })
}
