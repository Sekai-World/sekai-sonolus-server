import { ClientConfig } from '../config.js'
import { fetchText } from '../fetch.js'
import { MasterDifficulty } from '../master/difficulty.js'

export const getMusicCoverPath = (musicAssetBundleName: string) =>
    `/music/jacket/${musicAssetBundleName}_rip/${musicAssetBundleName}.png`

export const getMusicBgmPath = (musicVocalAssetBundleName: string) =>
    `/music/long/${musicVocalAssetBundleName}_rip/${musicVocalAssetBundleName}.mp3`

export const getMusicPreviewPath = (musicVocalAssetBundleName: string) =>
    `/music/short/${musicVocalAssetBundleName}_rip/${musicVocalAssetBundleName}_short.mp3`

export const getMusicChartPath = (id: number, difficulty: MasterDifficulty) =>
    `/music/music_score/${id.toString().padStart(4, '0')}_01_rip/${difficulty}.txt`

export const fetchMusicChart = (id: number, difficulty: MasterDifficulty, config: ClientConfig) =>
    fetchText(getMusicChartPath(id, difficulty), config)
