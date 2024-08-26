import { Text } from '@sonolus/core'
import { mapValues } from '../../utils/object.js'

export const difficulties = mapValues(
    {
        append: { en: 'Append' },
        master: { en: Text.Master },
        expert: { en: Text.Expert },
        hard: { en: Text.Hard },
        normal: { en: Text.Normal },
        easy: { en: Text.Easy },
    },
    (_, title, index) => ({ title, index }),
)

export type MasterDifficulty = keyof typeof difficulties
