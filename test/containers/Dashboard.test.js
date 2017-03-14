import React from 'react'
import { shallow } from 'enzyme'
import { Dashboard } from '../../src/containers/Dashboard/Dashboard'
import Masonry from 'react-masonry-component'

describe('<Dashboard />', () => {
  it('should render the repo list', () => {
    const repositoriesMock = []
    const wrapper = shallow(<Dashboard repositories={repositoriesMock} />)
    expect(wrapper.find(Masonry).hasClass('repolist')).toBe(true)
  })
})
