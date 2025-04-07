import { ClientConfig } from '../config.js'
import { fetchText } from '../fetch.js'
import { MasterDifficulty } from '../master/difficulty.js'

export const getMusicCoverPath = (musicAssetBundleName: string) =>
    `/music/jacket/${musicAssetBundleName}/${musicAssetBundleName}.png`

export const getMusicBgmPath = (musicVocalAssetBundleName: string) =>
    `/music/long/${musicVocalAssetBundleName}/${musicVocalAssetBundleName}.mp3`

export const getMusicPreviewPath = (musicVocalAssetBundleName: string) =>
    `/music/short/${musicVocalAssetBundleName}/${musicVocalAssetBundleName}_short.mp3`

export const getMusicChartPath = (id: number, difficulty: MasterDifficulty) =>
    `/music/music_score/${id.toString().padStart(4, '0')}_01/${difficulty}.txt`

export const fetchMusicChart = (id: number, difficulty: MasterDifficulty, config: ClientConfig) =>
    fetchText(getMusicChartPath(id, difficulty), config)
