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
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { path } from '~/utils/constants'

export default function CardItem({ item }) {
  return (
    <Box
      sx={{
        // borderStyle: 'solid',
        // borderWidth: '1px',
        width: '200px',
        height: '100px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        padding: 2,
        backgroundImage:
          'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/3cf79197f2d0b9c0b14958e1bb1d9c8e/photo-1709374601273-57d0a44c9437.jpg)',
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <Link
        to={'/' + path.Board + '/' + item._id}
        // style="background-color: rgb(131, 140, 145)"
        style={{
          textDecoration: 'none',
          color: 'black',
          // position: 'relative',
          width: '100%',
        }}
      >
        <Typography
          variant="subtitle1"
          component={'h3'}
          sx={{
            fontWeight: 600,
            color: 'white',
            overflow: 'hidden',
            width: '95%',
            position: 'absolute',
            // display: '-webkit-box',
            // WebkitBoxOrient: 'vertical',
            // WebkitLineClamp: 1
          }}
          noWrap={true}
        >
          {item.title}{' '}
        </Typography>
      </Link>
    </Box>
  )
}
