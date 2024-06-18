import Box from '@mui/material/Box'
import DashboardSideBar from './DashboardSideBar/DashboardSideBar'
import DashboardAll from './DashboardAll/DashboardAll'

export default function DashboardHome() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '4fr 8fr',
        // height: '88%'
        gap: 5,
        marginTop: 6
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DashboardSideBar />
      </Box>
      <DashboardAll />
    </Box>
  )
}
