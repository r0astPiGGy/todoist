import React from "react"

export default class Spacer extends React.PureComponent {
  render() {
    return <div style={{padding: this.props.size}}/>
  }
}