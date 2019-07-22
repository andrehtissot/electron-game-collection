import { replaceCSSStyle } from 'helpers/forceCSSStyle'
import { IGameKey } from 'interfaces/IGame'

const getWidthRule = (visibleColumnRelativeWidth: number, scrollBarWidth?: number) => {
    const minWidthVar =
        '--screens--app--library--library-table-header--library-table-settings-header--fake-table-header--min-width'
    return `
{
    width: calc(
        calc(
            100%
            - var(${minWidthVar})
            ${scrollBarWidth && `+ ${scrollBarWidth}px`}
        )
        * ${visibleColumnRelativeWidth}
        / 100
        - var(--components--fake-table--fake-table-header-splitter--width)
    );
}`
}

export const applyRelativeWidthByColumn = (
    visibleColumns: IGameKey[],
    relativeWidthByColumn: { [key: string]: number },
    scrollBarWidth: number
): void => {
    const rules: string[] = []
    for (let index = 1; index < visibleColumns.length + 1; index++) {
        rules.push(
            `
.screens--app--library--library-screen .components--fake-table--fake-table-header:nth-of-type(${index * 2 -
                1}) ${getWidthRule(relativeWidthByColumn[visibleColumns[index - 1]])}`,
            `
.screens--app--library--Library-table-body--div > div > div > div > div:nth-of-type(${index}) ${getWidthRule(
                relativeWidthByColumn[visibleColumns[index - 1]],
                scrollBarWidth
            )}`
        )
    }
    replaceCSSStyle(rules, 'screens--app--library--library-table--columns')
}
