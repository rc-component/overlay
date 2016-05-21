import React from 'react';
import ReactDom from 'react-dom';
import transitions from './transitions.css';
import TransitionGroup from 'react-addons-css-transition-group'
import computedStyle from 'computed-style'

const overlayStyles = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.3)',
  left: 0,
  top: 0
}

let FirstChild = React.createClass({
  render: function() {
    var children = React.Children.toArray(this.props.children);
    return children[0] || null;
  }
})

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
    var el = this.el = ReactDom.findDOMNode(this)
    if (el && computedStyle(el.parentNode, 'position') === 'static'
        && el.parentNode !== document.body) {
      el.parentNode.style.position = 'relative'
    }
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
    let el = this.el
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
    if (this.props.show) {
      overlay = <div key="overlay"  style={styles}/>
    }
    return (
      <TransitionGroup
        component={FirstChild}
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionName={transitions}
        transitionAppear={true}>
        {overlay}
      </TransitionGroup>
    )
  }
}

export default Overlay
