import { useEffect, useRef } from "react"

export default function Video() {

  const refVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    refVideo.current?.play()
  }, [])

  return (
    <div style={{zIndex: 10001}} className="video-container" id="video">
      <video style={{zIndex: -1}} className="object-cover" loop muted ref={refVideo} >
        <source src="https://github.com/data354/aq54-lp/raw/main/public/video.mp4" />
      </video>
    </div>
  )
}