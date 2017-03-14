import { Component } from 'react'

export default class AutoScroll extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isBrowser: (typeof window !== 'undefined'),
      active: props.active || false,
      intervalId: null,
      timerId: null,
      isIdle: true,
      currentX: null,
      scrollDirection: 'bottom',
      timeout: 3000,
      events: props.events || ['mousemove', 'keydown', 'wheel', 'DOMMouseScroll', 'mouseWheel', 'mousedown', 'touchstart', 'touchmove', 'MSPointerDown', 'MSPointerMove']
    }

    // Do some bindings.
    this.startScroll = this.startScroll.bind(this)
    this.deleteTimer = this.deleteTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  componentDidMount () {
    if (this.state.active) {
      this.startTimer()
      this.bindEvents()
    }
  }

  componentWillUnmount () {
    this.state.events.forEach(e => document.removeEventListener(e, this.resetTimer, false))
    this.deleteTimer()
  }

  startTimer () {
    let id = setTimeout(() => {
      this.setState({isIdle: true})
      this.startScroll()
    }, this.state.timeout)
    this.setState({timerId: id})
  }

  bindEvents () {
    this.state.events.forEach(e => document.addEventListener(e, this.resetTimer, false))
  }

  resetTimer () {
    this.deleteTimer()
    this.startTimer()
  }

  deleteTimer () {
    this.setState({isIdle: false})
    clearTimeout(this.state.timerId)
  }

  startScroll () {
    if (this.state.isIdle && this.state.isBrowser) {
      let currentX = this.state.currentX
      let direction = this.state.scrollDirection

      if (currentX === null) {
        currentX = document.body.scrollTop
      }

      const height = document.body.offsetHeight - window.innerHeight
      window.scrollTo(0, currentX)
      if (direction === 'bottom') {
        currentX++
      } else {
        currentX--
      }

      // Change the direction if needed.
      if (currentX > height) {
        this.setState({scrollDirection: 'top'})
      } else if (currentX < 0) {
        this.setState({scrollDirection: 'bottom'})
      }

      this.setState({currentX: currentX})
      window.requestAnimationFrame(this.startScroll)
    } else {
      // Reset the starting point.
      this.setState({currentX: null})
    }
  }

  render () {
    return false
  }
}
