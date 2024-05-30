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
import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'

function MainModal() {
  return <MDXEditor

    markdown="Hello world"
    plugins={[
      toolbarPlugin({
        toolbarContents: () => (
          <>
            {' '}
            <UndoRedo />
            <BoldItalicUnderlineToggles />
          </>
        )
      })
    ]}
  />
}

export default MainModal