import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div>
        <center>
        <img  src={loading} alt="loading" height="90px" />
        </center>
      </div>
    )
  }
}

export default Spinner