import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'
import { path } from '~/utils/constants'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import SelectValue from '~/components/SelectValue/SelectValue'
import { addNewBoard, enableDragApp } from '~/redux/trelloSlice'
import CardHeader from './CardHeader/CardHeader'
import SideBarRight from './SideBarRight/SideBarRight'
import MainModal from './MainModal/MainModal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  // p: 4,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  // my: 50
  height: 'auto',
  maxHeight: '90vh',
  backgroundColor: '#F1F2F4'
}

function ModalCard({ isOpen, onClose, card }) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {

    console.log('🚀 ~ onSubmit ~ data:', data)
    dispatch(addNewBoard(data))
    handleToggle()
  }

  const handleToggle = () => {
    dispatch(enableDragApp())
    onClose()
  }

  React.useEffect(() => {

  })
  return (
    <Modal
      sx={{
        zIndex: 1,
        // overflow: 'scroll',
        // marginBottom: 10

      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleToggle}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={isOpen}>
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={style}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <CardHeader onClose={handleToggle} title={card?.title} />
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: '10fr 2fr'
            }}>
              <Box>
                <MainModal card={card} />
              </Box>
              <SideBarRight />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalCard
