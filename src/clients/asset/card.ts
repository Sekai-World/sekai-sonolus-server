export const getCardThumbnailPath = (cardAssetBundleName: string, trained: boolean) =>
    `/thumbnail/chara/${cardAssetBundleName}_${getSuffix(trained)}.png`

export const getCardImagePath = (cardAssetBundleName: string, trained: boolean) =>
    `/character/member/${cardAssetBundleName}/card_${getSuffix(trained)}.png`

const getSuffix = (trained: boolean) => (trained ? 'after_training' : 'normal')
