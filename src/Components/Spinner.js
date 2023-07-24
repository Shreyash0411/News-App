import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
    return (
      <div>
        <center>
        <img  src={loading} alt="loading" height="90px" />
        </center>
      </div>
    )
}

