import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import SelectValue from '~/components/SelectValue/SelectValue'
import { addNewBoard } from '~/redux/trelloSlice'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  // '&.MuiTypography-body1': {
  //   fontSize: '5rem',
  //   color: 'red'
  // }
}

export default function BoardNew({ id }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(addNewBoard({ ...data, workspaceId: id }))
      const newBoard = unwrapResult(resultAction)
      handleClose()
      navigate(`/board/${newBoard._id}`)
    } catch (error) {
      console.error('Failed to add new board: ', error)
    }
  }

  return (
    <Box>
      <Box
        onClick={handleOpen}
        sx={{
          width: '200px',
          height: '100px',
          borderRadius: '5px',
          backgroundColor: '#ccc',
          padding: 2,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Box
          style={{
            textDecoration: 'none',
            color: 'black',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="subtitle1"
            component={'h3'}
            sx={{
              fontWeight: 600,
              color: 'white',
              overflow: 'hidden',
            }}
            noWrap={true}
          >
            Create new board{' '}
          </Typography>
        </Box>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={style}>
            <Typography
              variant="h4"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 500,
                color: '#44546f',
                // marginBottom: 3
              }}
            >
              Create Board
            </Typography>

            <Box>
              <TextField
                autoComplete="board-title"
                name="title"
                // required
                fullWidth
                id="title"
                label="Board Title"
                autoFocus
                {...register('title', {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors?.title?.type === 'required' && (
                <Typography>👋 Board title is required</Typography>
              )}
              {errors?.title?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>Email cannot exceed 100 characters</Typography>
              )}
            </Box>

            <SelectValue name={'Workspace'} label={'workspace'} />
            <SelectValue name={'Visibility'} label={'visibility'} />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}
