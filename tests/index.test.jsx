import React from 'react';

export default class Test extends React.Component {
  render() {
    if (Math.random() > 0.5) {
      return <div className="p:f fs:12 h:13 wb:ba" />
    }
    return <div className="fs:14 p:a t:0 b:0 bgc:eee" />
  }
}
