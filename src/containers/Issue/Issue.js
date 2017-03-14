import React from 'react'
import classNames from 'classnames'
import Assignees from '../../components/Assignees/Assignees'
import Label from '../../components/Label/Label'
import './Issue.css'

export default ({ issue }) => {
  let issueClassName = classNames({
    'issue': true,
    'issue--assigned': issue.assignees.length > 0
  })

  return (
    <div className={issueClassName}>
      <div className='issue__number'>
        <div><span className='hash'>#</span>{issue.number}</div>
      </div>
      <div className='issue__content'>
        <h2 className='issue__title'>{issue.title}</h2>
        <ul className='issue__labels'>
          { issue.labels.map(label => {
            return (
              <li key={label.id} className='issue__label'>
                <Label label={label} />
              </li>
            )
          })}
        </ul>
      </div>
      { issue.assignees.length > 0 &&
        <Assignees assignees={issue.assignees} />
      }
    </div>
  )
}
