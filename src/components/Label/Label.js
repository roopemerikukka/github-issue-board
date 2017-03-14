import React from 'react'
import hexRgb from 'hex-rgb'
import './Label.css'

export default ({label}) => {
  let bg = hexRgb(label.color)
  return (
    <div className='label' style={{backgroundColor: `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, 0.3)`}}>
      {label.name}
    </div>
  )
}
