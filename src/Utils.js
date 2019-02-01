import { Globals, animated } from 'react-spring';
export const AnimatedDiv = animated(Globals.defaultElement)
export const raf = cb => Globals.requestFrame(cb)
export const caf = cb => Globals.cancelFrame(cb)
export const getParams = ({ match: { params } }) => params
export const getSection = props => getParams(props).section
export const isSectionActive = (props, section) => getSection(props) === section
export const getReleaseStateFromProps = ({ id, prevId, wasActive, viewPort }, release) => {
  const active = id === release;
  const back = prevId === release;
  const off = back && wasActive;
  const show = !(!active && !back && !off)

  return {
     active,
     off,
     back,
     show,
     viewPort
  }
}
export const hideReleaseStory = ({ active, back, off }) => !active && !back && !off
export const isHome = (props) => !getSection(props)
export const ImagePath = (img) => `${process.env.PUBLIC_URL}/static/images/${img}`
export const PhotoPath = (img) => `${process.env.PUBLIC_URL}/static/photos/${img}.jpg`
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
    case 'releases': return `${process.env.PUBLIC_URL}/static/covers/${item}.jpg`
    case 'videos': return `${process.env.PUBLIC_URL}/static/photos/videos/${item}-md.jpg`
    case 'shows': return `${process.env.PUBLIC_URL}/static/covers/${item}.jpg`
    default:
        // do nothing
  }
}
