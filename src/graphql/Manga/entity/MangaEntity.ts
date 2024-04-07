type EntityForManga = {
    id: number
    mangaId: number
}

type People2Manga = ({
    people: NamedEntity
    peopleId: number
} & EntityForManga)

type Publisher2Manga = ({
    publisher: NamedEntity
    publisherId: number
} & EntityForManga)

type LangForEntity = {
    langCodes: LangCodes
    lang: number
}

interface NamedEntity {
    id: number
    name: string
}

interface LangCodes {
    id: number
    name: string
}

type StrTranslations = {
    text: string
} & LangForEntity & EntityForManga

interface FileTranslations extends Omit<StrTranslations, "text"> {
    file: string
}

interface MangaEntityProps {
    id: number
    year: number
    added: string | Date
    ageRating: string
    author2manga: People2Manga[]
    artist2manga: People2Manga[]
    publishers2manga: Publisher2Manga[]
    description: StrTranslations[]
    title: StrTranslations[]
    cover: FileTranslations[]
}

export interface MangaEntity {
    id: number
    year: number
    added: string
    ageRating: string
    author: NamedEntity[]
    artist: NamedEntity[]
    publisher: NamedEntity[]
    description: StrTranslations[]
    title: StrTranslations[]
    cover: FileTranslations[]
}

export default class MangaGraphQLEntityFromPrisma {
    id: number
    year: number
    added: string
    ageRating: string
    author: NamedEntity[]
    artist: NamedEntity[]
    publisher: NamedEntity[]
    description: StrTranslations[]
    title: StrTranslations[]
    cover: FileTranslations[]

    constructor(props: MangaEntityProps) {
        this.id = props.id
        this.year = props.year
        this.added = String(props.added)
        this.ageRating = props.ageRating
        this.author = this.mapEntities(props.author2manga, this.mapNamedEntity)
        this.artist = this.mapEntities(props.artist2manga, this.mapNamedEntity)
        this.publisher = this.mapEntities(props.publishers2manga, this.mapNamedEntity)
        this.description = this.mapEntities(props.description, this.mapStrTranslations)
        this.title = this.mapEntities(props.title, this.mapStrTranslations)
        this.cover = this.mapEntities(props.cover, this.mapFileTranslations)
    }

    private mapNamedEntity = (item: People2Manga | Publisher2Manga): NamedEntity => {
        if ("people" in item) {
            const { people } = item
            return { id: people.id, name: people.name }
        } else {
            const { publisher } = item
            return { id: publisher.id, name: publisher.name }
        }
    }

    private mapStrTranslations = (item: StrTranslations): StrTranslations => ({
        id: item.id,
        mangaId: item.mangaId!,
        langCodes: {
            id: 1,
            name: item.langCodes.name
        },
        lang: item.lang,
        text: item.text
    })

    private mapFileTranslations = (item: FileTranslations): FileTranslations => ({
        id: item.id,
        mangaId: item.mangaId!,
        langCodes: {
            id: 1,
            name: item.langCodes.name
        },
        lang: item.lang,
        file: item.file
    })

    private mapEntities = <T, U>(items: T[], mapper: (item: T) => U): U[] => items.map(mapper)
}
