function FinishScreen({ points, maxQuestionsPoints, dispatch, secondsRemaining }) {
     const percentage = (points / maxQuestionsPoints) * 100
     return (
          <>
               <p className="result">
                    You Scored <strong>{points}</strong> out of {maxQuestionsPoints} ({Math.ceil(percentage)}%)
               </p>
               <p>You Completed in {secondsRemaining}</p>
               <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
                    Restart
               </button>
          </>
     )
}
export default FinishScreen;