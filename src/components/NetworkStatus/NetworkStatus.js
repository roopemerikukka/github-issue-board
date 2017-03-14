import React from 'react'
import classNames from 'classnames'
import './NetworkStatus.css'

export default ({ online }) => {
  let NetworkStatusClass = classNames({
    'c-network-status': true,
    'c-network-status--online': online,
    'c-network-status--offline': !online
  })
  return (
    <div className={NetworkStatusClass} />
  )
}
