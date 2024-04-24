interface LocalizedStrEntity {
    lang: string
}

export function sortByLangCodes<T extends LocalizedStrEntity>(langCodes: string[], list: T[]): T[] {
    return list.filter(title =>
        langCodes.includes(title.lang)
    )
}