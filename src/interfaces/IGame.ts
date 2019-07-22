import { indexByValue } from 'helpers/indexByValue'
import { AttributeTypes } from './helpers/AttributeTypes'

export interface IGame {
    acronyms?: string[]
    categories?: string[]
    collection?: string
    controllerSupport?: string
    cover?: string
    developers?: string[]
    gameModes?: string[]
    genres?: string[]
    hasAdultContent?: boolean
    keywords?: string[]
    libraries?: string[]
    metacriticScore?: number
    metacriticTitle?: string
    metacriticUrl?: string
    overviewImagePath?: string
    platforms?: string[]
    playerPerspectives?: string[]
    publishers?: string[]
    releaseDate?: Date
    screenshots?: string[]
    slug: string
    summary?: string
    tags?: string[]
    themes?: string[]
    timeToBeat?: object
    title: string
    userOwnOnLibraries: string[]
    userOwnOnPlatforms?: string[]
    videos?: object[]
}

export type IGameKey = keyof IGame

const { STRING, STRING_ARRAY, OBJECT_ARRAY, NUMBER, DATE, OBJECT, BOOLEAN } = AttributeTypes

export const IGameAttributes: { [key in IGameKey]: string } = {
    acronyms: STRING_ARRAY,
    categories: STRING_ARRAY,
    collection: STRING,
    controllerSupport: STRING,
    cover: STRING,
    developers: STRING_ARRAY,
    gameModes: STRING_ARRAY,
    genres: STRING_ARRAY,
    hasAdultContent: BOOLEAN,
    keywords: STRING_ARRAY,
    libraries: STRING_ARRAY,
    metacriticScore: NUMBER,
    metacriticTitle: STRING,
    metacriticUrl: STRING,
    overviewImagePath: STRING,
    platforms: STRING_ARRAY,
    playerPerspectives: STRING_ARRAY,
    publishers: STRING_ARRAY,
    releaseDate: DATE,
    screenshots: STRING_ARRAY,
    slug: STRING,
    summary: STRING,
    tags: STRING_ARRAY,
    themes: STRING_ARRAY,
    timeToBeat: OBJECT,
    title: STRING,
    userOwnOnLibraries: STRING_ARRAY,
    userOwnOnPlatforms: STRING_ARRAY,
    videos: OBJECT_ARRAY,
}

export const IGameAttributesKeys = Object.keys(IGameAttributes) as IGameKey[]

export const IGameAttributesKeysByType = indexByValue<IGameKey>(IGameAttributes)
