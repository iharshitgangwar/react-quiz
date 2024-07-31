import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
     useEffect(() => {
          const id = setInterval(() => {
               dispatch({ type: 'tick' })
          }, 1000);
          return () => clearInterval(id);
     }, [dispatch])

     return (
          <div className="timer">
               {String(Math.trunc(secondsRemaining / 60)).padStart(2, '0')} :{String(secondsRemaining % 60).padStart(2, '0')}
          </div>
     )
}
export default Timer