import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import Avatar from '@mui/material/Avatar'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Button from '@mui/material/Button'
const DetailWorkspace = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '850px', marginX: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar variant="rounded" sx={{ margin: '12px 8px' }}>
          <SvgIcon component={TrelloIcon}></SvgIcon>
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
