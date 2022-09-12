import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

const Popup: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<Popup />, root)
