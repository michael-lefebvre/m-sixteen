
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
