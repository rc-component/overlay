import React from 'react'
import ReactDom from 'react-dom'
import transitions from './transitions.css'
import TransitionGroup from 'react-addons-css-transition-group'
import computedStyle from 'computed-style'

const overlayStyles = {
  backgroundColor: 'rgba(0,0,0,0.3)',
  left: 0,
  top: 0
}

const FirstChild = React.createClass({
  render: function() {
    let children = React.Children.toArray(this.props.children)
    return children[0] || null
  }
})

const body = document.body

function findPostionedElement(el) {
  while (el) {
    el = el.parentNode
    if (el === body) return body
    if (el) {
      let pos = computedStyle(el, 'position')
      if (pos === 'static') {
        el = el.parentNode
      } else {
        break
      }
    }
  }
  return el
}

class Overlay extends React.Component {
  static defaultProps = {
    width: 0,
    height: 0,
    delay: 0
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
  resize() {
    let el = ReactDom.findDOMNode(this)
    if (!el) return
    let parent = findPostionedElement(el)
    if (parent) {
      if (parent === body) {
        let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let rect = {
          width: body.clientWidth,
          height: Math.max(body.clientHeight, vh)
        }
        el.style.width = rect.width + 'px'
        el.style.height = rect.height + 'px'
        el.style.position = 'fixed'
      } else {
        el.style.position = computedStyle(parent, 'position')
        el.style.width = Math.max(this.props.width, parent.scrollWidth) + 'px'
        el.style.height = Math.max(this.props.height, parent.scrollHeight) + 'px'
      }
    }
  }
  render() {
    let props = this.props
    let styles = Object.assign({}, overlayStyles, props.style)
    return (
      <TransitionGroup
        component={FirstChild}
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionName={transitions}
        transitionAppear={true}>
        { do {
          if (props.show) {
            <div key="overlay" className={props.className} style={styles}>{props.children}</div>
          }
        }}
      </TransitionGroup>
    )
  }
}

export default Overlay
