

const envPublicUrl = process.env.PUBLIC_URL;

export const getStaticUrl = relativePath => `${envPublicUrl}/static/${relativePath}`

export const getImageUrl = path => getStaticUrl(`images/${path}`)
export const getPhotoUrl = path => getStaticUrl(`photos/${path}`)
