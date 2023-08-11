import * as React from "react"
import { Reducer, useReducer } from "react"

const changeText = (newText: string) => ({
  type: "CHANGE_TEXT" as const,
  payload: { newText },
})

const addTodo = () => ({
  type: "ADD_TODO" as const,
})

const changeTodo = (id: number) => ({
  type: "UPDATE_TODO" as const,
  payload: { id },
})

const deleteTodo = (id: number) => ({
  type: "DELETE_TODO" as const,
  payload: { id },
})

type Action =
  | ReturnType<typeof changeText>
  | ReturnType<typeof addTodo>
  | ReturnType<typeof changeTodo>
  | ReturnType<typeof deleteTodo>
type State = {
  draft: string
  todos: { id: number; text: string }[]
}

const initialState: State = {
  draft: "",
  todos: [],
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "CHANGE_TEXT": {
      return {
        ...state,
        draft: action.payload.newText,
      }
    }
    case "ADD_TODO": {
      return {
        todos: [{ id: state.todos.length, text: state.draft }, ...state.todos],
        draft: "",
      }
    }
    case "UPDATE_TODO": {
      return {
        todos: [{ id: state.todos.length, text: state.draft }, ...state.todos],
        draft: "",
      }
    }
    case "DELETE_TODO": {
      return {
        todos: [{ id: state.todos.length, text: state.draft }, ...state.todos],
        draft: "",
      }
    }
  }
}

export default function ToDo() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  )
  return (
    <div>
      <input
        type="text"
        value={state.draft}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_TEXT",
            payload: { newText: e.target.value },
          })
        }
      />
      <button
        onClick={() => {
          dispatch({ type: "ADD_TODO" })
        }}
      >
        Add todo
      </button>

      {state.todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() => {
              dispatch({ type: "UPDATE_TODO", payload: { id: todo.id } })
            }}
          >
            Update todo
          </button>
          <button
            onClick={() => {
              dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })
            }}
          >
            Delete todo
          </button>
        </div>
      ))}
    </div>
  )
}
