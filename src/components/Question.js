import { useQuize } from "../useContext/QuizContext"
import Option from "./Option"

export default function Question() {
     const { questions, index } = useQuize()
     const question = questions.at(index)
     return (<>
          <h4>{question.question}</h4>
          <Option question={question} ></Option>
     </>)
}