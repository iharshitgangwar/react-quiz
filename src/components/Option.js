function Option({ question, dispatch, answer }) {
     function handleAnswer(index) {
          dispatch({ type: 'newAnswer', payload: index })

     }
     return (<div className="options">
          {question.options.map((el, index) =>
               <button disabled={answer !== null} className={`btn btn-option ${index === answer ? "answer" : ''} ${index === question.correctOption && answer !== null ? "correct" : 'wrong'}`}
                    key={el}
                    onClick={() => handleAnswer(index)}>
                    {el}
               </button>
          )}
     </div>)
}

export default Option;