import React, { useEffect, useRef } from 'react'

export const VideoPlayer = ({ stream }) => {
    const videoRef = useRef();

    useEffect( () => {
        if(videoRef.current){
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video ref={videoRef} autoPlay/>
        // <>VideoPlayer</>
  )
}
