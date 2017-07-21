import PropTypes from 'prop-types'
import React from 'react'
import ReactDom from 'react-dom'
import Transition from 'react-transition-group/Transition'

const overlayStyles = {
  transition: 'opacity 0.3s ease',
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.3)',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}

class Overlay extends React.Component {
  static defaultProps = {
    delay: 0
  }
  static propTypes = {
    // timeout in milisecond
    delay: PropTypes.number,
    //show/hide the overlay element
    show: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  componentWillReceiveProps(props) {
    let delay = props.delay
    clearTimeout(this.timeout)
    if (props.show) {
      if (delay) {
        this.timeout = setTimeout(() => {
          if (this.props.show) {
            this.setState({ show: true })
          }
        }, delay)
      } else {
        this.setState({ show: true })
      }
    } else {
      this.setState({show: false})
    }
  }
  render() {
    let props = this.props
    let {show, className, duration} = props
    let styles = Object.assign({}, overlayStyles, props.style)
    return (
      <Transition in={show} timeout={300}>
        {(state) => {
          styles.opacity = ['entered', 'entering'].indexOf(state) !== -1 ? 1: 0
          if (state === 'exited') styles.pointerEvents = 'none'
          return (
            <div className={className} style={{...styles}}>
              {props.children}
            </div>
          )
        }}
      </Transition>
    )
  }
}

export default Overlay
