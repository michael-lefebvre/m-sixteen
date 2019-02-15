import { getStaticUrl } from './Paths'

const _LOADED_IMGS = new Map()

export const ImgPrefetch = (path, inStatic = false) =>
  new Promise( (resolve, reject) => {
    if(_LOADED_IMGS.has(path))
      return resolve(_LOADED_IMGS.get(path))

    const image = new Image()

    image.src = inStatic ? path : getStaticUrl(path)
    image.onerror = () => reject(new Error(`could not load image: ${path} :: ${image.src}`))
    image.onload = () => {
      _LOADED_IMGS.set(path, image.src)
      return resolve(image.src)
    }
  })

export const ImgsPrefetch = (paths, inStatic = false) => Promise.all( paths.map( p => ImgPrefetch(p, inStatic) ) )
