import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import DomainVerificationIcon from '@mui/icons-material/DomainVerification'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import CableIcon from '@mui/icons-material/Cable'
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MicrowaveIcon from '@mui/icons-material/Microwave'
import ShareIcon from '@mui/icons-material/Share'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'

function SideBarRight() {

  return (
    <Box>
      <List
        sx={{
          '& .MuiButtonBase-root ': {
            height: 30,
            p: 1,
            marginTop: '8px',
            marginRight: 1,
            backgroundColor: '#e4e6ea',
            width: 168,
            borderRadius: 1,
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              paddingX: 1
            },
            '& .MuiListItemText-root ': {
              width: '100px'
            }
          }
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              paddingLeft: 0
            }}
            component="div" id="nested-list-subheader">
            Add to cards
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Members" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <BookmarkBorderIcon />
          </ListItemIcon>
          <ListItemText primary="Labels" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <DomainVerificationIcon />
          </ListItemIcon>
          <ListItemText primary="Checklist" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Dates" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <AttachFileIcon />
          </ListItemIcon>
          <ListItemText primary="Attachment" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <VideoLabelIcon />
          </ListItemIcon>
          <ListItemText primary="Cover" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <CableIcon />
          </ListItemIcon>
          <ListItemText primary="Custom Fields" />
        </ListItemButton>
      </List >

      <List
        sx={{
          '& .MuiButtonBase-root ': {
            height: 30,
            p: 1,
            marginTop: '8px',
            marginRight: 1,
            marginBottom: 2,
            // backgroundColor: '#e4e6ea',
            width: 168,
            borderRadius: 1,
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              paddingX: 1
            },
            '& .MuiListItemText-root ': {
              width: '100px'
            }
          }
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              paddingLeft: 0
            }}
            component="div" id="nested-list-subheader">
            Power-Ups
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Power-Ups" />
        </ListItemButton>
      </List >

      <List
        sx={{
          '& .MuiButtonBase-root ': {
            height: 30,
            p: 1,
            marginTop: '8px',
            marginRight: 1,
            // backgroundColor: '#e4e6ea',
            marginBottom: 2,
            width: 168,
            borderRadius: 1,
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              paddingX: 1
            },
            '& .MuiListItemText-root ': {
              width: '100px'
            }
          }
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              paddingLeft: 0
            }}
            component="div" id="nested-list-subheader">
            Actions
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add button" />
        </ListItemButton>
      </List >

      <List
        sx={{
          '& .MuiButtonBase-root ': {
            height: 30,
            p: 1,
            marginTop: '8px',
            marginRight: 1,
            backgroundColor: '#e4e6ea',
            width: 168,
            borderRadius: 1,
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              paddingX: 1
            },
            '& .MuiListItemText-root ': {
              width: '100px'
            }
          }
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              paddingLeft: 0
            }}
            component="div" id="nested-list-subheader">
            Add to cards
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary="Move" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Copy" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <MicrowaveIcon />
          </ListItemIcon>
          <ListItemText primary="Make template" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <CollectionsBookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Achive" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </ListItemButton>

      </List >
    </Box>
  )
}

export default SideBarRight