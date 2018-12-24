
export const getParams = ({ match: { params } }) => params
export const getSection = props => getParams(props).section
export const isSectionActive = (props, section) => getSection(props) === section
export const getReleaseStateFromProps = ({ id, prevId, wasActive, viewPort }, release) => {
  const active = id === release,
        back = prevId === release,
        off = back && wasActive;

  return {
     active,
     off,
     back,
     viewPort
  }
}
export const isHome = (props) => !getSection(props)
