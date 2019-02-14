import React, { useContext } from 'react'
import { VideoContext } from 'Contexts'
import { VIDEOS } from 'Constants'

const Legend = () => {
  const { videoId } = useContext(VideoContext);
  if(!videoId) return null
  const { title, description } = VIDEOS[videoId]
  return (
    <div>
      <h3>{title}</h3>
      <h4>{description}</h4>
    </div>
  )
}

export default Legend
