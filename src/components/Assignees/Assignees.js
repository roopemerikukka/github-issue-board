import React from 'react'
import './Assignees.css'

export default ({ assignees, ...props }) => {
  return (
    <ul className='assignees' {...props}>
      { assignees.map(assignee => {
        return (
          <li key={assignee.id} className='assignee'>
            <img className='assignee__img' src={assignee.avatar_url} alt={assignee.login} />
          </li>
        )
      })}
    </ul>
  )
}
