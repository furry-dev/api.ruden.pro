import {Types} from "mongoose"

export function strings2ObjectIds(objectIds: string[]): Types.ObjectId[] {
    return objectIds.map(id => new Types.ObjectId(id))
}