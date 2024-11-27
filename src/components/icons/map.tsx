import React from 'react'

interface MapProps {
    height?: number
    width?: number
    className?: string
}
const Map = ({ height = 24, width = 24, className }: MapProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-map ${className}`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" /><path d="M9 4v13" /><path d="M15 7v13" /></svg>
    )
}

export default Map