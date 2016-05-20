import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Overlay from '../index';

const boxStyles = {
  width: 100,
  height: 100,
  position: 'relative'
}

storiesOf('Overlay', module)
  .add('overlay shown', () => {
    return (
      <div style={{...boxStyles}}>
      <Overlay show={true}/>
    </div>
  )})
  .add('overlay hide', () => (
    <div style={{...boxStyles}}>
      <Overlay show={false}/>
    </div>
  ))
  .add('Overlay min height and width', () => (
    <div style={{...boxStyles}}>
      <Overlay show={true} height={200} width={200}/>
    </div>
  ))
  .add('toggle overlay', () => {
    var Foo = React.createClass({
      getInitialState: function () {
        return {
          overlay: false
        }
      },
      toggleOverlay: function () {
        this.setState({
          overlay: !this.state.overlay
        })
      },
      render: function () {
        return (
          <div>
            <button onClick={this.toggleOverlay}>toggle</button>
            <div style={{...boxStyles}} onClick={action('click')}>
              <Overlay
                show={this.state.overlay}
                style={{zIndex: 99, backgroundColor: 'rgba(0,0,0,0.2)'}}
                delay={200}/>
              <div>inner</div>
            </div>
          </div>
        )
      }
    })
    return React.createElement(Foo)
  })
