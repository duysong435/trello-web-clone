import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '~/axios'
import { toast } from 'react-toastify'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    data: null,
    accessToken: null,
    refreshToken: null,
    userId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authSignIn.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload.user
        state.accessToken = action.payload.tokens.accessToken
        state.refreshToken = action.payload.tokens.refreshToken
        state.userId = action.payload.user._id
        toast.success('Login success!')
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.status = 'idle'
        toast.error('Login failed!')
      })

      .addCase(authSignUp.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = JSON.stringify(action.payload)
        state.accessToken = action.payload.tokens.accessToken
        state.refreshToken = action.payload.tokens.refreshToken
        state.userId = action.payload.user._id
        toast.success('Register success!')
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.status = 'idle'
        toast.error(' failed!')
      })
  }
})

export const signInWithGoogle = createAsyncThunk('auth/login', async () => {
  const res = await axios.get('http://localhost:8080/v1/auth/login/success', {
    withCredentials: true
  })
  // console.log(res);
  return res.metadata
})

export const authSignIn = createAsyncThunk('auth/login', async dataSignin => {
  const res = await axios.post('/user/login', dataSignin)
  return res.metadata
})

export const authSignUp = createAsyncThunk(
  'auth/register',
  async dataSignUp => {
    const res = await axios.post('/user/signup', dataSignUp)
    return res.metadata
  }
)

export default authSlice
