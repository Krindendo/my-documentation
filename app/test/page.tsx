"use client"

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
        todos: [...state.todos, { id: state.todos.length, text: state.draft }],
        draft: "",
      }
    }
    case "UPDATE_TODO": {
      return {
        todos: state.todos.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, text: state.draft }
          } else {
            return t
          }
        }),
        draft: "",
      }
    }
    case "DELETE_TODO": {
      return {
        todos: state.todos.filter((t) => t.id !== action.payload.id),
        draft: "",
      }
    }
    // default: {
    //   throw Error("Unknown action: " + action.type)
    // }
  }
}

export default function ToDo() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_TEXT",
      payload: { newText: e.target.value },
    })
  }
  const handleAddTodo = () => {
    dispatch({ type: "ADD_TODO" })
  }
  const handleUpdateTodo = (id: number) => {
    dispatch({ type: "UPDATE_TODO", payload: { id } })
  }

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: { id } })
  }

  return (
    <div>
      <input
        type="text"
        className="border-2"
        value={state.draft}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add todo</button>

      {state.todos.map((todo) => (
        <div key={todo.id} className="flex gap-2">
          <p>{todo.text}</p>
          <button
            className="bg-yellow-500"
            onClick={() => handleUpdateTodo(todo.id)}
          >
            Update todo
          </button>
          <button
            className="bg-red-500"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            Delete todo
          </button>
        </div>
      ))}
    </div>
  )
}
