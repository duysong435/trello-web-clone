import { Box } from '@mui/material'
import DetailWorkspace from './DetailWorkspace/DetailWorkspace'
import Divider from '@mui/material/Divider'
const WorkspaceContent = () => {
  return (
    <Box sx={{ marginX: 'auto', width: '100%', padding: '32px' }}>
      <Box>
        <DetailWorkspace />
      </Box>
      <Divider variant="middle" />
    </Box>
  )
}

export default WorkspaceContent
