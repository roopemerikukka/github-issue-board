import React from 'react'
import classNames from 'classnames'
import './Toggle.css'

export default ({ checked, label, disabled, ...props }) => {
  const toggleClass = classNames({
    'toggle': true,
    'toggle--checked': checked,
    'toggle--disabled': disabled
  })

  return (
    <div className={toggleClass}>
      <label>
        <input type='checkbox' checked={checked} disabled={disabled} {...props} />
        <span className='faux-toggle' />
        <span className='toggle__label'>
          {label}
        </span>
      </label>
    </div>
  )
}
