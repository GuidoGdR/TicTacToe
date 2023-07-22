import { useState } from 'react'

import './TicTacToe.css'

import { TURNS } from './constants.js'

import Square from './components/Square/Square.jsx'

import WinerModal from './components/WinerModal/WinerModal.jsx'

function TicTacToe({ backgroundColor = 'black', squareColor = 'white', textColor='white' }) {
 
  const DEFAULT_VALUE = null
  const baseBoard = Array(9).fill(DEFAULT_VALUE)

  
  const [boardState, setBoardState] = useState(()=>{
    const boardFromStorage=window.localStorage.getItem('board')

    return boardFromStorage?JSON.parse(boardFromStorage):baseBoard
  })

  const [turnState, setTurnState] = useState(()=>{
    const turnFromStorage=window.localStorage.getItem('turn')


    return turnFromStorage?JSON.parse(turnFromStorage):TURNS[0]
  })
  
  const [winerState, setWiner] = useState(DEFAULT_VALUE)



  
  const saveGame=(board, turn)=>{
    
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', JSON.stringify(turn))
  }


  const resetBase = () => {
    setBoardState(baseBoard)
    setWiner(DEFAULT_VALUE)
  }

  const resetFull = () => {
    setBoardState(baseBoard)
    setWiner(DEFAULT_VALUE)
    setTurnState(TURNS[0])

    saveGame(baseBoard, TURNS[0])
  }

  const checkWiner = (board, turn) => {

    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    for (let combination of winningCombinations) {


      if (
        board[combination[0]] == turn &&
        board[combination[1]] == turn &&
        board[combination[2]] == turn
      ) {


        return turn
      }
    }


    if( !board.includes(DEFAULT_VALUE) ){
      
      return 'tie'
    }

  }


  const afterTurn = (turn, squareID) => {
    if (boardState[squareID] != DEFAULT_VALUE) return
    

    let newBoard = [...boardState]
    newBoard[squareID] = turn
    
    setBoardState( newBoard )

    let newTurn = null 
    turn == TURNS[0]? newTurn = TURNS[1]: newTurn = TURNS[0]

    setTurnState(newTurn)

    

    const winer= checkWiner(newBoard, turn)
    

    if (winer){
      setWiner(winer)
      saveGame(baseBoard, TURNS[0])
    }else{
      saveGame(newBoard, newTurn)
    }

    


  }

  const setFinishTitle = (winer) =>{
    return winer !== 'tie'? `¡${winer} es el ganador!`: '¡Empate!'
  }

  return (
    <>
      <div className='TicTacToe-container'
        style={{
          backgroundColor: backgroundColor,
          color: textColor
        }}
      >
        <h3 className='TicTacToe-title'> {winerState?setFinishTitle(winerState):'Ta-Te-Ti'}</h3>
        
        <section className='TicTacToe-container-game' >

          {
            boardState.map((children, index) => {
              return (
                <Square
                  borderColor={squareColor}
                  onClick={afterTurn} 
                  turn={turnState}
                  squareID={index}
                  key={index}>{children}</Square>
              )
            })
          }

          <section className='turn-of'>
            
            <p
              className={`turn-of-icon`}
              style={{
                border: turnState === TURNS[0] ? `3px solid ${squareColor}` : ''
              }}
            >{TURNS[0]}</p>

            <p
              className={`turn-of-icon`}
              style={{
                border: turnState === TURNS[1] ? `3px solid ${squareColor}` : ''
              }}
            >{TURNS[1]}</p> 

          </section>

        </section>
        
        <div className='TicTacToe-options'>
              
          <section className='TicTacToe-options-reset-container'>
          
          <button className='TicTacToe-options-reset-btn' type="button"
            onClick={resetFull}>Reiniciar</button>

          </section>

        </div>
      </div>
      <WinerModal
        player={winerState}
        resetGame={resetBase}
      ></WinerModal>
    </>
  )
}


export default TicTacToe

