import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import Divider from '@mui/material/Divider'
import WavesIcon from '@mui/icons-material/Waves'

import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

export default function DashboardSideBar() {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    // subheader={
    //   <ListSubheader component="div" id="nested-list-subheader">
    //     Nested List Items
    //   </ListSubheader>
    // }
    >
      <ListItemButton>
        <ListItemIcon>
          <SvgIcon component={TrelloIcon} fontSize='medium' inheritViewBox sx={{ color: '#1565c0' }} />
        </ListItemIcon>
        <ListItemText primary="Boards" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <SvgIcon component={TrelloIcon} fontSize='medium' inheritViewBox />
        </ListItemIcon>
        <ListItemText primary="Template" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <WavesIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      <Divider />

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Name workspace" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
