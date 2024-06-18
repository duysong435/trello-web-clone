import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBoard'
import SidebarWorkspace from './SidebarWorkspace/SidebarWorkspace'
import WorkspaceContent from './WorkspaceContent/WorkspaceContent'

export default function Workspace() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar />
      <Box sx={{ height: '100%', position: 'relative', overflowY: 'auto', flexGrow: '1', display: 'flex' }}>
        <SidebarWorkspace />
        <WorkspaceContent />
      </Box>
    </Container>
  )
}
