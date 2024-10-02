import { useQuize } from "../useContext/QuizContext"

function Progress() {
     const { numQuestions, index, points, maxQuestionsPoints, answer } = useQuize()
     return (
          <header className="progress">
               <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
               <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
               <p><strong>{points}</strong>/{maxQuestionsPoints}</p>
          </header>
     )

}

export default Progress