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
import { addNewBoard } from '~/redux/trelloSlice'
import CloseIcon from '@mui/icons-material/Close'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo'
import IconButton from '@mui/material/IconButton'

function CardHeader({ onClose, title }) {


  return (
    <Box sx={{
      height: 89,
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 8fr 1fr',
      p: 2
    }}>
      <Box sx={{
        display: 'flex',
        // justifyItems: 'center',
        // alignItems: 'center'

      }}>
        <PersonalVideoIcon />
      </Box>
      <Typography component={'h3'} variant=''>{title}</Typography>
      <Box sx={{
        position: 'absolute',
        right: '12px'
      }}>
        <IconButton onClick={() => onClose()} >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CardHeader
