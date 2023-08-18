import { useEffect, useRef } from "react"

export default function Video() {

  const refVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    refVideo.current?.play()
  }, [])

  return (
    <div style={{zIndex: 10001}} className="bg-gradient-to-b from-slate-950 video-container" id="video">
      <video style={{zIndex: -1}} className="object-cover" loop muted ref={refVideo} >
        <source src="/video.mp4" />
      </video>
    </div>
  )
}