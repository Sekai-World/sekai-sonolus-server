import { RepositoryData } from './data.js'
import { merge } from './utils/merge.js'

export const getMusicVocals = (data: RepositoryData) => merge(data.musicVocals, 'id', [])
