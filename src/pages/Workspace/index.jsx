import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBoard'
import SidebarWorkspace from './SidebarWorkspace/SidebarWorkspace'
import WorkspaceContent from './WorkspaceContent/WorkspaceContent'
import { useEffect } from 'react'
import axios from '~/axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllForUser } from '~/redux/trelloSlice'
import { useParams } from 'react-router-dom'
export default function Workspace() {
  const dispatch = useDispatch()
  const { id } = useParams()

  // const workspaces = useSelector((state) => state.trello.workspace)
  // const workspaceNow = workspaces.find((workspace) => workspace._id === id)
  // console.log(workspaceNow)
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <AppBar />
      <Box
        sx={{
          height: '100%',
          position: 'relative',
          overflowY: 'auto',
          flexGrow: '1',
          display: 'flex',
        }}
      >
        <SidebarWorkspace />
        <WorkspaceContent />
      </Box>
    </Container>
  )
}
