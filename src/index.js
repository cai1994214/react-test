import React from 'react'
import  ReactDOM from 'react-dom'
import './index.css'
import IndexRouter from './router/IndexRouter.js'
function App() {
    return (
       <IndexRouter></IndexRouter>
    )
}

 ReactDOM.render(
  <App />,
  document.getElementById('root')
)
