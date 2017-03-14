import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import './Button.css'

export default ({onClickFn, label, primary, flat, icon, ...props}) => {
  let btnClassNames = classNames({
    'btn': true,
    'btn--primary': primary,
    'btn--flat': flat
  })

  return (
    <button className={btnClassNames} {...props} onClick={onClickFn}>
      { icon &&
        <Icon name={icon} />
      }
      <span className='btn__label'>{label}</span>
    </button>
  )
}
