import Option from "./Option"

export default function Question({ question, dispatch, answer }) {
     return (<>
          <h4>{question.question}</h4>
          <Option question={question} dispatch={dispatch} answer={answer}></Option>
     </>)
}