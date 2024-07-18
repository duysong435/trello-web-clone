import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import Avatar from '@mui/material/Avatar'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Button from '@mui/material/Button'
import { Fragment } from 'react'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const DetailWorkspace = () => {
  const { id } = useParams()
  const workspaces = useSelector((state) => state.trello.workspace)
  const workspaceNow = workspaces.find((workspace) => workspace._id === id)
  const [selectedImage, setSelectedImage] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)

      // Create a form data to send the file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('workspaceId', id)
      // Send the file to the backend using axios
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/upload/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
  const inputFileRef = useRef(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    handleClose()
  }
  const handleChooseImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
    handleClose()
  }

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '850px', marginX: 'auto' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar variant="rounded" sx={{ margin: '12px 8px' }}>
          <Fragment>
            <input
              ref={inputFileRef}
              accept="image/*"
              type="file"
              id="icon-button-file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <Button
              // variant="contained"
              component="span"
              size="large"
              onClick={handleClick}
              sx={{ padding: '10px' }}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
              ) : (
                <img
                  src={workspaceNow.logo}
                  alt="Selected"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleChooseImage}>Chọn ảnh</MenuItem>
              <MenuItem onClick={handleRemoveImage}>Xóa ảnh</MenuItem>
            </Menu>
          </Fragment>
        </Avatar>
        <Box>
          <Typography variant="subtitle2">Trello Workspace</Typography>
          <Typography variant="caption">Free</Typography>
        </Box>
      </Box>
      <Button variant="contained" sx={{ height: '32px' }}>
        invited Workspace members
      </Button>
    </Box>
  )
}

export default DetailWorkspace
