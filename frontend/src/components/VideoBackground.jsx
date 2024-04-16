import React from 'react'

const VideoBackground = ({backgroundVideo}) => {
  return (
    <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover z-0">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

  )
}

export default VideoBackground