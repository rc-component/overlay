# Overlay Component

Overlay component for [react](https://facebook.github.io/react/).

Overlay is rendered to cover positioned element (css position not static)

Build with [webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)

[Story book](https://rc-component.github.io/overlay/)

## Usage

```
<Overlay
  show={this.state.overlay}
  style={{zIndex: 99, backgroundColor: 'rgba(0,0,0,0.2)'}}
  delay={200}/>
```

## Props

name   | type   | default    | description
-------| ------ | ---------- | ------------
show   | boolean| false      | show the overlay if true
deplay | number | 0          | delay in milisecond for show element
width  | number | 0          | min widht of overlay element
height | number | 0          | min height of overlay element

You can also have `className` and `style` applied to underneath overlay element.

# License

MIT
