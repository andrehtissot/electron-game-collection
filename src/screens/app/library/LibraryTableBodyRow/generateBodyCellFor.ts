import { AttributeTypes } from 'interfaces/helpers/AttributeTypes'
import { IGame, IGameAttributes, IGameAttributesKeys, IGameKey } from 'interfaces/IGame'
import { generateArrayCell } from './generateArrayCell'
import { generateDateCell } from './generateDateCell'
import { generateJSONCell } from './generateJSONCell'
import { generateShowCell } from './generateShowCell'
import { generateSimpleCell } from './generateSimpleCell'

const attributesToShowInModal: IGameKey[] = ['metacriticUrl', 'summary', 'keywords', 'videos', 'screenshots', 'cover']

export const generateGenerator = (key: IGameKey) => {
    if (attributesToShowInModal.includes(key)) {
        return generateShowCell(key)
    }
    switch (IGameAttributes[key]) {
        case AttributeTypes.NUMBER_ARRAY:
        case AttributeTypes.STRING_ARRAY:
            return generateArrayCell(key)
        case AttributeTypes.DATE:
            return generateDateCell(key)
        case AttributeTypes.OBJECT:
        case AttributeTypes.OBJECT_ARRAY:
            return generateJSONCell(key)
        default:
            return generateSimpleCell(key)
    }
}

export const generateBodyCellFor = ({} as unknown) as { [key in IGameKey]: (game: IGame) => JSX.Element }
for (const key of IGameAttributesKeys) {
    generateBodyCellFor[key] = generateGenerator(key)
}
