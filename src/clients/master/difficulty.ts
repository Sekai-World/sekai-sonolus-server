import { Text } from '@sonolus/core'

import { mapValues } from '../../utils/object.js'

export const difficulties = mapValues(
    {
        append: Text.Append,
        master: Text.Master,
        expert: Text.Expert,
        hard: Text.Hard,
        normal: Text.Normal,
        easy: Text.Easy,
    },
    (_, title, index) => ({ title, index }),
)

export type MasterDifficulty = keyof typeof difficulties
