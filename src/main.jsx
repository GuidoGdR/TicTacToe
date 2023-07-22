import React from 'react'
import ReactDOM from 'react-dom/client'

import './water.css'
import './index.css'

import TicTacToe from './TicTacToe.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <div className='main-container'>
      <TicTacToe
        backgroundColor='var(--background)'
        squareColor='var(--text-main)'
        textColor='var(--text-main)'
      ></TicTacToe>
    </div>

  </React.StrictMode>,
)
