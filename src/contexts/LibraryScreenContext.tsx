import * as React from 'react'
import { getGamesContext, IProvided } from './helpers/getGamesContext'
export type LibraryScreenContextProvided = IProvided

const [Context, Provider] = getGamesContext()

export const LibraryScreenContext = Context

export const LibraryScreenContextProvider = (props: React.Props<IProvided>): React.ReactElement<object> => (
    <Provider {...props} />
)
