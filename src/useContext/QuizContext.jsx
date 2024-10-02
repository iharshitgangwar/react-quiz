import { createContext, useContext, useEffect, useReducer } from "react";



const QuizContext = createContext();
const initialState = {
     questions: [], status: 'loading', index: 0, answer: null, points: 0, secondsRemaining: null
}
// loading,error,ready,active,finished
const SEC_PER_QUERSTION = 30
function reducer(state, action) {
     switch (action.type) {
          case 'dataRecieved': {
               return { ...state, questions: action.payload, status: 'ready' }
          }
          case 'datafaild': {
               return { ...state, status: 'error' }
          }
          case 'start': {
               return { ...state, status: 'active', secondsRemaining: state.questions.length * SEC_PER_QUERSTION }
          }
          case 'newAnswer': {
               const question = state.questions.at(state.index)
               return {
                    ...state, answer: action.payload,
                    points: action.payload === question.correctOption ? state.points + question.points : state.points
               }
          }
          case 'nextQuestion': {
               return {
                    ...state, index: state.index + 1, answer: null
               }
          } case 'finalAnswer': {
               return {
                    ...state, status: 'finished', index: 0, answer: null
               }
          }
          case 'tick': {
               return {
                    ...state,
                    secondsRemaining: state.secondsRemaining - 1,
                    status: state.secondsRemaining === 0 ? 'finished' : state.status
               }
          }
          case 'restart': {
               return {
                    ...initialState, questions: state.questions, status: 'ready'
               }
          }
          default: {
               throw new Error("Action unknown")
          }
     }

}
function QuizProvider({ children }) {
     const [state, dispatch] = useReducer(reducer, initialState)
     const { questions, status, index, answer, points, secondsRemaining } = state
     const numQuestions = questions.length;
     const maxQuestionsPoints = questions.reduce((prev, cur) => prev + cur.points, 0)
     async function fetchdata() {
          try {
               const res = await fetch('http://localhost:8000/questions')
               const data = await res.json()
               dispatch({ type: 'dataRecieved', payload: data })
          }
          catch (err) {
               dispatch({ type: 'datafailed' })
               console.log(err)
          }
     }
     useEffect(() => {
          fetchdata();
     }, [])
     return (
          <QuizContext.Provider
               value={{
                    questions, status, index, answer,
                    points, secondsRemaining, numQuestions,
                    maxQuestionsPoints, dispatch
               }}
          >
               {children}
          </QuizContext.Provider>)

}

function useQuize() {
     const context = useContext(QuizContext);
     if (context === undefined) throw new Error('Can Not use quizContext Outside of The provider')
     return context
}


export { QuizProvider, useQuize }