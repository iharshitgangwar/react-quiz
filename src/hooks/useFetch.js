import { useEffect, useReducer } from "react"

const initialState = {
     questions: [], status: 'loading'
}
// loading,error,ready,active,finished

function reducer(state, action) {
     switch (action.type) {
          case 'dataRecieved': {
               return { ...state, questions: action.payload, status: 'ready' }
          }
          case 'datafaild': {
               return { ...state, status: 'error' }
          }
          default: {
               throw new Error("Action unknown")
          }
     }

}
export default function useFetch() {
     const [state, dispatch] = useReducer(reducer, initialState)
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
     return state
}