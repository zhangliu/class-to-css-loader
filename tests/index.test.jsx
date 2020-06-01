import React from 'react';

export default class Test extends React.Component {
  render() {
    const cNames = 'ttt'
    if (Math.random() > 0.5) {
      return <div className={`${cNames} p:f fs:12 h:13 ${cNames} wb:ba ${cNames}`} />
    }
    return <div className="fs:14 p:a t:0 b:0 bgc:eee" />
  }
}
