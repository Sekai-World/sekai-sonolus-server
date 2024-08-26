import { fetchMaster } from './fetch.js'

export type MasterMusic = {
    id: number
    title: string
    pronunciation: string
    lyricist: string
    composer: string
    arranger: string
    assetbundleName: string
    publishedAt: number
    fillerSec: number
}

export const fetchMusics = fetchMaster<MasterMusic[]>('/musics.json')
