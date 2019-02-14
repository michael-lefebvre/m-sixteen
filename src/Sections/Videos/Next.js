import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { VideoContext } from 'Contexts'
import { getPhotoUrl } from 'Utils'
import { VIDEOS_ID } from 'Constants'

const NextLink = () => {
  const { videoId } = useContext(VideoContext);
  const videoIndex = VIDEOS_ID.findIndex( v => v === videoId )
  if(videoIndex === -1) return null
  const index = (videoIndex + 1) % VIDEOS_ID.length
  const next = VIDEOS_ID[index] || null

  if(!next) return null

  return (
    <Link to={`/videos/${next}`}>
      <img src={getPhotoUrl(`videos/${next}-md.jpg`)} alt="" />
    </Link>
  )
}

export default NextLink
