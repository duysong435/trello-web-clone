import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBoard'
import DashboardHome from './Dashboard/Dashboard'

export default function HomePage() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <DashboardHome />
    </Container>
  )
}
