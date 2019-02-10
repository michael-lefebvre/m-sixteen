import { Globals, animated } from 'react-spring';
import { getStaticUrl } from './Paths'

export { default as StoryTrigger } from "./StoryTrigger";
export * from "./ImgPrefetch";


export const getComponentName = Component => Component.displayName || Component.name || 'Component'

export const AnimatedDiv = animated(Globals.defaultElement)
export const raf = cb => Globals.requestFrame(cb)
export const caf = cb => Globals.cancelFrame(cb)

export const getParams = ({ match: { params } }) => params
export const getSection = props => getParams(props).section

export const getImageUrl = path => getStaticUrl(`images/${path}`)
export const getPhotoUrl = path => getStaticUrl(`photos/${path}`)

export const getViewport = () => {
  const { width, height } = document.body.getBoundingClientRect()
  return {
    offsetWidth: width,
    offsetHeight: height
  }
}
export const roundToEven = n => 2 * Math.round(n / 2);

export const getNavImgSrc = (section, item) => {
  switch(section) {
    case 'releases': return getStaticUrl(`covers/${item}.jpg`)
    case 'videos': return getStaticUrl(`photos/videos/${item}-md.jpg`)
    // case 'shows': return getStaticUrl(`covers/${item}.jpg`)
    default:
        // do nothing
  }
}
