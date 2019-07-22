import regexpuCore from 'regexpu-core'

const REGEXP = new RegExp(
    regexpuCore('[^\\p{Letter}0-9]', 'ui', {
        unicodePropertyEscape: true,
        useUnicodeFlag: true,
    }),
    'gu'
)

export const titleToSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/ & /g, ' and ')
        .replace(REGEXP, ' ')
        .replace(/  +/g, ' ')
        .trim()
        .replace(/ /g, '-')
        .replace(/--+/g, '-')
}
