/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/axios'
import { toast } from 'react-toastify'

const trelloSlice = createSlice({
  name: 'trello',
  initialState: { status: 'idle', boards: [], workspace: [] },
  reducers: {
    addColumn: (state, action) => {
      state.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllForUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllForUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.boards = action.payload.metadata
      })
      .addCase(getAllWorkspaceForUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllWorkspaceForUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.workspace = action.payload
      })
      .addCase(addNewBoard.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addNewBoard.fulfilled, (state, action) => {
        state.status = 'idle'
        state.boards.push(action.payload)
        toast.success('create success!')
      })
      .addCase(addNewBoard.rejected, (state, action) => {
        state.status = 'idle'
        toast.error('create failed!')
      })
  },
})

export const getAllForUser = createAsyncThunk('trello/getAll', async () => {
  const res = await axios.get('/boards/get-all-board')
  console.log('🚀 ~ getAllForUser ~ res:', res)
  return res
})
export const getAllWorkspaceForUser = createAsyncThunk('trello/getAllWorkspace', async () => {
  const res = await axios.get('workspace/get-all-workspace')
  console.log('🚀 ~ getAllForUser ~ res:', res)
  return res
})
export const addNewBoard = createAsyncThunk('trello/addNewBoard', async (newBoard) => {
  // console.log(newBoard)
  const res = await axios.post('/boards', newBoard)
  console.log('🚀 ~ res:', res)
  return res
})

export default trelloSlice
