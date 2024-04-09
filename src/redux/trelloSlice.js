import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const trelloSlice = createSlice({
  name: 'trello',
  initialState: { status: 'idle', todos: [] },
  reducers: {
    addColumn: (state, action) => {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
  }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('/api/todos')
  const data = await res.json()
  return data.todos
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    const data = await res.json()
    console.log({ data })
    return data.todos
  }
)


export default trelloSlice

