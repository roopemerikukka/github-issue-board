import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../src/containers/Header/Header'
import Button from '../../src/components/Button/Button'

describe('<Header />', () => {
  it('should render', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('header').hasClass('app-header')).toBe(true)
  })

  it('should have login button when user is not logged in', () => {
    const loggedIn = false
    const wrapper = shallow(<Header loggedIn={loggedIn} />)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find(Button).dive().find('.btn__label').props().children).toBe('Log In')
  })

  it('should have logged in class if user is logged in', () => {
    const loggedIn = true
    const wrapper = shallow(<Header loggedIn={loggedIn} />)
    expect(wrapper.find('header').hasClass('app-header--logged-in')).toBe(true)
    expect(wrapper.find(Button).dive().find('.btn__label').props().children).toBe('Log out')
  })
})
