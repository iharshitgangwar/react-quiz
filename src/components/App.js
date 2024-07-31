import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';



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
export default function App() {
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
    <div className="app">
      <Header />
      <Main >
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && <>
          <Progress index={index} numQuestions={numQuestions} points={points} maxQuestionsPoints={maxQuestionsPoints} answer={answer} />
          <Question question={questions[index]} dispatch={dispatch} answer={answer} />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </Footer> </>}
        {status === 'finished' && <FinishScreen points={points} maxQuestionsPoints={maxQuestionsPoints} dispatch={dispatch} secondsRemaining={secondsRemaining}></FinishScreen>}
      </Main>

    </div>
  );
}
