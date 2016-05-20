import React from 'react';
import ReactDom from 'react-dom';
import transitions from './transitions.css';
import Animate from '@chemzqm/rc-animate';

const overlayStyles = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.3)',
  left: 0,
  top: 0
}

class Overlay extends React.Component {
  static defaultProps = {
    width: 0,
    height: 0
  }
  static propTypes = {
    // min height
    height: React.PropTypes.number,
    // min width
    width: React.PropTypes.number,
    // timeout in milisecond
    delay: React.PropTypes.number,
    //show/hide the overlay element
    show: React.PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      show: props.show
    }
  }
  componentDidMount() {
    this.resize()
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  componentDidUpdate() {
    this.resize()
  }
  componentWillReceiveProps(props) {
    let delay = props.delay || this.props.delay
    let self = this
    if (props.show) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(function () {
        if (self.props.show) {
          self.setState({
            show: true
          })
        }
      }, delay)
    } else {
      this.setState({show: false})
    }
  }
  resize() {
    let el = ReactDom.findDOMNode(this)
    if (el && el.parentNode) {
      let rect = el.parentNode.getBoundingClientRect()
      let width = Math.max(this.props.width, rect.width)
      let height = Math.max(this.props.height, rect.height)
      el.style.width = width + 'px'
      el.style.height = height + 'px'
    }
  }
  render() {
    let overlay = null
    let styles = Object.assign({}, overlayStyles, this.props.style)
    if (this.state.show) {
      overlay = <div key="overlay"  style={styles}/>
    }
    return (
      <Animate animation={{}} component="" transitionAppear={true} transitionName={transitions}>
        {overlay}
      </Animate>
    )
  }
}

export default Overlay
