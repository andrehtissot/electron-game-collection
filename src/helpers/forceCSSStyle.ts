export const addCSSStyle = (rules: string[], id: string) => {
    const styleElement = document.createElement('style')
    styleElement.dataset.id = id
    document.head.appendChild(styleElement)
    const sheet = styleElement.sheet as CSSStyleSheet | null
    if (!sheet) {
        return
    }
    for (const rule of rules) {
        sheet.insertRule(rule, sheet.cssRules.length)
    }
}

export const findCSSStyle = (id: string) => {
    for (const element of document.head.children) {
        if (
            element.tagName === 'STYLE' &&
            (element as HTMLElement).dataset &&
            (element as HTMLElement).dataset.id === id
        ) {
            return element
        }
    }
}

export const removeCSSStyle = (id: string) => {
    const element = findCSSStyle(id)
    element && element.remove()
}

export const replaceCSSStyle = (rules: string[], id: string) => {
    removeCSSStyle(id)
    addCSSStyle(rules, id)
}
