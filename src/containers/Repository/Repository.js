import React from 'react'
import Issue from '../Issue/Issue'
import './Repository.css'

export default ({ repo }) => (
  <div className='repository'>
    <h1 className='repository__name' >
      <a href={repo.html_url}>{repo.name}</a>
    </h1>
    <ul className='issuelist'>
      { repo.issues.map(issue => {
        return (
          <li key={issue.id} className='issuelist__item'>
            <Issue issue={issue} />
          </li>
        )
      })}
    </ul>
  </div>
)
