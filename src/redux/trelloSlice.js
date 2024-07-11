import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/axios'
import { toast } from 'react-toastify'

const trelloSlice = createSlice({
  name: 'trello',
  initialState: { status: 'idle', boards: [], disableDrag: false },
  reducers: {
    disableDragApp: (state, action) => {
      state.disableDrag = true
    },
    enableDragApp: (state, action) => {
      state.disableDrag = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllForUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllForUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.boards = action.payload.metadata
      })
      .addCase(getAllForUser.rejected, (state, action) => {
        state.status = 'idle'
        toast.error('Failed!')
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

      .addCase(updateCard.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.status = 'idle'
        // state.boards.push(action.payload)
        toast.success('create success!')
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.status = 'idle'
        toast.error('create failed!')
      })
  }
})

export const getAllForUser = createAsyncThunk('trello/getAll', async () => {
  const res = await axios.get('/boards/get-all-board')
  // console.log('🚀 ~ getAllForUser ~ res:', res)
  return res
})

export const addNewBoard = createAsyncThunk(
  'trello/addNewBoard',
  async newBoard => {
    const res = await axios.post('/boards', newBoard)
    // console.log('🚀 ~ res:', res)
    return res
  }
)

<<<<<<< HEAD
export const updateCard = createAsyncThunk('trello/updateCard', async (data) => {
  const res = await axios.put('/cards', data)
  // console.log('🚀 ~ res:', res)
  return res
})

export const { disableDragApp, enableDragApp } = trelloSlice.actions
=======
>>>>>>> master
export default trelloSlice
