import { IGame } from 'interfaces/IGame'
import * as React from 'react'
import './GameCard.scss'

interface IGameCardProps extends React.Props<{}> {
    game: IGame
    className?: string
    isSelected?: boolean
    style?: React.CSSProperties
}

const EXTRA_IMG_ATTRIBUTES = {
    loading: 'lazy',
}

const WEB_SERVER_DOMAIN = 'http://127.0.0.1:8001'

const getFullImagePath = (relativeImagePath: string) => {
    return `${WEB_SERVER_DOMAIN}/${relativeImagePath}`
}

export const GameCard = (props: IGameCardProps): React.ReactElement<object> => {
    const {
        game: { overviewImagePath, title },
    } = props
    const style: React.CSSProperties = { ...props.style }
    if (style && style.height) {
        style.lineHeight = `${style.height}px`
    }

    let content
    if (overviewImagePath && overviewImagePath.length) {
        content = <img src={getFullImagePath(overviewImagePath)} alt={title} title={title} {...EXTRA_IMG_ATTRIBUTES} />
    } else {
        content = <>{title}</>
    }

    return (
        <div className="screens--app--overview--game-card--div" style={style}>
            {content}
        </div>
    )
}
