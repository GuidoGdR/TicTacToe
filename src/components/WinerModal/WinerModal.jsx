
import './WinerModal.css'

function WinerModal({player, resetGame}){
  
  return(
      <>

        <div
        className='winer-modal'
        style={ player?{display:'block'}:{display:'none'}}
        >

          <div className='winer-modal-reset-box'>
          
            <button className='winer-modal-reset-btn' type="button"
            onClick={resetGame}>Reiniciar</button>

          </div>
       
        </div>

      </>
  )
}

  
  
export default WinerModal
  