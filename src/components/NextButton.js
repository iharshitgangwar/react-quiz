import { useQuize } from "../useContext/QuizContext"

function NextButton() {
     const { dispatch, answer, index, numQuestions } = useQuize()
     if (answer === null) {
          return
     }
     if (index < numQuestions - 1)
          return (<button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
               Next
          </button>)

     if (index === numQuestions - 1)
          return (<button className="btn btn-ui" onClick={() => dispatch({ type: 'finalAnswer' })}>
               Finish
          </button>)
}


export default NextButton