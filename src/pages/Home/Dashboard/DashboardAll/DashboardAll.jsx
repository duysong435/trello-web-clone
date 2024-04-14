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
import { useEffect, useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import Divider from '@mui/material/Divider'
import WavesIcon from '@mui/icons-material/Waves'
import Box from '@mui/material/Box'
import CardItem from '~/components/CardItem/CardItem'
import Typography from '@mui/material/Typography'
import BoardNew from './BoardNew/BoardNew'
import { useDispatch, useSelector } from 'react-redux'
import { getAllForUser } from '~/redux/trelloSlice'
export default function DashboardAll() {
  const dispatch = useDispatch()
  const boards = useSelector(state => state.trello.boards)

  useEffect(() => {
    dispatch(getAllForUser())
  }, [])
  return (
    <Box>
      <Typography
        variant='inherit'
        component={'h2'}
        sx={{
          fontWeight: 600,
          color: '#44546f',
          // overflow: 'hidden',
          // display: '-webkit-flex',
          // '-webkit-box-orient': 'vertical',
          // '-webkit-line-clamp': 1
          marginBottom: '10px'
        }}
      >YOUR WORKSPACE</Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2
      }}>

        {
          boards?.map((item, index) => {
            return (
              <CardItem key={index} item={item} />
            )
          })
        }
        <BoardNew />
      </Box>
    </Box>
  )
}
