import { RepositoryData } from './data.js'
import { merge } from './utils/merge.js'

export const getMusicDifficulties = (data: RepositoryData) =>
    merge(data.musicDifficulties, 'id', [])
