import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import { SvgIcon } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { path } from '~/utils/constants'
import { Link } from 'react-router-dom'
function Workspaces() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const workspaces = useSelector((state) => state.trello.workspaces)
  // console.log(Workspace)
  return (
    <Box>
      <Button
        sx={{ color: 'white' }}
        id="basic-button-workspaces"
        aria-controls={open ? 'basic-menu-workspaces' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Workspaces
      </Button>
      <Menu
        id="basic-menu-workspaces"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-workspaces',
        }}
      >
        {/* <Typography paddingX={2}>workspace now</Typography>

        <Divider /> */}
        {/* <Typography paddingX={2}>all workspace</Typography> */}
        {workspaces.map((workspace) => (
          <MenuItem key={workspace._id}>
            <Link
              to={'/' + path.Workspace + '/' + workspace._id}
              // style="background-color: rgb(131, 140, 145)"
              style={{
                textDecoration: 'none',
                color: 'black',
                // position: 'relative',
                width: '100%',
                display: 'flex',
              }}
            >
              <ListItemIcon>
                {workspace.logo ? (
                  <img
                    src={workspace.logo}
                    alt="Selected"
                    style={{ width: '24px', height: '100%' }}
                  />
                ) : (
                  <img
                    src="https://res.cloudinary.com/dxdkr650j/image/upload/v1720858911/uploads/vp4xlkcxdb86qnyrodym.png"
                    alt="Selected"
                    style={{ width: '24px', height: '100%' }}
                  />
                )}
              </ListItemIcon>
              <ListItemText>{workspace.title}</ListItemText> {/* Dùng title của workspace */}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default Workspaces
