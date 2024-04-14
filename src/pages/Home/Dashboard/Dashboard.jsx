import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'


import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import AppBar from '~/components/AppBar/AppBoard'
import DashboardSideBar from './DashboardSideBar/DashboardSideBar'
import DashboardAll from './DashboardAll/DashboardAll'


export default function DashboardHome() {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: '4fr 8fr',
      // height: '88%'
      gap: 5,
      marginTop: 6
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DashboardSideBar />
      </Box>
      <DashboardAll />
    </Box>
  )
}
