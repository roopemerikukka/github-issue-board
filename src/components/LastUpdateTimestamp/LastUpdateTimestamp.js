import React from 'react'
import './LastUpdateTimestamp.css'

export default ({ timestamp }) => {
  let date = new Date(timestamp)
  return (
    <div className='timestamp'>
      { timestamp > 0 &&
        <span>{date.toDateString()}</span>
      }

      { timestamp > 0 &&
        <span>{date.toLocaleTimeString('fi', { hour12: false })}</span>
      }
    </div>
  )
}
