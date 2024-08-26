import { mapValues } from '../utils/object.js'
import { RepositoryData } from './data.js'

export const getCommonTexts = (data: RepositoryData) =>
    mapValues(data.commonTexts.en, (key) => mapValues(data.commonTexts, (_, common) => common[key]))
