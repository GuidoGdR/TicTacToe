import { useState } from 'react'

import './Square.css'

function Square({children, turn, onClick, squareID, borderColor, className}) {
  
  const clickHandler = ()=>{

    onClick(turn, squareID);

    
  }
  return(
      <>

        <div
        className={`square${className?' '+className:''}`}
        onClick={clickHandler}
        style={ {borderColor: `${borderColor}` } }
        >{children}</div>

      </>
    )
  }
  
export default Square
  